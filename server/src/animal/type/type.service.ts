import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Type } from './type.model';
import { CreateTypeDto } from './dto/create-type.dto';

@Injectable()
export class TypeService {
  
    constructor(@InjectModel(Type) private typeModel: typeof Type) {}

    async createType(dto: CreateTypeDto) {
        const type = await this.typeModel.create({
            ...dto
        });
        return type;
    }

    async getTypeByValue(value: string): Promise<Type> {
        return await this.typeModel.findOne({
            where: {
               value
            }
        });
    }
    
    async getAllTypes(): Promise<Type[]> {
        return await this.typeModel.findAll();
    }

    async getTypeById(id: number): Promise<Type> {
        return await this.typeModel.findByPk(id);
    }
}