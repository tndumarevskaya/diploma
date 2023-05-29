import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import { VolunteerApplicationService } from './volunteer_application.service';
import { CreateVolunteerApplicationDto } from './dto/create-volunteer-application.dto';
import { VolunteerApplication } from './volunteer_application.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Volunteer Application')
@Controller('volunteer-application')
export class VolunteerApplicationController {
  constructor(private volunteerApplicationService: VolunteerApplicationService) {}

  @ApiOperation({ summary: 'Create a volunteer application' })
  @ApiResponse({ status: 201, description: 'The volunteer application has been successfully created', type: VolunteerApplication })
  @Post()
  createVolunteerApplication(
    @Body() createVolunteerApplicationDto: CreateVolunteerApplicationDto,
  ): Promise<VolunteerApplication> {
    return this.volunteerApplicationService.createVolunteerApplication(createVolunteerApplicationDto);
  }

  @ApiOperation({ summary: 'Get a volunteer application by ID' })
  @ApiResponse({ status: 200, description: 'The volunteer application has been successfully retrieved', type: VolunteerApplication })
  @Get(':id')
  getVolunteerApplicationById(@Param('id') id: number): Promise<VolunteerApplication> {
    return this.volunteerApplicationService.getVolunteerApplicationById(id);
  }

  @ApiOperation({ summary: 'Get all volunteer applications' })
  @ApiResponse({ status: 200, description: 'All volunteer applications have been successfully retrieved', type: [VolunteerApplication] })
  @Get()
  getAllVolunteerApplications(): Promise<VolunteerApplication[]> {
    return this.volunteerApplicationService.getAllVolunteerApplications();
  }

  @ApiOperation({ summary: 'Delete a volunteer application by ID' })
  @ApiResponse({ status: 204, description: 'The volunteer application has been successfully deleted' })
  @Delete(':id')
  deleteVolunteerApplication(@Param('id') id: number): Promise<void> {
    return this.volunteerApplicationService.deleteVolunteerApplication(id);
  }
}