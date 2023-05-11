import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shelter } from './user.model';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserTypeService } from 'src/userType/userType.service';
import { LoginShelterDto } from './dto/login-shelter.dto';

@Injectable()
export class ShelterService {

    constructor(@InjectModel(Shelter) private shelterModel: typeof Shelter,
                            private userTypeService: UserTypeService,
                            private authService: AuthService) {}

    async createShelter(dto: CreateShelterDto): Promise<string> {
        try {
            console.log(dto);
            const shelter = await this.getShelterByEmail(dto.email);
            if (!shelter) {
                const passwordHash = await this.authService.hashPassword(dto.password);
                const userType = await this.userTypeService.getUserTypeByValue("Shelter");
                const shelter = await this.shelterModel.create({
                    ...dto, 
                    password: passwordHash
                });
                console.log(userType);
                await shelter.$set('userType', userType);
                shelter.userType = userType;
                shelter.userTypeId = userType.id;
                await shelter.save();
                const token =  await this.authService.generateJwt(shelter.toJSON());
                return token;
            } else {
                throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
            }
        } catch (e) {
            console.log(e);
            throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
        }
    }

    async login(dto: LoginShelterDto): Promise<string> {
        try {
            const foundShelter = await this.getShelterByEmail(dto.email);
            if (foundShelter) {
                const passwordEquals = await this.authService.comparePasswords(dto.password, foundShelter.password);
                if (passwordEquals) {
                    const payload = await this.shelterModel.findByPk(foundShelter.id);
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

    async getAllShelters(): Promise<Shelter[]> {
        return await this.shelterModel.findAll();
    }

    async getShelterByName(name: string): Promise<Shelter> {
        return await this.shelterModel.findOne({
            where: {
                name
            }
        });
    }

    async getShelterById(id: number): Promise<Shelter> {
        return await this.shelterModel.findOne({
            where: {
                id
            }
        });
    }

    async getShelterByEmail(email: string): Promise<Shelter> {
        return await this.shelterModel.findOne({
            where: {
                email
            }
        });
    }

    async updateShelter(id: number, updateShelterrDto: UpdateShelterDto): Promise<Shelter> {
        const shelter = await this.shelterModel.findByPk(id);

        if (updateShelterrDto.phoneNumber) {
            shelter.phoneNumber = updateShelterrDto.phoneNumber;
        }
    
        if (updateShelterrDto.name) {
            shelter.name = updateShelterrDto.name;
        }

        if (updateShelterrDto.address) {
            shelter.address = updateShelterrDto.address;
        }

        if (updateShelterrDto.schedule) {
            shelter.schedule = updateShelterrDto.schedule;
        }

        if (updateShelterrDto.additionalInfo) {
            shelter.additionalInfo = updateShelterrDto.additionalInfo;
        }
    
        await shelter.save();
    
        return shelter;
    }
}
