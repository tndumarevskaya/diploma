import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Behavior } from './behavior.model';
import { CreateBehaviorDto } from './dto/create-behavior.dto';

@Injectable()
export class BehaviorService {
  
    constructor(@InjectModel(Behavior) private behaviorModel: typeof Behavior) {}

    async createBehavior(dto: CreateBehaviorDto) {
        const behavior = await this.behaviorModel.create({
            ...dto
        });
        return behavior;
    }

    async getBehaviorByValue(value: string): Promise<Behavior> {
        return await this.behaviorModel.findOne({
            where: {
               value
            }
        });
    }
    
    async getAllBehaviors(): Promise<Behavior[]> {
        return await this.behaviorModel.findAll();
    }
}