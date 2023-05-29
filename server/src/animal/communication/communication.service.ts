import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Communication } from './communication.model';
import { CreateCommunicationDto } from './dto/create-communication.dto';

@Injectable()
export class CommunicationService {
  
    constructor(@InjectModel(Communication) private communicationModel: typeof Communication) {}

    async createCommunication(dto: CreateCommunicationDto) {
        const communication = await this.communicationModel.create({
            ...dto
        });
        return communication;
    }

    async getCommunicationByValue(value: string): Promise<Communication> {
        return await this.communicationModel.findOne({
            where: {
               value
            }
        });
    }
    
    async getAllCommunications(): Promise<Communication[]> {
        return await this.communicationModel.findAll();
    }
}