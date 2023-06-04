import { Injectable, NotFoundException } from '@nestjs/common';
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
    return await this.adopterApplicationModel.findByPk(applicationId, {include: {all: true}});
  }

  async getAllAdopterApplications(shelter_id, name, status_id): Promise<AdopterApplication[]> {
    const filterOptions: any = {};

    if (shelter_id) {
      filterOptions.shelter_id = shelter_id;
    }
    if (name) {
      filterOptions.name = name;
    }
    if (status_id) {
      filterOptions.status_id = status_id;
    }
    return await this.adopterApplicationModel.findAll({where: filterOptions, include:{all: true}});
  }

  async updateStatus(application_id: number, statusId: number): Promise<AdopterApplication> {
    const application = await this.adopterApplicationModel.findByPk(application_id);
    
    if (!application) {
      throw new NotFoundException('Adopter application not found');
    }
    
    application.status_id = statusId;
    await application.save();
    
    console.log(application);
    return application;
  }

  async deleteAdopterApplication(applicationId: number): Promise<void> {
    await this.adopterApplicationModel.destroy({ where: { application_id: applicationId } });
  }
}