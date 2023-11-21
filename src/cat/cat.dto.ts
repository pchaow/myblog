import { IsNotEmpty } from "class-validator";

export class CreateCatDTO {

    @IsNotEmpty()
    name : string;
    
    @IsNotEmpty()
    sex : string;

    @IsNotEmpty()
    color : string;

    @IsNotEmpty()
    age : number;

    

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