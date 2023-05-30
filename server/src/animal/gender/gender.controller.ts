import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Gender } from './gender.model';
import { CreateGenderDto } from './dto/create-gender.dto';
import { GenderService } from './gender.service';

@ApiTags("Gender")
@Controller('gender')
export class GenderController {

    constructor(private genderService: GenderService) {}

    @ApiOperation({summary: 'Create gender'})
    @ApiResponse({status: 200, type: Gender})
    @Post('')
    createGender(@Body() genderDto: CreateGenderDto) {
        return this.genderService.createGender(genderDto);
    }

    @ApiOperation({summary: 'Get all genders'})
    @ApiResponse({status: 200, type: [Gender]})
    @Get()
    getAll() {
        return this.genderService.getAllGenders();
    }

    @ApiOperation({summary: 'Get gender by value'})
    @ApiResponse({status: 200, type: Gender})
    @Get('/:value')
    getGenderByValue(@Param('value') value: string) {
        return this.genderService.getGenderByValue(value);
    }

    @ApiOperation({summary: 'Get gender by id'})
    @ApiResponse({status: 200, type: [Gender]})
    @Get('/:id')
    getGenderById(@Param('id') id: number) {
        return this.genderService.getGenderById(id);
    }
}