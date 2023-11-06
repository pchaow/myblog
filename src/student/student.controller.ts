import { Body, Controller, Post } from "@nestjs/common";
import { StudentDto } from "./student.dto";

@Controller('student')
export class StudentController {

    @Post()
    postStudentData(@Body() student : StudentDto) : any{

        //simple date diff
        let today = new Date();
        let yeardiff = today.getFullYear() - student.birthdate.getFullYear();
        
        return yeardiff;
    }
}