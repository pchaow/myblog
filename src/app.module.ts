import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller';
import { CatService } from './cat/cat.service';
import { StudentController } from './student/student.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Cat, CatProfile } from './cat/cat.entities';
import { CatFood } from './cat/catfood.entities';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const option: TypeOrmModuleOptions = {
          type: 'sqlite',
          database: configService.get<string>('DATABASE_NAME', 'database.db'),
          entities: [CatProfile, CatFood, Cat],
          synchronize: true,
        };

        return option;
      },
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Cat, CatProfile, CatFood]),
    JwtModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, CatController, StudentController],
  providers: [
    CatService,
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
