import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/username/:value')
  async checkUsername(@Param('value') value: string) {
    console.log(value);
    return await this.authService.checkUsername(value);
  }

  @Get('/studentId/:value')
  async checkStudentId(@Param('value') value: string) {
    return await this.authService.checkStudentId(value);
  }

  @Post('/signup')
  async signUp(@Body() body: User) {
    return await this.authService.signUp(body);
  }

  @Post('/login')
  async logIn(@Body() body: User, @Res() res: Response) {
    const response = await this.authService.logIn(body);
    const token = response.accessToken;
    res.setHeader('Authorization', 'Bearer ' + token);
    return res.json(response);
  }
}
