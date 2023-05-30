import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from "./middleware/auth.middleware";
import { UserModule } from "./user/user.module";
import { UserTypeModule } from "./userType/userType.module";
import { User, Volunteer, Adopter, Shelter } from "./user/user.model";
import { UserType } from "./userType/userType.model";
import { ChatModule } from './chat/chat.module';
import { AnimalController } from './animal/animal.controller';
import { AnimalModule } from './animal/animal.module';
import { Animal } from "./animal/animal.model";
import { Type } from "./animal/type/type.model";
import { FavoriteModule } from './favorite/favorite.module';
import { VolunteerApplicationModule } from './volunteer_application/volunteer_application.module';
import { AdopterApplicationModule } from './adopter_application/adopter_application.module';
import { DonationModule } from './donation/donation.module';
import { EducationModule } from './education/education.module';
import { ApplicationStatusModule } from './application_status/application_status.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { Status } from "./animal/status/status.model";
import { Gender } from "./animal/gender/gender.model";
import { Fur } from "./animal/fur/fur.model";
import { Communication } from "./animal/communication/communication.model";
import { Color } from "./animal/color/color.model";
import { Behavior } from "./animal/behavior/behavior.model";
import { AdopterApplication } from "./adopter_application/adopter_application.model";
import { ApplicationStatus } from "./application_status/application_status.model";
import { Chat } from "./chat/chat.model";
import { Message } from "./chat/message/message.model";
import { Donation } from "./donation/donation.model";
import { Education } from "./education/education.model";
import { Favorite } from "./favorite/favorite.model";
import { VolunteerApplication } from "./volunteer_application/volunteer_application.model";

@Module({
    controllers: [AnimalController],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
            isGlobal: true
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Volunteer, Adopter, Shelter, UserType, Animal, Type, Status, Gender, 
                Fur, Communication, Color, Behavior, AdopterApplication, 
                ApplicationStatus, Chat, Message, Donation, Education, Favorite, VolunteerApplication],
            autoLoadModels: true
        }),
        UserModule,
        UserTypeModule,
        AuthModule,
        ChatModule,
        AnimalModule,
        FavoriteModule,
        VolunteerApplicationModule,
        AdopterApplicationModule,
        DonationModule,
        EducationModule,
        ApplicationStatusModule,
        FileUploaderModule
    ]
})

// export class AppModule {}

export class AppModule implements NestModule {
    configure(user: MiddlewareConsumer) {
      user
        .apply(AuthMiddleware)
        .exclude(
            { path: '/volunteer/registration', method: RequestMethod.POST},
            { path: '/volunteer/login', method: RequestMethod.POST},
            { path: '/adopter/registration', method: RequestMethod.POST},
            { path: '/adopter/login', method: RequestMethod.POST},
            { path: '/shelter/registration', method: RequestMethod.POST},
            { path: '/shelter/login', method: RequestMethod.POST},
        )
        .forRoutes('')
    }
}