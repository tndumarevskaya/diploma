import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Gender } from './gender.model';
import { CreateGenderDto } from './dto/create-gender.dto';

@Injectable()
export class GenderService {
  
    constructor(@InjectModel(Gender) private genderModel: typeof Gender) {}

    async createGender(dto: CreateGenderDto) {
        const gender = await this.genderModel.create({
            ...dto
        });
        return gender;
    }

    async getGenderByValue(value: string): Promise<Gender> {
        return await this.genderModel.findOne({
            where: {
               value
            }
        });
    }
    
    async getAllGenders(): Promise<Gender[]> {
        return await this.genderModel.findAll();
    }

    async getGenderById(id: number): Promise<Gender> {
        return await this.genderModel.findByPk(id);
    }
}