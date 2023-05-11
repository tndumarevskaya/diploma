import { Module } from "@nestjs/common";
import { UserType } from "./userType.model";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserTypeService } from "./userType.service";
import { UserTypeController } from "./userType.controller";

@Module ({
    providers: [UserTypeService],
    controllers: [UserTypeController],
    imports: [
      SequelizeModule.forFeature([UserType])
    ],
    exports: [
        UserTypeService
    ]
  })
  export class UserTypeModule {}