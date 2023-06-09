import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Adopter, User } from './user.model';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { UpdateAdopterDto } from './dto/update-adopter.dto';
import { UserTypeService } from 'src/userType/userType.service';
import { AuthService } from 'src/auth/auth.service';
import { LoginAdopterDto } from './dto/login-adopter.dto';
import { FileUploaderService } from 'src/file-uploader/file-uploader.service';

@Injectable()
export class AdopterService {

    constructor(
        @InjectModel(Adopter) private adopterModel: typeof Adopter,
        @InjectModel(User) private userModel: typeof User,
        private userTypeService: UserTypeService,
        private authService: AuthService,
        private fileUploaderService: FileUploaderService
      ) {}

    async createAdopter(dto: CreateAdopterDto): Promise<string> {
        try {
            const adopter = await this.getAdopterByEmail(dto.email);
            if (!adopter) {
                const passwordHash = await this.authService.hashPassword(dto.password);
                const userType = await this.userTypeService.getUserTypeByValue("Adopter");
                const user = await this.userModel.create({
                    ...dto,
                    password: passwordHash
                });
                console.log(user);
                const adopter = await this.adopterModel.create({
                    id: user.id,
                    ...dto, 
                    password: passwordHash
                });
                console.log(userType);
                await user.$set('userType', userType);
                user.userType = userType;
                user.userTypeId = userType.id;
                await user.save();

                await adopter.$set('userType', userType);
                adopter.userType = userType;
                adopter.userTypeId = userType.id;
                await adopter.save();
                const token =  await this.authService.generateJwt(adopter.toJSON());
                return token;
            } else {
                throw new HttpException('Такой email уже используется', HttpStatus.CONFLICT);
            }
        } catch (e) {
            console.log(e);
            throw new HttpException('Такой email уже используется', HttpStatus.CONFLICT);
        }
    }

    async login(dto: LoginAdopterDto): Promise<string> {
        try {
            const foundAdopter = await this.getAdopterByEmail(dto.email);
            if (foundAdopter) {
                const passwordEquals = await this.authService.comparePasswords(dto.password, foundAdopter.password);
                if (passwordEquals) {
                    const payload = await this.adopterModel.findByPk(foundAdopter.id);
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

    async getAllAdopters(): Promise<Adopter[]> {
        return await this.adopterModel.findAll({include: {all: true}});
    }

    async getAdopterByName(firstName: string, lastName: string): Promise<Adopter> {
        return await this.adopterModel.findOne({
            where: {
                firstName,
                lastName
            }
        });
    }

    async getAdopterById(id: number): Promise<Adopter> {
        return await this.adopterModel.findByPk(id, {include: {all: true}});
    }

    async getAdopterByEmail(email: string): Promise<Adopter> {
        return await this.adopterModel.findOne({
            where: {
                email
            }
        });
    }

    async updateAdopter(
        id: number, 
        updateAdopterDto: UpdateAdopterDto,
        imageFile?: Express.Multer.File
      ): Promise<Adopter> {
        const adopter = await this.adopterModel.findByPk(id);
    
        if (imageFile) {
          const imageUrl = await this.fileUploaderService.uploadFile(imageFile);
          adopter.image = imageUrl;
        }
    
        if (updateAdopterDto.age) {
          adopter.age = updateAdopterDto.age;
        }
    
        if (updateAdopterDto.phoneNumber) {
          adopter.phoneNumber = updateAdopterDto.phoneNumber;
        }
    
        if (updateAdopterDto.firstName) {
          adopter.firstName = updateAdopterDto.firstName;
        }
    
        if (updateAdopterDto.lastName) {
          adopter.lastName = updateAdopterDto.lastName;
        }
    
        if (updateAdopterDto.additionalInfo) {
          adopter.additionalInfo = updateAdopterDto.additionalInfo;
        }

        if (updateAdopterDto.social) {
            adopter.social = updateAdopterDto.social;
        }

        if (updateAdopterDto.education) {
            adopter.education = updateAdopterDto.education;
        }

        if (updateAdopterDto.education) {
            adopter.work = updateAdopterDto.work;
        }
    
        await adopter.save();
    
        return adopter;
    }
}
