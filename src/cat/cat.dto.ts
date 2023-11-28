import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";

export class CatProfileDTO {
    @IsNotEmpty()
    father : string;

    @IsNotEmpty()
    mother : string;

}

export class CatFoodDTO {
    @IsNotEmpty()
    name : string;
    @IsNotEmpty()
    type : string;
}

export class CreateCatDTO {

    @IsNotEmpty()
    name : string;

    @IsNotEmpty()
    color : string;    

    //optional
    description? : string;

    @Type(()=>CatProfileDTO)
    profile : CatProfileDTO;

    @ValidateNested({ each: true })
    @Type(() => CatFoodDTO)
    foods : CatFoodDTO[]

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