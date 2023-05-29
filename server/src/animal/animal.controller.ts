import { Controller, Body, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Animal } from './animal.model';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { AnimalService } from './animal.service';

@ApiTags('Animal')
@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @ApiOperation({ summary: 'Create an animal' })
  @ApiResponse({ status: 201, description: 'The animal has been successfully created.', type: Animal })
  @Post()
  createAnimal(@Body() createAnimalDto: CreateAnimalDto): Promise<Animal> {
    return this.animalService.createAnimal(createAnimalDto);
  }

  @ApiOperation({ summary: 'Get all animals' })
  @ApiResponse({ status: 200, description: 'Returns an array of animals.', type: [Animal] })
  @Get()
  getAllAnimals(): Promise<Animal[]> {
    return this.animalService.getAllAnimals();
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
  updateAnimal(@Param('id') id: number, @Body() updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    return this.animalService.updateAnimal(id, updateAnimalDto);
  }

  @ApiOperation({ summary: 'Delete an animal' })
  @ApiResponse({ status: 200, description: 'The animal has been successfully deleted.' })
  @Delete(':id')
  deleteAnimal(@Param('id') id: number): Promise<void> {
    return this.animalService.deleteAnimal(id);
  }
}