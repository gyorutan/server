import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { Payload } from './payload.interface';
import { jwtSecret } from './constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: Payload, done: VerifiedCallback) {
    const user = await this.authService.tokenValidateUser(payload);

    if (!user) {
      return done(new UnauthorizedException({ message: '유저가 없습니다' }));
    }

    return done(null, user);
  }
}
