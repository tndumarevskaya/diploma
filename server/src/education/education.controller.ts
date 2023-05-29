import { Controller, Get, Param, Post, Delete, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { Education } from './education.model';

@ApiTags('Education')
@Controller('education')
export class EducationController {
  constructor(private educationService: EducationService) {}

  @ApiOperation({ summary: 'Create an education article' })
  @ApiResponse({ status: 201, description: 'The education article has been successfully created', type: Education })
  @Post()
  createEducation(@Body() createEducationDto: CreateEducationDto): Promise<Education> {
    return this.educationService.createEducation(createEducationDto);
  }

  @ApiOperation({ summary: 'Get an education article by ID' })
  @ApiResponse({ status: 200, description: 'The education article has been successfully retrieved', type: Education })
  @Get(':id')
  getEducationById(@Param('id') id: number): Promise<Education> {
    return this.educationService.getEducationById(id);
  }

  @ApiOperation({ summary: 'Get all education articles' })
  @ApiResponse({ status: 200, description: 'All education articles have been successfully retrieved', type: [Education] })
  @Get()
  getAllEducations(): Promise<Education[]> {
    return this.educationService.getAllEducations();
  }

  @ApiOperation({ summary: 'Delete an education article by ID' })
  @ApiResponse({ status: 204, description: 'The education article has been successfully deleted' })
  @Delete(':id')
  deleteEducation(@Param('id') id: number): Promise<void> {
    return this.educationService.deleteEducation(id);
  }
}