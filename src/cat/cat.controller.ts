import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Put,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { Request } from 'express';
import { CreateCatDTO, UpdateCatDTO } from './cat.dto';

import { Cat, CatProfile } from './cat.entities';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Roles(Role.Admin, Role.User)
  @Get('bothroles')
  bothRoles(): string {
    return 'OK';
  }

  @Get()
  getIndex(@Req() request: Request): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Get(':id')
  getCatById(@Param('id') id: number): Promise<Cat> {
    return this.catService.findOne(id);
  }

  @Get(':id/profile')
  async getCatProfileById(@Param('id') id: number): Promise<CatProfile> {
    const cat = await this.catService.findOne(id);
    const profile = await cat.profile;
    return profile;
  }

  @Post()
  postCreate(@Body() createCatDTO: CreateCatDTO): Promise<Cat> {
    return this.catService.create(createCatDTO);
  }

  @Put(':id')
  updateCatById(
    @Param('id') id: number,
    @Body() updateCatDTO: UpdateCatDTO,
  ): Promise<Cat> {
    return this.catService.update(updateCatDTO);
  }

  @Delete(':id')
  deleteCatById(@Param('id') id: number): string {
    this.catService.deleteById(id);
    return 'OK';
  }
}
