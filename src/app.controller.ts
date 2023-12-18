import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Role } from './auth/role.enum';
import { Roles } from './auth/roles.decorator';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get('environment')
  getEnv(): any {
    const example_variable = this.configService.get<string>('EXAMPLE_VARIABLE');

    return example_variable;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus(): string {
    return this.appService.getStatus();
  }

  @Get('count')
  getCount(): string {
    return this.appService.increaseCount().toString();
  }

  @Roles(Role.Admin, Role.User)
  @Get('bothUsers')
  bothRoles() {
    return 'Both User and Admin';
  }

  @Roles(Role.User)
  @Get('only-users')
  onlyUser() {
    return 'Only User';
  }

  @Roles(Role.Admin)
  @Get('only-admin')
  onlyAdmin() {
    return 'Only Admin';
  }
}
