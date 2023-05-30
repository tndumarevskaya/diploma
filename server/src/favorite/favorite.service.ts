import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from './favorite.model';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(@InjectModel(Favorite) private favoriteModel: typeof Favorite) {}

  async createFavorite(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    return this.favoriteModel.create(createFavoriteDto);
  }

  async getAllFavorite(adopterId?: number): Promise<Favorite[]> {
    const whereCondition = adopterId ? { adopter_id: adopterId } : {};
    return this.favoriteModel.findAll({ where: whereCondition });
  }

  async deleteFavorite(id: number): Promise<void> {
    await this.favoriteModel.destroy({ where: { favorite_id: id } });
  }
}