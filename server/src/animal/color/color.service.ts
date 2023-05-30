import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Color } from './color.model';
import { CreateColorDto } from './dto/create-color.dto';

@Injectable()
export class ColorService {
  
    constructor(@InjectModel(Color) private colorModel: typeof Color) {}

    async createColor(dto: CreateColorDto) {
        const color = await this.colorModel.create({
            ...dto
        });
        return color;
    }

    async getColorByValue(value: string): Promise<Color> {
        return await this.colorModel.findOne({
            where: {
               value
            }
        });
    }
    
    async getAllColors(): Promise<Color[]> {
        return await this.colorModel.findAll();
    }

    async getColorById(id: number): Promise<Color> {
        return await this.colorModel.findByPk(id);
    }
}