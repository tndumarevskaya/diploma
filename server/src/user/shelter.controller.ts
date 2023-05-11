import { Controller, Body, Post, Get, Param, UseGuards, Patch} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ShelterService } from './shelter.service';
import { Shelter } from './user.model';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { LoginShelterDto } from './dto/login-shelter.dto';

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

    @ApiOperation({summary: 'Get all shelters'})
    @ApiResponse({status: 200, type: [Shelter]})
    @Get()
    getAll() {
        return this.shelterService.getAllShelters();
    }

    @ApiOperation({summary: 'Get shelter by name'})
    @ApiResponse({status: 200, type: [Shelter]})
    @Get('/:name')
    getShelterByName(@Param('name') name: string) {
        return this.shelterService.getShelterByName(name);
    }

    @ApiOperation({summary: 'Get shelter by id'})
    @ApiResponse({status: 200, type: [Shelter]})
    @Get('/:id')
    getShelterById(@Param('id') id: number) {
        return this.shelterService.getShelterById(id);
    }

    @ApiOperation({summary: 'Get shelter by email'})
    @ApiResponse({status: 200, type: [Shelter]})
    @Get('/:email')
    getShelterByEmail(@Param('email') email: string) {
        return this.shelterService.getShelterByEmail(email);
    }

    @Patch(':id')
    updateShelter(@Param('id') id: number, @Body() updateShelterDto: UpdateShelterDto) {
        return this.shelterService.updateShelter(id, updateShelterDto);
    }
}
