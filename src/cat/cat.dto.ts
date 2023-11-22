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

    validate() : boolean {
        if(this.age === undefined || this.age === null){
            return false;
        }
        return true;
    }

    validateMessage() : string[] {
        let errorMessage = [];
        if(this.age === undefined || this.age === null){
            errorMessage.push("Age is required")
        }

        return errorMessage;
    }
}