import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Payload } from 'src/security/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async checkUsername(value: string) {
    console.log(value);

    const user = await this.prismaService.user.findUnique({
      where: {
        username: value,
      },
    });

    console.log(user);

    if (user) {
      return { success: false, result: 'unavailable-username' };
    }

    return { success: true, result: 'available-username' };
  }

  async checkStudentId(value: string) {
    console.log(value);

    const user = await this.prismaService.user.findUnique({
      where: {
        studentId: value,
      },
    });

    if (user) {
      return { success: false, result: 'unavailable-studentId' };
    }

    return { success: true, result: 'available-studentId' };
  }

  async signUp(body: User) {
    console.log(body);

    const { sei, mei, username, studentId, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        sei,
        mei,
        fullname: `${sei}` + ' ' + `${mei}`,
        username,
        studentId,
        email: `${studentId}` + '@shinshu-u.ac.jp',
        password: hashedPassword,
      },
    });

    console.log(createdUser);

    return { success: true, message: '회원가입에 성공하였습니다', createdUser };
  }

  async logIn(body: User) {
    console.log(body);

    const { studentId, password } = body;

    const user = await this.prismaService.user.findUnique({
      where: {
        studentId,
      },
    });

    if (!user) {
      return { success: false, message: '등록되지 않은 학번입니다' };
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return {
        success: false,
        message: '비밀번호가 일치하지 않습니다',
      };
    }

    const payload: Payload = {
      id: user.id,
      fullname: user.fullname,
      username: user.username,
      studentId: user.studentId,
      email: user.email,
    };

    const accessToken = await this.createToken(payload);

    return {
      success: true,
      message: '로그인에 성공했습니다',
      user,
      accessToken,
    };
  }

  async createToken(payload: Payload) {
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  async tokenValidateUser(payload: Payload) {
    return await this.prismaService.user.findUnique({
      where: { id: payload.id },
    });
  }
}
