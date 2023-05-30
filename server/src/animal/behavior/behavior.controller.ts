import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Behavior } from './behavior.model';
import { CreateBehaviorDto } from './dto/create-behavior.dto';
import { BehaviorService } from './behavior.service';

@ApiTags("Behavior")
@Controller('behavior')
export class BehaviorController {

    constructor(private behaviorService: BehaviorService) {}

    @ApiOperation({summary: 'Create behavior'})
    @ApiResponse({status: 200, type: Behavior})
    @Post()
    createBehavior(@Body() behaviorDto: CreateBehaviorDto) {
        return this.behaviorService.createBehavior(behaviorDto);
    }

    @ApiOperation({summary: 'Get all behaviors'})
    @ApiResponse({status: 200, type: [Behavior]})
    @Get()
    getAll() {
        return this.behaviorService.getAllBehaviors();
    }

    @ApiOperation({summary: 'Get behavior by value'})
    @ApiResponse({status: 200, type: Behavior})
    @Get('/:value')
    getBehaviorByValue(@Param('value') value: string) {
        return this.behaviorService.getBehaviorByValue(value);
    }

    @ApiOperation({summary: 'Get behavior by id'})
    @ApiResponse({status: 200, type: [Behavior]})
    @Get('/:id')
    getBehaviorById(@Param('id') id: number) {
        return this.behaviorService.getBehaviorById(id);
    }
}