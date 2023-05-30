import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationStatus } from './application_status.model';
import { CreateStatusDto } from './dto/create-application-status.dto';
import { ApplicationStatusService } from './application_status.service';

@ApiTags("Application status")
@Controller('application_status')
export class ApplicationStatusController {

    constructor(private statusService: ApplicationStatusService) {}

    @ApiOperation({summary: 'Create status'})
    @ApiResponse({status: 200, type: ApplicationStatus})
    @Post()
    createStatus(@Body() statusDto: CreateStatusDto) {
        return this.statusService.createStatus(statusDto);
    }

    @ApiOperation({summary: 'Get all statuses'})
    @ApiResponse({status: 200, type: [ApplicationStatus]})
    @Get()
    getAll() {
        return this.statusService.getAllStatuses();
    }

    @ApiOperation({summary: 'Get status by value'})
    @ApiResponse({status: 200, type: ApplicationStatus})
    @Get('/:value')
    getStatusByValue(@Param('value') value: string) {
        return this.statusService.getStatusByValue(value);
    }
}