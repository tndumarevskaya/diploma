import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Volunteer } from './user.model';
import { UserTypeService } from 'src/userType/userType.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginVolunteerDto } from './dto/login-volunteer.dto';

@Injectable()
export class VolunteerService {

    constructor(@InjectModel(Volunteer) private volunteerModel: typeof Volunteer,
                            private userTypeService: UserTypeService,
                            private authService: AuthService) {}

    async createVolunteer(dto: CreateVolunteerDto): Promise<string> {
        try {
            console.log(dto);
            const volunteer = await this.getVolunteerByEmail(dto.email);
            if (!volunteer) {
                const passwordHash = await this.authService.hashPassword(dto.password);
                const userType = await this.userTypeService.getUserTypeByValue("Volunteer");
                const volunteer = await this.volunteerModel.create({
                    ...dto, 
                    password: passwordHash
                });
                console.log(userType);
                await volunteer.$set('userType', userType);
                volunteer.userType = userType;
                volunteer.userTypeId = userType.id;
                await volunteer.save();
                const token =  await this.authService.generateJwt(volunteer.toJSON());
                return token;
            } else {
                throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
            }
        } catch (e) {
            console.log(e);
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
        }
    }

    async login(dto: LoginVolunteerDto): Promise<string> {
        try {
            const foundVolunteer = await this.getVolunteerByEmail(dto.email);
            if (foundVolunteer) {
                const passwordEquals = await this.authService.comparePasswords(dto.password, foundVolunteer.password);
                if (passwordEquals) {
                    const payload = await this.volunteerModel.findByPk(foundVolunteer.id);
                    const token =  await this.authService.generateJwt(payload.toJSON());
                    return token;
                } else {
                    throw new HttpException('Login was not successfull, wrong credentials', HttpStatus.UNAUTHORIZED);
                }
            } else {
                throw new HttpException('Login was not successfull, wrong credentials', HttpStatus.UNAUTHORIZED);
            }
            
        } catch (e) {
            console.log(e);
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }

    async getAllVolunteers(): Promise<Volunteer[]> {
        return await this.volunteerModel.findAll();
    }

    async getVolunteerByName(firstName: string, lastName: string): Promise<Volunteer> {
        return await this.volunteerModel.findOne({
            where: {
                firstName,
                lastName
            }
        });
    }

    async getVolunteerById(id: number): Promise<Volunteer> {
        return await this.volunteerModel.findOne({
            where: {
                id
            }
        });
    }

    async getVolunteerByEmail(email: string): Promise<Volunteer> {
        return await this.volunteerModel.findOne({
            where: {
                email
            }
        });
    }

    async updateVolunteer(id: number, updateVolunteerDto: UpdateVolunteerDto): Promise<Volunteer> {
        const volunteer = await this.volunteerModel.findByPk(id);

        if (updateVolunteerDto.age) {
          volunteer.age = updateVolunteerDto.age;
        }
    
        if (updateVolunteerDto.phoneNumber) {
            volunteer.phoneNumber = updateVolunteerDto.phoneNumber;
        }
    
        if (updateVolunteerDto.firstName) {
            volunteer.firstName = updateVolunteerDto.firstName;
        }
    
        if (updateVolunteerDto.lastName) {
            volunteer.lastName = updateVolunteerDto.lastName;
        }

        if (updateVolunteerDto.additionalInfo) {
            volunteer.additionalInfo = updateVolunteerDto.additionalInfo;
        }

        await volunteer.save();
    
        return volunteer;
    }
}
