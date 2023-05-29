import { Injectable } from '@nestjs/common';
import { Education } from './education.model';
import { CreateEducationDto } from './dto/create-education.dto';

@Injectable()
export class EducationService {
  async createEducation(dto: CreateEducationDto): Promise<Education> {
    return Education.create(dto);
  }

  async getEducationById(educationId: number): Promise<Education> {
    return Education.findByPk(educationId);
  }

  async getAllEducations(): Promise<Education[]> {
    return Education.findAll();
  }

  async deleteEducation(educationId: number): Promise<void> {
    const education = await Education.findByPk(educationId);
    await education.destroy();
  }
}