import { Body, Controller, Delete, Get,Param,Post, Req, Put } from "@nestjs/common";
import { CatService } from "./cat.service";
import { Request } from 'express';
import { CreateCatDTO, UpdateCatDTO } from "./cat.dto";

import { Cat, CatProfile } from "./cat.entities";
@Controller('cat')
export class CatController {
    constructor(private readonly catService : CatService){

    }

    @Get()
    getIndex(@Req() request : Request) : Promise<Cat[]> {
        return this.catService.findAll()

    }

    @Get(":id")
    getCatById(@Param('id') id : number) : Promise<Cat> {
        return this.catService.findOne(id)
    }

    @Get(":id/profile")
    async getCatProfileById(@Param('id') id : number) : Promise<CatProfile> {
        let cat = await this.catService.findOne(id)
        let profile = await cat.profile
        return profile
    }

    @Post()
    postCreate(@Body() createCatDTO : CreateCatDTO) : Promise<Cat> {
        return this.catService.create(createCatDTO)
    }

    @Put(":id")
    updateCatById(@Param('id') id : number, @Body() updateCatDTO : UpdateCatDTO) : Promise<Cat> {
        return this.catService.update(updateCatDTO)
    }

    @Delete(":id")
    deleteCatById(@Param('id') id : number) : string {
        this.catService.deleteById(id);
        return "OK"
    }

}