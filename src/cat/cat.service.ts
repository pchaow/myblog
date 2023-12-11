import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat, CatProfile } from "./cat.entities";
import { CreateCatDTO, UpdateCatDTO } from "./cat.dto";
import { Logger } from '@nestjs/common';
import { CatFood } from "./catfood.entities";

@Injectable()
export class CatService {

    constructor(
        @InjectRepository(Cat)
        private catRepository  : Repository<Cat>,
        @InjectRepository(CatProfile)
        private catProfileRepository : Repository<CatProfile>,

        @InjectRepository(CatFood)
        private catFoodRepository : Repository<CatFood>
    ) {

    }

    findAll() : Promise<Cat[]>{
        return this.catRepository.find();
    }

    findOne(id:number) : Promise<Cat|null> {
        return this.catRepository.findOneBy({id:id});
    }

    async create(cat : CreateCatDTO) : Promise<Cat|null> {

        Logger.log(JSON.stringify(cat))

        let catProfile = new CatProfile()
        catProfile.fahter = cat.profile.father
        catProfile.mother = cat.profile.mother
        await catProfile.save()

        Logger.log(JSON.stringify(catProfile))

        let catEntity = new Cat()
        catEntity.name = cat.name
        catEntity.description = cat.description
        catEntity.color = cat.color
        catEntity.profile = catProfile


        Logger.log(JSON.stringify(catEntity))

        let result = await catEntity.save()

        let foods = cat.foods.map(f => {
            let food = new CatFood()
            food.name = f.name
            food.type = f.type
            food.cat = result
            return food;
        })
        Logger.log(JSON.stringify(foods))

        await Promise.all(foods.map(async (food) => {
            await food.save()
        }));
        
        

        await result.reload()
        return result
    }

    update(updateCatDTO : UpdateCatDTO) : Promise<Cat|null> {
        return this.catRepository.save(updateCatDTO);
    }

    async deleteById(id : number) : Promise<void> {
        await this.catRepository.delete({id:id})
    }
}