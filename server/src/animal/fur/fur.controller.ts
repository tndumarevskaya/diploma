import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Fur } from './fur.model';
import { CreateFurDto } from './dto/create-fur.dto';
import { FurService } from './fur.service';

@ApiTags("Fur")
@Controller('fur')
export class FurController {

    constructor(private furService: FurService) {}

    @ApiOperation({summary: 'Create fur'})
    @ApiResponse({status: 200, type: Fur})
    @Post('')
    createFur(@Body() furDto: CreateFurDto) {
        return this.furService.createFur(furDto);
    }

    @ApiOperation({summary: 'Get all furs'})
    @ApiResponse({status: 200, type: [Fur]})
    @Get()
    getAll() {
        return this.furService.getAllFurs();
    }

    @ApiOperation({summary: 'Get fur by value'})
    @ApiResponse({status: 200, type: Fur})
    @Get('/:value')
    getFurByValue(@Param('value') value: string) {
        return this.furService.getFurByValue(value);
    }

    @ApiOperation({summary: 'Get fur by id'})
    @ApiResponse({status: 200, type: [Fur]})
    @Get('/:id')
    getFurById(@Param('id') id: number) {
        return this.furService.getFurById(id);
    }
}