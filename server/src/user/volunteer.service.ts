import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, Volunteer } from './user.model';
import { UserTypeService } from 'src/userType/userType.service';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginVolunteerDto } from './dto/login-volunteer.dto';
import { FileUploaderService } from 'src/file-uploader/file-uploader.service';

@Injectable()
export class VolunteerService {

    constructor(@InjectModel(Volunteer) private volunteerModel: typeof Volunteer,
                @InjectModel(User) private userModel: typeof User,
                            private userTypeService: UserTypeService,
                            private authService: AuthService,
                            private fileUploaderService: FileUploaderService) {}

    async createVolunteer(dto: CreateVolunteerDto): Promise<string> {
        try {
            const volunteer = await this.getVolunteerByEmail(dto.email);
            console.log(dto);
            if (!volunteer) {
                const passwordHash = await this.authService.hashPassword(dto.password);
                const userType = await this.userTypeService.getUserTypeByValue("Volunteer");
                const user = await this.userModel.create({
                    ...dto,
                    password: passwordHash
                });
                const volunteer = await this.volunteerModel.create({
                    id: user.id,
                    ...dto, 
                    password: passwordHash
                });
                console.log(userType);
                user.userType = userType;
                user.userTypeId = userType.id;
                await user.save();

                volunteer.userType = userType;
                volunteer.userTypeId = userType.id;
                await volunteer.save();
                const token =  await this.authService.generateJwt(volunteer.toJSON());
                return token;
            } else {
                throw new HttpException('Такой email уже используется', HttpStatus.CONFLICT);
            }
        } catch (e) {
            console.log(e);
            throw new HttpException('Такой email уже используется', HttpStatus.CONFLICT);
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
        return await this.volunteerModel.findByPk(id, {include: {all: true}});
    }

    async getVolunteerByEmail(email: string): Promise<Volunteer> {
        return await this.volunteerModel.findOne({
            where: {
                email
            }
        });
    }

    async updateVolunteer(
        id: number, updateVolunteerDto: UpdateVolunteerDto,
        imageFile?: Express.Multer.File
      ): Promise<Volunteer> {
        const volunteer = await this.volunteerModel.findByPk(id);

        if (imageFile) {
            const imageUrl = await this.fileUploaderService.uploadFile(imageFile);
            volunteer.image = imageUrl;
        }

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
