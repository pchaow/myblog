import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  @Get('environment')
  getEnv():any {
    const example_variable = this.configService.get<string>('EXAMPLE_VARIABLE')

    return example_variable

  }


  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus() : string {
    return this.appService.getStatus();
  }

  @Get('count')
  getCount() : string {
    return this.appService.increaseCount().toString();
  }
}
