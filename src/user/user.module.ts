import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtStrategy } from 'src/security/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/security/constant';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({ secret: jwtSecret, signOptions: { expiresIn: '1h' } }),
    PassportModule,
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy, AuthService],
})
export class UserModule {}
