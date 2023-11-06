import { Controller, Get,Post, Req } from "@nestjs/common";
import { CatService } from "./cat.service";
import { Request } from 'express';
@Controller('cat')
export class CatController {
    constructor(private readonly catService : CatService){

    }

    @Get()
    getIndex(@Req() request : Request) : string {

        let name = request.query['name'];
        let color = request.query['color'] ?? "Black";

        let resultString = `Cat Listing with name=${name} and color=${color}`;
        return resultString
    }

    @Post()
    postCreate(@Req() request : Request) : string {
        let name = request.body['name']
        let color = request.body['color']

        let resultString 
            = `Create Cat with name=${name},color=${color}`;
        return resultString
    }


}