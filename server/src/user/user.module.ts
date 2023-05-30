import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Adopter, Shelter, User, Volunteer } from "./user.model";
import { UserType } from "src/userType/userType.model";
import { VolunteerService } from "./volunteer.service";
import { VolunteerController } from "./volunteer.controller";
import { AdopterService } from "./adopter.service";
import { AdopterController } from "./adopter.controller";
import { ShelterService } from "./shelter.service";
import { ShelterController } from "./shelter.controller";
import { UserTypeModule } from "src/userType/userType.module";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { AuthModule } from "src/auth/auth.module";
import { CheckRoleMiddleware } from "src/middleware/check.role.middleware";
import { FileUploaderModule } from "src/file-uploader/file-uploader.module";

@Module ({
    providers: [VolunteerService, AdopterService, ShelterService, UserService],
    controllers: [VolunteerController, AdopterController, ShelterController, UserController],
    imports: [
        SequelizeModule.forFeature([User, Volunteer, Adopter, Shelter, UserType]),
        UserTypeModule,
        AuthModule,
        FileUploaderModule
    ],
    exports: [
        VolunteerService,
        AdopterService,
        ShelterService,
        UserService
    ]
})

export class UserModule {}
// export class UserModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//       consumer
//         .apply(CheckRoleMiddleware)
//         .forRoutes('shelter*');
  
//       consumer
//         .apply(CheckRoleMiddleware)
//         .forRoutes('volunteer*');
  
//       consumer
//         .apply(CheckRoleMiddleware)
//         .forRoutes('adopter*');
//     }
// }

  
  
  
  