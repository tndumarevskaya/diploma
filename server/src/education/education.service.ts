import { Injectable } from '@nestjs/common';
import { Education } from './education.model';
import { CreateEducationDto } from './dto/create-education.dto';
import { InjectModel } from '@nestjs/sequelize';
import { FileUploaderService } from 'src/file-uploader/file-uploader.service';

@Injectable()
export class EducationService {

  constructor(@InjectModel(Education) private educationModel: typeof Education,
    private fileUploaderService: FileUploaderService) {}

  async createEducation(dto: CreateEducationDto,
    imageFile: Express.Multer.File): Promise<Education> {
    const education = await this.educationModel.create(dto);
    const image = await this.fileUploaderService.uploadFile(imageFile);
    education.image = image;
    await education.save();
    return education;
  }

  async getEducationById(educationId: number): Promise<Education> {
    return await this.educationModel.findByPk(educationId);
  }

  async getAllEducations(): Promise<Education[]> {
    return await this.educationModel.findAll();
  }

  async deleteEducation(educationId: number): Promise<void> {
    await this.educationModel.destroy({
      where: { education_id: educationId },
    });
  }
}