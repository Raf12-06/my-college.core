import {HttpException, Injectable} from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
  }
}
