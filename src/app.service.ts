import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  public static count:number = 0;

  getHello(): string {
    return 'Hello World!';
  }

  getStatus() : string {
    return "OK";
  }

  increaseCount() : number {
    AppService.count += 1;
    return AppService.count;
  }
}
