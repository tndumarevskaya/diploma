import { Controller, Post, Delete, Body, Param } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './favorite.model';

@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Post()
  createFavorite(@Body() createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    return this.favoriteService.createFavorite(createFavoriteDto);
  }

  @Delete(':id')
  deleteFavorite(@Param('id') id: number): Promise<void> {
    return this.favoriteService.deleteFavorite(id);
  }
}