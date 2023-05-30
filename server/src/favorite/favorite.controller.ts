import { Controller, Post, Delete, Get, Body, Param, Query } from '@nestjs/common';
import { ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Favorite } from './favorite.model';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @ApiProperty({ type: CreateFavoriteDto, description: 'Create Favorite' })
  @ApiResponse({ status: 201, description: 'The favorite has been successfully created.', type: Favorite })
  @Post()
  createFavorite(@Body() createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    return this.favoriteService.createFavorite(createFavoriteDto);
  }

  @ApiProperty({ type: Number, description: 'Favorite ID' })
  @ApiResponse({ status: 200, description: 'The favorite has been successfully deleted.' })
  @Delete(':id')
  deleteFavorite(@Param('id') id: number): Promise<void> {
    return this.favoriteService.deleteFavorite(id);
  }

  @ApiProperty({ description: 'Get all favorites for a specific adopter' })
  @ApiResponse({ status: 200, description: 'Returns an array of favorites.', type: [Favorite] })
  @Get()
  getAllFavorites(@Query('adopter_id') adopterId: number): Promise<Favorite[]> {
    return this.favoriteService.getAllFavorite(adopterId);
  }
}