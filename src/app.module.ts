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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports : [ConfigModule],
      useFactory : (configService : ConfigService) => {
        let option : TypeOrmModuleOptions = {
          type : 'sqlite',
          database : configService.get<string>("DATABASE_NAME",'database.db'),
          entities : [CatProfile,CatFood,Cat],
          synchronize : true
        }
        
        return option;
      },
      inject:[ConfigService]
    }),

    TypeOrmModule.forFeature([Cat,CatProfile,CatFood])
  ],
  controllers: [AppController, CatController,StudentController],
  providers: [CatService,AppService],
})
export class AppModule {}
