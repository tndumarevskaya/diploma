import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Fur } from './fur.model';
import { CreateFurDto } from './dto/create-fur.dto';

@Injectable()
export class FurService {
  
    constructor(@InjectModel(Fur) private furModel: typeof Fur) {}

    async createFur(dto: CreateFurDto) {
        const fur = await this.furModel.create({
            ...dto
        });
        return fur;
    }

    async getFurByValue(value: string): Promise<Fur> {
        return await this.furModel.findOne({
            where: {
               value
            }
        });
    }
    
    async getAllFurs(): Promise<Fur[]> {
        return await this.furModel.findAll();
    }
}