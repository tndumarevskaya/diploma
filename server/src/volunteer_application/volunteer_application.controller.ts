import { Controller, Get, Param, Post, Delete, Body, Query, Patch } from '@nestjs/common';
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

  @ApiOperation({ summary: 'Get all volunteer applications by shelter ID' })
  @ApiResponse({ status: 200, description: 'All volunteer applications for the specified shelter have been successfully retrieved', type: [VolunteerApplication] })
  @Get()
  getAllVolunteerApplications(
    @Query('shelter_id') shelterId: number,
    @Query('name') name: string,
    @Query('status_id') statusId: number): Promise<VolunteerApplication[]> {
  return this.volunteerApplicationService.getAllVolunteerApplications(shelterId, name, statusId);
  }

  @ApiOperation({ summary: 'Update the status of a volunteer application' })
  @ApiResponse({ status: 200, description: 'The status of the volunteer application has been successfully updated', type: VolunteerApplication })
  @Patch(':id')
  updateVolunteerApplicationStatus(
    @Param('id') id: number,
    @Body('status_id') statusId: number,
  ): Promise<VolunteerApplication> {
    return this.volunteerApplicationService.updateStatus(id, statusId);
  }

  @ApiOperation({ summary: 'Delete a volunteer application by ID' })
  @ApiResponse({ status: 204, description: 'The volunteer application has been successfully deleted' })
  @Delete(':id')
  deleteVolunteerApplication(@Param('id') id: number): Promise<void> {
    return this.volunteerApplicationService.deleteVolunteerApplication(id);
  }
}