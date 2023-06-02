import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Adopter, Shelter, User, Volunteer } from "./user.model";
import { UserTypeService } from "src/userType/userType.service";
import { UserType } from "src/userType/userType.model";

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private userModel: typeof User,
                            private userTypeService: UserTypeService) {}
    async getUserById(userId: number): Promise<Volunteer | Adopter | Shelter | null> {
        const user = await this.userModel.findByPk(userId, { include: [UserType] });
        
        if (!user) {
            return null;
        }
        
        switch (user.userType.value) {
            case 'volunteer':
                return await Volunteer.findByPk(userId);
            case 'adopter':
                return await Adopter.findByPk(userId);
            case 'shelter':
                return await Shelter.findByPk(userId);
            default:
                return null;
        }
    }

    
}