import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Shelter, User } from './user.model';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserTypeService } from 'src/userType/userType.service';
import { LoginShelterDto } from './dto/login-shelter.dto';
import { FileUploaderService } from 'src/file-uploader/file-uploader.service';
import { Op } from 'sequelize';

@Injectable()
export class ShelterService {

    constructor(@InjectModel(Shelter) private shelterModel: typeof Shelter,
                @InjectModel(User) private userModel: typeof User,
                            private userTypeService: UserTypeService,
                            private authService: AuthService,
                            private fileUploaderService: FileUploaderService) {}

    async createShelter(dto: CreateShelterDto): Promise<string> {
        try {
            const shelter = await this.getShelterByEmail(dto.email);
            if (!shelter) {
                const passwordHash = await this.authService.hashPassword(dto.password);
                const userType = await this.userTypeService.getUserTypeByValue("Shelter");
                const user = await this.userModel.create({
                    ...dto,
                    password: passwordHash
                });
                //console.log(user.id);
                const shelter = await this.shelterModel.create({
                    id: user.id,
                    ...dto, 
                    password: passwordHash
                });
                user.userType = userType;
                user.userTypeId = userType.id;
                await user.save();
                
                shelter.userType = userType;
                shelter.userTypeId = userType.id;
                await shelter.save();
                const token =  await this.authService.generateJwt(shelter.toJSON());
                return token;
            } else {
                throw new HttpException('Такой email уже используется', HttpStatus.CONFLICT);
            }
        } catch (e) {
            console.log(e);
            throw new HttpException('Такой email уже используется', HttpStatus.CONFLICT);
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
                    throw new HttpException('Неправильный email или пароль', HttpStatus.UNAUTHORIZED);
                }
            } else {
                throw new HttpException('Неправильный email или пароль', HttpStatus.UNAUTHORIZED);
            }
            
        } catch (e) {
            console.log(e);
            throw new HttpException("Пользователь с такой почтой не найден", HttpStatus.NOT_FOUND);
        }
    }

    async getAllShelters(): Promise<Shelter[]> {
        return await this.shelterModel.findAll();
    }

    async getSheltersByName(name: string): Promise<Shelter[]> {
        return await this.shelterModel.findAll({
            where: {
                "name": {
                    [Op.like]: '%' + name + '%'
                }
            }
        });
    }

    async getShelterById(id: number): Promise<Shelter> {
        return await this.shelterModel.findByPk(id, {include: {all: true}});
    }

    async getShelterByEmail(email: string): Promise<Shelter> {
        return await this.shelterModel.findOne({
            where: {
                email
            }
        });
    }

    async updateShelter(id: number, updateShelterDto: UpdateShelterDto, imageFile?: Express.Multer.File): Promise<Shelter> {
        const shelter = await this.shelterModel.findByPk(id);

        if (!shelter) {
            throw new NotFoundException(`Shelter with ID ${id} not found.`);
        }

        if (imageFile) {
            const imageUrl = await this.fileUploaderService.uploadFile(imageFile);
            shelter.image = imageUrl;
        }

        const fieldsToUpdate = ['phoneNumber', 'name', 'address', 'schedule', 'social', 'about', 'additionalInfo'];

        fieldsToUpdate.forEach(field => {
            if (updateShelterDto[field]) {
                shelter[field] = updateShelterDto[field];
            }
        });

        await shelter.save();

        return shelter;
    }
}
