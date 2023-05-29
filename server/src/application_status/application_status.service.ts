import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApplicationStatus } from './application_status.model';
import { CreateStatusDto } from './dto/create-application-status.dto';

@Injectable()
export class ApplicationStatusService {
  
    constructor(@InjectModel(ApplicationStatus) private applicationStatusModel: typeof ApplicationStatus) {}

    async createStatus(dto: CreateStatusDto) {
        const status = await this.applicationStatusModel.create({
            ...dto
        });
        return status;
    }

    async getStatusByValue(value: string): Promise<ApplicationStatus> {
        return await this.applicationStatusModel.findOne({
            where: {
               value
            }
        });
    }
    
    async getAllStatuses(): Promise<ApplicationStatus[]> {
        return await this.applicationStatusModel.findAll();
    }
}