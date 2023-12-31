import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<p><strong>Server is running...</strong></p>';
  }
}
