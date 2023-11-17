import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from "./cat.entities";
import { CreateCatDTO, UpdateCatDTO } from "./cat.dto";

@Injectable()
export class CatService {

    constructor(
        @InjectRepository(Cat)
        private catRepository  : Repository<Cat>
    ) {

    }

    findAll() : Promise<Cat[]>{
        return this.catRepository.find();
    }

    findOne(id:number) : Promise<Cat|null> {
        return this.catRepository.findOneBy({id:id});
    }

    create(cat : CreateCatDTO) : Promise<Cat|null> {
        return this.catRepository.save(cat);
    }

    update(updateCatDTO : UpdateCatDTO) : Promise<Cat|null> {
        return this.catRepository.save(updateCatDTO);
    }

    async deleteById(id : number) : Promise<void> {
        await this.catRepository.delete({id:id})
    }
}