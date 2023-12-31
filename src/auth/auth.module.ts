import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from 'src/security/constant';
import { JwtStrategy } from 'src/security/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({ secret: jwtSecret, signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
