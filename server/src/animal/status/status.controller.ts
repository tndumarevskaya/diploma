import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Status } from './status.model';
import { CreateStatusDto } from './dto/create-status.dto';
import { StatusService } from './status.service';

@ApiTags("Status")
@Controller('status')
export class StatusController {

    constructor(private statusService: StatusService) {}

    @ApiOperation({summary: 'Create status'})
    @ApiResponse({status: 200, type: Status})
    @Post('/create')
    createStatus(@Body() statusDto: CreateStatusDto) {
        return this.statusService.createStatus(statusDto);
    }

    @ApiOperation({summary: 'Get all statuses'})
    @ApiResponse({status: 200, type: [Status]})
    @Get()
    getAll() {
        return this.statusService.getAllStatuses();
    }

    @ApiOperation({summary: 'Get status by value'})
    @ApiResponse({status: 200, type: Status})
    @Get('/:value')
    getStatusByValue(@Param('value') value: string) {
        return this.statusService.getStatusByValue(value);
    }
}