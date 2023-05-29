import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
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
  getAllAdopterApplications(): Promise<AdopterApplication[]> {
    return this.adopterApplicationService.getAllAdopterApplications();
  }

  @ApiOperation({ summary: 'Delete an adopter application by ID' })
  @ApiResponse({ status: 204, description: 'The adopter application has been successfully deleted' })
  @Delete(':id')
  deleteAdopterApplication(@Param('id') id: number): Promise<void> {
    return this.adopterApplicationService.deleteAdopterApplication(id);
  }
}