import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatController } from './cat/cat.controller';
import { CatService } from './cat/cat.service';
import { StudentController } from './student/student.controller';

@Module({
  imports: [],
  controllers: [AppController, CatController,StudentController],
  providers: [AppService, CatService],
})
export class AppModule {}
