import { Controller, Body, Post, Get, Param, UseGuards, Patch, UseInterceptors, UploadedFile, Query, Req} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShelterService } from './shelter.service';
import { Shelter } from './user.model';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { LoginShelterDto } from './dto/login-shelter.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Shelter")
@Controller('shelter')
export class ShelterController {

    constructor(private shelterService: ShelterService) {}

    @ApiOperation({summary: 'Create shelter and registrate'})
    @ApiResponse({status: 200, type: String})
    @Post('/registration')
    createVolunteer(@Body() shelterDto: CreateShelterDto) {
        return this.shelterService.createShelter(shelterDto);
    }

    @ApiOperation({summary: 'Login volunteer'})
    @ApiResponse({status: 200, type: String})
    @Post('/login')
    loginVolunteer(@Body() shelterDto: LoginShelterDto) {
        return this.shelterService.login(shelterDto);
    }

    @ApiOperation({summary: 'Get shelters'})
    @ApiResponse({status: 200, type: [Shelter]})
    @Get()
    async getShelters(@Query('name') name: string) {
        if (name) {
            return await this.shelterService.getSheltersByName(name);
        } else {
            return await this.shelterService.getAllShelters();
        }
    }

    @ApiOperation({summary: 'Get shelter by id'})
    @ApiResponse({status: 200, type: [Shelter]})
    @Get('/:id')
    getShelterById(@Param('id') id: number) {
        return this.shelterService.getShelterById(id);
    }

    // @ApiOperation({summary: 'Get shelter by email'})
    // @ApiResponse({status: 200, type: [Shelter]})
    // @Get()
    // getShelterByEmail(@Query('email') email: string) {
    //     return this.shelterService.getShelterByEmail(email);
    // }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image'))
    async updateShelter(
        @Param('id') id: number,
        @UploadedFile() image: Express.Multer.File,
        @Req() req: any
    ) {
        const updateShelterDto: UpdateShelterDto = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        schedule: req.body.schedule,
        additionalInfo: req.body.additionalInfo,
        social: req.body.social,
        about: req.body.about,
        };
        return this.shelterService.updateShelter(id, updateShelterDto, image);
    }
}
