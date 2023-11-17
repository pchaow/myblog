import { IsNotEmpty } from "class-validator";

export class CreateCatDTO {

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    color : string;    

    //optional
    description? : string;
}

export class UpdateCatDTO {

    @IsNotEmpty()
    id : number;

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    color : string;    

    //optional
    description? : string;
}