import { Injectable } from '@nestjs/common';
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

  async getVolunteerApplicationById(applicationId: number): Promise<VolunteerApplication> {
    return await this.volunteerApplicationModel.findByPk(applicationId);
  }

  async getAllVolunteerApplications(): Promise<VolunteerApplication[]> {
    return await this.volunteerApplicationModel.findAll();
  }

  async deleteVolunteerApplication(applicationId: number): Promise<void> {
    await this.volunteerApplicationModel.destroy({ where: { application_id: applicationId } });
  }
}