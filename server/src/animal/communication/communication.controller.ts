import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Communication } from './communication.model';
import { CreateCommunicationDto } from './dto/create-communication.dto';
import { CommunicationService } from './communication.service';

@ApiTags("Communication")
@Controller('communication')
export class CommunicationController {

    constructor(private communicationService: CommunicationService) {}

    @ApiOperation({summary: 'Create communication'})
    @ApiResponse({status: 200, type: Communication})
    @Post('')
    createCommunication(@Body() communicationDto: CreateCommunicationDto) {
        return this.communicationService.createCommunication(communicationDto);
    }

    @ApiOperation({summary: 'Get all Communications'})
    @ApiResponse({status: 200, type: [Communication]})
    @Get()
    getAll() {
        return this.communicationService.getAllCommunications();
    }

    @ApiOperation({summary: 'Get communication by value'})
    @ApiResponse({status: 200, type: Communication})
    @Get('/:value')
    getCommunicationByValue(@Param('value') value: string) {
        return this.communicationService.getCommunicationByValue(value);
    }

    @ApiOperation({summary: 'Get communication by id'})
    @ApiResponse({status: 200, type: [Communication]})
    @Get('/:id')
    getCommunicationById(@Param('id') id: number) {
        return this.communicationService.getCommunicationById(id);
    }
}