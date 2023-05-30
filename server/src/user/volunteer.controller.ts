import { Controller, Body, Post, Get, Param, UseGuards, Patch, UseInterceptors, UploadedFile} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VolunteerService } from './volunteer.service';
import { Volunteer } from './user.model';
import { CreateVolunteerDto } from './dto/create-volunteer.dto';
import { UpdateVolunteerDto } from './dto/update-volunteer.dto';
import { LoginVolunteerDto } from './dto/login-volunteer.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags("Volunteer")
@Controller('volunteer')
export class VolunteerController {

    constructor(private volunteerService: VolunteerService) {}

    @ApiOperation({summary: 'Create volunteer and registrate'})
    @ApiResponse({status: 200, type: String})
    @Post('/registration')
    createVolunteer(@Body() volunteerDto: CreateVolunteerDto) {
        return this.volunteerService.createVolunteer(volunteerDto);
    }

    @ApiOperation({summary: 'Login volunteer'})
    @ApiResponse({status: 200, type: String})
    @Post('/login')
    loginVolunteer(@Body() volunteerDto: LoginVolunteerDto) {
        return this.volunteerService.login(volunteerDto);
    }

    @ApiOperation({summary: 'Get all volunteers'})
    @ApiResponse({status: 200, type: [Volunteer]})
    @Get()
    getAll() {
        return this.volunteerService.getAllVolunteers();
    }

    @ApiOperation({summary: 'Get volunteer by last and first name'})
    @ApiResponse({status: 200, type: [Volunteer]})
    @Get('/:lastName-:firstName')
    getVolunteerByName(@Param('lastName') lastName: string, @Param('firstName') firstName: string) {
        return this.volunteerService.getVolunteerByName(firstName, lastName);
    }

    @ApiOperation({summary: 'Get volunteer by id'})
    @ApiResponse({status: 200, type: [Volunteer]})
    @Get('/:id')
    getVolunteerById(@Param('id') id: number) {
        return this.volunteerService.getVolunteerById(id);
    }

    @ApiOperation({summary: 'Get volunteer by email'})
    @ApiResponse({status: 200, type: [Volunteer]})
    @Get('/:email')
    getVolunteerByEmail(@Param('email') email: string) {
        return this.volunteerService.getVolunteerByEmail(email);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image'))
    updateVolunteer(
        @Param('id') id: number,
        @Body() updateAdopterDto: UpdateVolunteerDto,
        @UploadedFile() image: Express.Multer.File
    ) {
        return this.volunteerService.updateVolunteer(id, updateAdopterDto, image);
    }
}
