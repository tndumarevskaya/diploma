import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from "./middleware/auth.middleware";
import { UserModule } from "./user/user.module";
import { UserTypeModule } from "./userType/userType.module";
import { User, Volunteer, Adopter, Shelter } from "./user/user.model";
import { UserType } from "./userType/userType.model";

@Module({
    controllers: [],
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
            models: [User, Volunteer, Adopter, Shelter, UserType],
            autoLoadModels: true
        }),
        UserModule,
        UserTypeModule,
        AuthModule
    ]
})

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