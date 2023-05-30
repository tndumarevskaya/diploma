import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserType } from './userType.model';
import { CreateUserTypeDto } from './dto/create-userType.dto';

@Injectable()
export class UserTypeService {

    constructor(@InjectModel(UserType) private userTypeModel: typeof UserType) {}

    async createUserType(dto: CreateUserTypeDto) {
        const userType = await this.userTypeModel.create({
            ...dto
        });
        return userType;
    }

    async getUserTypeByValue(value: string): Promise<UserType> {
        return await this.userTypeModel.findOne({
            where: {
               value
            }
        });
    }

    async getUserTypeById(id: number): Promise<UserType> {
        return await this.userTypeModel.findByPk(id);
    }
}
