import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Type } from './type.model';
import { CreateTypeDto } from './dto/create-type.dto';
import { TypeService } from './type.service';

@ApiTags("Type")
@Controller('type')
export class TypeController {

    constructor(private typeService: TypeService) {}

    @ApiOperation({summary: 'Create type'})
    @ApiResponse({status: 200, type: Type})
    @Post('/create')
    createType(@Body() typeDto: CreateTypeDto) {
        return this.typeService.createType(typeDto);
    }

    @ApiOperation({summary: 'Get all types'})
    @ApiResponse({status: 200, type: [Type]})
    @Get()
    getAll() {
        return this.typeService.getAllTypes();
    }

    @ApiOperation({summary: 'Get type by value'})
    @ApiResponse({status: 200, type: Type})
    @Get('/:value')
    getTypeByValue(@Param('value') value: string) {
        return this.typeService.getTypeByValue(value);
    }
}