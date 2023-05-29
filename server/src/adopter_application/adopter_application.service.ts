import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdopterApplication } from './adopter_application.model';
import { CreateAdopterApplicationDto } from './dto/create-adopter-application.dto';

@Injectable()
export class AdopterApplicationService {
  constructor(
    @InjectModel(AdopterApplication)
    private adopterApplicationModel: typeof AdopterApplication,
  ) {}

  async createAdopterApplication(dto: CreateAdopterApplicationDto): Promise<AdopterApplication> {
    const adopterApplication = await this.adopterApplicationModel.create(dto);
    return adopterApplication;
  }

  async getAdopterApplicationById(applicationId: number): Promise<AdopterApplication> {
    return await this.adopterApplicationModel.findByPk(applicationId);
  }

  async getAllAdopterApplications(): Promise<AdopterApplication[]> {
    return await this.adopterApplicationModel.findAll();
  }

  async deleteAdopterApplication(applicationId: number): Promise<void> {
    await this.adopterApplicationModel.destroy({ where: { application_id: applicationId } });
  }
}