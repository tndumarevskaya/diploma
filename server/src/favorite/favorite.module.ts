import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { Favorite } from './favorite.model';
import { UserModule } from 'src/user/user.module';
import { AnimalModule } from 'src/animal/animal.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [FavoriteService],
  controllers: [FavoriteController],
  imports: [
    SequelizeModule.forFeature([Favorite]),
    UserModule,
    AnimalModule
  ],
  exports: [
    FavoriteService
  ]
})
export class FavoriteModule {}
