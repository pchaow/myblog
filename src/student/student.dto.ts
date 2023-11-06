import { Type } from "class-transformer";
import { IsNotEmpty,IsDate } from "class-validator";

export class ActivityDto {
    name : string;
}

export class PetDto {
    name : string;
    kind : string; //dog, cat, etc.
}

export class StudentDto {

    id : string;
    name : string;

    @Type(()=>Date)
    @IsDate()
    birthdate : Date;

    pet : PetDto;

    activities : [ActivityDto]

}