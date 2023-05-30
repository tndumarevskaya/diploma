import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Education } from './education.model';
import { FileUploaderModule } from 'src/file-uploader/file-uploader.module';

@Module({
  providers: [EducationService],
  controllers: [EducationController],
  imports: [
    SequelizeModule.forFeature([Education]),
    FileUploaderModule
  ],
  exports: [
    EducationService
  ]
})
export class EducationModule {}
