import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Status } from './status.model';
import { CreateStatusDto } from './dto/create-status.dto';

@Injectable()
export class StatusService {
  
    constructor(@InjectModel(Status) private statusModel: typeof Status) {}

    async createStatus(dto: CreateStatusDto) {
        const status = await this.statusModel.create({
            ...dto
        });
        return status;
    }

    async getStatusByValue(value: string): Promise<Status> {
        return await this.statusModel.findOne({
            where: {
               value
            }
        });
    }
    
    async getAllStatuses(): Promise<Status[]> {
        return await this.statusModel.findAll();
    }

    async getStatusById(id: number): Promise<Status> {
        return await this.statusModel.findByPk(id);
    }
}