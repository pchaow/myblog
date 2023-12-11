import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
// import { jwtConstants } from './constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory : (configService : ConfigService) => {
        let option : JwtModuleOptions = {
          global : true,
          secret : configService.get<string>("SECRET",'default_secret'),
          signOptions : {expiresIn : '60s'}
        }
        return option
      },
      inject : [ConfigService]
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],

})
export class AuthModule {}
