import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserTypeService } from "./userType.service";
import { CreateUserTypeDto } from "./dto/create-userType.dto";

@Controller('userType')
export class UserTypeController {
    constructor(private userTypeService: UserTypeService) {}

    @Post()
    create(@Body() dto: CreateUserTypeDto) {
        return this.userTypeService.createUserType(dto);
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.userTypeService.getUserTypeByValue(value);
    }
}