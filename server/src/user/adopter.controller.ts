import { Controller, Body, Post, Get, Param, UseGuards, Patch} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Adopter } from './user.model';
import { CreateAdopterDto } from './dto/create-adopter.dto';
import { UpdateAdopterDto } from './dto/update-adopter.dto';
import { AdopterService } from './adopter.service';
import { LoginAdopterDto } from './dto/login-adopter.dto';

ApiTags("Adopter")
@Controller('adopter')
export class AdopterController {

    constructor(private adopterService: AdopterService) {}

    @ApiOperation({summary: 'Create adopter and registrate'})
    @ApiResponse({status: 200, type: String})
    @Post('/registration')
    createVolunteer(@Body() adopterDto: CreateAdopterDto) {
        return this.adopterService.createAdopter(adopterDto);
    }

    @ApiOperation({summary: 'Login adopter'})
    @ApiResponse({status: 200, type: String})
    @Post('/login')
    loginVolunteer(@Body() adopterDto: LoginAdopterDto) {
        return this.adopterService.login(adopterDto);
    }

    @ApiOperation({summary: 'Get all adopters'})
    @ApiResponse({status: 200, type: [Adopter]})
    @Get()
    getAll() {
        return this.adopterService.getAllAdopters();
    }

    @ApiOperation({summary: 'Get adopter by last and first name'})
    @ApiResponse({status: 200, type: [Adopter]})
    @Get('/:lastName-:firstName')
    getAdopterrByName(@Param('lastName') lastName: string, @Param('firstName') firstName: string) {
        return this.adopterService.getAdopterByName(firstName, lastName);
    }

    @ApiOperation({summary: 'Get adopter by id'})
    @ApiResponse({status: 200, type: [Adopter]})
    @Get('/:id')
    getAdopterById(@Param('id') id: number) {
        return this.adopterService.getAdopterById(id);
    }

    @ApiOperation({summary: 'Get adopter by email'})
    @ApiResponse({status: 200, type: [Adopter]})
    @Get('/:email')
    getAdopterByEmail(@Param('email') email: string) {
        return this.adopterService.getAdopterByEmail(email);
    }

    @Patch(':id')
    updateAdopter(@Param('id') id: number, @Body() updateAdopterDto: UpdateAdopterDto) {
        return this.adopterService.updateAdopter(id, updateAdopterDto);
    }
}
