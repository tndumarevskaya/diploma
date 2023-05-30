import { Controller, Body, Post, Get, Param, Patch, Delete, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Animal } from './animal.model';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { AnimalService } from './animal.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Animal')
@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @ApiOperation({ summary: 'Create an animal' })
  @ApiResponse({ status: 201, description: 'The animal has been successfully created.', type: Animal })
  @UseInterceptors(FileInterceptor('image'))
  @Post()
  createAnimal(@Body() createAnimalDto: CreateAnimalDto,
    @UploadedFile() image: Express.Multer.File): Promise<Animal> {
    return this.animalService.createAnimal(createAnimalDto, image);
  }

  @ApiOperation({ summary: 'Get all animals'})
  @ApiResponse({ status: 200, description: 'Returns an array of all filtered animals.', type: [Animal] })
  @Get()
  getAllAnimals(
    @Query('shelter_id') shelter_id: number,
    @Query('name') name: string,
    @Query('type_id') type_id: number,
    @Query('age') age: number,
    @Query('status_id') status_id: number,
    @Query('gender_id') gender_id: number,
    @Query('color_id') color_id: number,
    @Query('size') size: number,
    @Query('communication_id') communication_id: number,
    @Query('fur_id') fur_id: number,
    @Query('behavior_id') behavior_id: number,
  ): Promise<Animal[]> {
    return this.animalService.getAllAnimals(shelter_id, name, type_id, age, status_id, gender_id, color_id, size, communication_id, fur_id, behavior_id);
  }

  @ApiOperation({ summary: 'Get an animal by ID' })
  @ApiResponse({ status: 200, description: 'Returns the animal with the specified ID.', type: Animal })
  @Get(':id')
  getAnimalById(@Param('id') id: number): Promise<Animal> {
    return this.animalService.getAnimalById(id);
  }

  @ApiOperation({ summary: 'Update an animal' })
  @ApiResponse({ status: 200, description: 'The animal has been successfully updated.', type: Animal })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  updateAnimal(
    @Param('id') id: number,
    @Body() updateAdopterDto: UpdateAnimalDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    return this.animalService.updateAnimal(id, updateAdopterDto, image);
  }
  
  @ApiOperation({ summary: 'Delete an animal' })
  @ApiResponse({ status: 200, description: 'The animal has been successfully deleted.' })
  @Delete(':id')
  deleteAnimal(@Param('id') id: number): Promise<void> {
    return this.animalService.deleteAnimal(id);
  }
}