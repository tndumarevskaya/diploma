import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Animal } from './animal.model';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { FileUploaderService } from 'src/file-uploader/file-uploader.service';
import { TypeService } from './type/type.service';
import { StatusService } from './status/status.service';
import { GenderService } from './gender/gender.service';
import { FurService } from './fur/fur.service';
import { CommunicationService } from './communication/communication.service';
import { ColorService } from './color/color.service';
import { BehaviorService } from './behavior/behavior.service';
import { ShelterService } from 'src/user/shelter.service';

@Injectable()
export class AnimalService {
  constructor(@InjectModel(Animal) private animalModel: typeof Animal,
    private fileUploaderService: FileUploaderService,
    private typeService: TypeService,
    private statusService: StatusService,
    private genderService: GenderService,
    private furService: FurService,
    private communicationService: CommunicationService,
    private colorService: ColorService,
    private behaviorService: BehaviorService,
    private shelterService: ShelterService) {}

  async createAnimal(
    createAnimalDto: CreateAnimalDto,
    imageFile: Express.Multer.File): Promise<Animal> {
    const { color_id, gender_id, fur_id, type_id, status_id, communication_id, behavior_id, shelter_id} = createAnimalDto;

    const shelter = await this.shelterService.getShelterById(shelter_id);
    const color = await this.colorService.getColorById(color_id);
    const gender = await this.genderService.getGenderById(gender_id);
    const fur = await this.furService.getFurById(fur_id);
    const type = await this.typeService.getTypeById(type_id);
    const status = await this.statusService.getStatusById(status_id);
    const communication = await this.communicationService.getCommunicationById(communication_id);
    const behavior = await this.behaviorService.getBehaviorById(behavior_id);
    const imageUrl = await this.fileUploaderService.uploadFile(imageFile);

    const animal = await this.animalModel.create({
      ...createAnimalDto
    });


    animal.image = imageUrl;
    animal.color = color;
    animal.shelter = shelter;
    animal.gender = gender;
    animal.fur = fur;
    animal.type = type;
    animal.status = status;
    animal.communication = communication;
    animal.behavior = behavior;

    await animal.save();
    return animal;
  }

  async getAllAnimals(shelterId: number, name: string, typeId: number, age: number, statusId: number, 
    genderId: number, colorId: number, size:number , communicationId: number, furId: number, behaviorId:number): Promise<Animal[]> {
    const filterOptions: any = {};

    if (shelterId) {
      filterOptions.shelter_id = shelterId;
    }
    if (name) {
      filterOptions.name = name;
    }
    if (typeId) {
      filterOptions.type_id = typeId;
    }
    if (age) {
      filterOptions.age = age;
    }
    if (statusId) {
      filterOptions.status_id = statusId;
    }
    if (genderId) {
      filterOptions.gender_id = genderId;
    }
    if (colorId) {
      filterOptions.color_id = colorId;
    }
    if (size) {
      filterOptions.size = size;
    }
    if (communicationId) {
      filterOptions.communication_id = communicationId;
    }
    if (furId) {
      filterOptions.fur_id = furId;
    }
    if (behaviorId) {
      filterOptions.behavior_id = behaviorId;
    }

    const filteredAnimals = await Animal.findAll({
      where: filterOptions,
      include: {all: true}
    });

    return filteredAnimals;
  }

  async getAnimalById(id: number): Promise<Animal> {
    const animal = await this.animalModel.findByPk(id, {include: {all: true}});
    return animal;
  }

  async updateAnimal(
    id: number, 
    updateAnimalDto: UpdateAnimalDto,
    imageFile?: Express.Multer.File
  ): Promise<Animal> {
    const animal = await this.animalModel.findByPk(id);

    if (imageFile) {
      const imageUrl = await this.fileUploaderService.uploadFile(imageFile);
      animal.image = imageUrl;
    }

    if (updateAnimalDto.age) {
      animal.age = updateAnimalDto.age;
    }

    if (updateAnimalDto.type_id) {
      animal.type_id = updateAnimalDto.type_id;
    }

    if (updateAnimalDto.status_id) {
      animal.status_id = updateAnimalDto.status_id;
    }

    if (updateAnimalDto.size) {
      animal.size = updateAnimalDto.size;
    }

    if (updateAnimalDto.name) {
      animal.name = updateAnimalDto.name;
    }

    if (updateAnimalDto.gender_id) {
      animal.gender_id = updateAnimalDto.gender_id;
    }

    if (updateAnimalDto.fur_id) {
      animal.fur_id = updateAnimalDto.fur_id;
    }

    if (updateAnimalDto.communication_id) {
      animal.communication_id = updateAnimalDto.communication_id;
    }

    if (updateAnimalDto.color_id) {
      animal.color_id = updateAnimalDto.color_id;
    }

    if (updateAnimalDto.behavior_id) {
      animal.behavior_id = updateAnimalDto.behavior_id;
    }

    if (updateAnimalDto.about) {
      animal.about = updateAnimalDto.about;
    }

    await animal.save();

    return animal;
  }

  async deleteAnimal(id: number): Promise<void> {
    await this.animalModel.destroy({
      where: { animal_id: id },
    });
  }
}