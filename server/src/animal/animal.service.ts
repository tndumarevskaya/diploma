import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Animal } from './animal.model';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';

@Injectable()
export class AnimalService {
  constructor(@InjectModel(Animal) private animalModel: typeof Animal) {}

  async createAnimal(createAnimalDto: CreateAnimalDto): Promise<Animal> {
    const animal = await this.animalModel.create(createAnimalDto);
    return animal;
  }

  async getAllAnimals(): Promise<Animal[]> {
    const animals = await this.animalModel.findAll();
    return animals;
  }

  async getAnimalById(id: number): Promise<Animal> {
    const animal = await this.animalModel.findByPk(id);
    return animal;
  }

  async getAnimalsByShelter(shelterId: number): Promise<Animal[]> {
    const animals = await this.animalModel.findAll({
      where: { shelter_id: shelterId },
    });
    return animals;
  }

  async updateAnimal(id: number, updateAnimalDto: UpdateAnimalDto): Promise<Animal> {
    await this.animalModel.update(updateAnimalDto, {
      where: { animal_id: id },
    });
    const updatedAnimal = await this.animalModel.findByPk(id);
    return updatedAnimal;
  }

  async deleteAnimal(id: number): Promise<void> {
    await this.animalModel.destroy({
      where: { animal_id: id },
    });
  }
}