import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "./user.service";
import { User } from "./user.model";

ApiTags("User")
@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: [User]})
    @Get('/:id')
    getAdopterById(@Param('id') id: number) {
        return this.userService.getUserById(id);
    }

}