import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Color } from './color.model';
import { CreateColorDto } from './dto/create-color.dto';
import { ColorService } from './color.service';

@ApiTags("Color")
@Controller('color')
export class ColorController {

    constructor(private colorService: ColorService) {}

    @ApiOperation({summary: 'Create color'})
    @ApiResponse({status: 200, type: Color})
    @Post()
    createColor(@Body() colorDto: CreateColorDto) {
        return this.colorService.createColor(colorDto);
    }

    @ApiOperation({summary: 'Get all colors'})
    @ApiResponse({status: 200, type: [Color]})
    @Get()
    getAll() {
        return this.colorService.getAllColors();
    }

    @ApiOperation({summary: 'Get color by value'})
    @ApiResponse({status: 200, type: Color})
    @Get('/:value')
    getColorByValue(@Param('value') value: string) {
        return this.colorService.getColorByValue(value);
    }

    @ApiOperation({summary: 'Get color by id'})
    @ApiResponse({status: 200, type: [Color]})
    @Get('/:id')
    getColorById(@Param('id') id: number) {
        return this.colorService.getColorById(id);
    }
}