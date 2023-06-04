import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { VolunteerApplication } from './volunteer_application.model';
import { CreateVolunteerApplicationDto } from './dto/create-volunteer-application.dto';

@Injectable()
export class VolunteerApplicationService {
  constructor(
    @InjectModel(VolunteerApplication)
    private volunteerApplicationModel: typeof VolunteerApplication,
  ) {}

  async createVolunteerApplication(dto: CreateVolunteerApplicationDto): Promise<VolunteerApplication> {
    const volunteerApplication = await this.volunteerApplicationModel.create(dto);
    return volunteerApplication;
  }

  async getVolunteerApplicationById(application_id: number): Promise<VolunteerApplication> {
    return await this.volunteerApplicationModel.findByPk(application_id, {include:{all: true}});
  }

  async getAllVolunteerApplications(shelter_id, name, status_id): Promise<VolunteerApplication[]> {
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

    return await this.volunteerApplicationModel.findAll({where: filterOptions, include:{all: true}});
  }

  async updateStatus(application_id: number, statusId: number): Promise<VolunteerApplication> {
    const volunteerApplication = await this.volunteerApplicationModel.findByPk(application_id);
    
    if (!volunteerApplication) {
      throw new NotFoundException('Volunteer application not found');
    }
    
    volunteerApplication.status_id = statusId;
    await volunteerApplication.save();
    
    console.log(volunteerApplication);
    return volunteerApplication;
  }

  
  async deleteVolunteerApplication(applicationId: number): Promise<void> {
    await this.volunteerApplicationModel.destroy({ where: { application_id: applicationId } });
  }
}