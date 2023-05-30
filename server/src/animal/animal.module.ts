import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { TypeController } from './type/type.controller';
import { TypeService } from './type/type.service';
import { ColorService } from './color/color.service';
import { ColorController } from './color/color.controller';
import { StatusController } from './status/status.controller';
import { StatusService } from './status/status.service';
import { GenderService } from './gender/gender.service';
import { GenderController } from './gender/gender.controller';
import { CommunicationController } from './communication/communication.controller';
import { CommunicationService } from './communication/communication.service';
import { FurService } from './fur/fur.service';
import { FurController } from './fur/fur.controller';
import { BehaviorController } from './behavior/behavior.controller';
import { BehaviorService } from './behavior/behavior.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Animal } from './animal.model';
import { Type } from './type/type.model';
import { Status } from './status/status.model';
import { Gender } from './gender/gender.model';
import { Fur } from './fur/fur.model';
import { Communication } from './communication/communication.model';
import { Color } from './color/color.model';
import { Behavior } from './behavior/behavior.model';
import { AnimalController } from './animal.controller';
import { FileUploaderModule } from 'src/file-uploader/file-uploader.module';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AnimalService, TypeService, ColorService, StatusService, GenderService, CommunicationService, FurService, BehaviorService],
  controllers: [AnimalController, TypeController, ColorController, StatusController, GenderController, CommunicationController, FurController, BehaviorController],
  imports: [
    SequelizeModule.forFeature([Animal, Type, Status, Gender, Fur, Communication, Color, Behavior]),
    FileUploaderModule,
    UserModule,
  ],
  exports: [
    AnimalService,
    TypeService,
    StatusService,
    GenderService,
    FurService,
    CommunicationService,
    ColorService,
    BehaviorService
  ]
})
export class AnimalModule {}
