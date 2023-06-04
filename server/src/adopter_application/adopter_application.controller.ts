import { Controller, Get, Param, Post, Delete, Body, Query, Patch } from '@nestjs/common';
import { AdopterApplicationService } from './adopter_application.service';
import { CreateAdopterApplicationDto } from './dto/create-adopter-application.dto';
import { AdopterApplication } from './adopter_application.model';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Adopter Application')
@Controller('adopter-application')
export class AdopterApplicationController {
  constructor(private adopterApplicationService: AdopterApplicationService) {}

  @ApiOperation({ summary: 'Create an adopter application' })
  @ApiResponse({ status: 201, description: 'The adopter application has been successfully created', type: AdopterApplication })
  @Post()
  createAdopterApplication(
    @Body() createAdopterApplicationDto: CreateAdopterApplicationDto,
  ): Promise<AdopterApplication> {
    return this.adopterApplicationService.createAdopterApplication(createAdopterApplicationDto);
  }

  @ApiOperation({ summary: 'Get an adopter application by ID' })
  @ApiResponse({ status: 200, description: 'The adopter application has been successfully retrieved', type: AdopterApplication })
  @Get(':id')
  getAdopterApplicationById(@Param('id') id: number): Promise<AdopterApplication> {
    return this.adopterApplicationService.getAdopterApplicationById(id);
  }

  @ApiOperation({ summary: 'Get all adopter applications' })
  @ApiResponse({ status: 200, description: 'All adopter applications have been successfully retrieved', type: [AdopterApplication] })
  @Get()
  getAllAdopterApplications(
    @Query('shelter_id') shelterId: number,
    @Query('name') name: string,
    @Query('status_id') statusId: number
    ): Promise<AdopterApplication[]> {
    return this.adopterApplicationService.getAllAdopterApplications(shelterId, name, statusId);
  }

  @ApiOperation({ summary: 'Update the status of the application' })
  @ApiResponse({ status: 200, description: 'The status of the application has been successfully updated', type: AdopterApplication })
  @Patch(':id')
  updateVolunteerApplicationStatus(
    @Param('id') id: number,
    @Body('status_id') statusId: number,
  ): Promise<AdopterApplication> {
    return this.adopterApplicationService.updateStatus(id, statusId);
  }

  @ApiOperation({ summary: 'Delete an adopter application by ID' })
  @ApiResponse({ status: 204, description: 'The adopter application has been successfully deleted' })
  @Delete(':id')
  deleteAdopterApplication(@Param('id') id: number): Promise<void> {
    return this.adopterApplicationService.deleteAdopterApplication(id);
  }
}