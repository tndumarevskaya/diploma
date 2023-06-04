import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Donation } from './donation.model';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';

@ApiTags('Donation')
@Controller('donation')
export class DonationController {
  constructor(private donationService: DonationService) {}

  @ApiOperation({ summary: 'Create an donation' })
  @ApiResponse({ status: 201, description: 'The donation has been successfully created', type: Donation })
  @Post()
  createDonation(@Body() createDonationDto: CreateDonationDto): Promise<Donation> {
    return this.donationService.createDonation(createDonationDto);
  }

  @ApiOperation({ summary: 'Get all donations' })
  @ApiResponse({ status: 200, description: 'Returns an array of donation', type: [Donation] })
  @Get()
  getAllDonation(@Query('shelter_id') shelter_id: number): Promise<Donation[]> {
    return this.donationService.getAllDonation(shelter_id);
  }

  @ApiOperation({ summary: 'Get donation by ID' })
  @ApiResponse({ status: 200, description: 'Returns the donation with the specified ID', type: Donation })
  @Get(':id')
  getDonationById(@Param('id') id: number): Promise<Donation> {
    return this.donationService.getDonationById(id);
  }
}