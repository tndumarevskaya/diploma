import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from "express";
import { AuthService } from "src/auth/auth.service";
import { AdopterService } from 'src/user/adopter.service';
import { ShelterService } from 'src/user/shelter.service';
import { Adopter, Shelter, User, Volunteer } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { VolunteerService } from 'src/user/volunteer.service';
import { UserTypeService } from 'src/userType/userType.service';

export interface RequestModel extends Request {
  user: Volunteer | Adopter | Shelter;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private authService: AuthService,
    private volunteerService: VolunteerService,
    private adopterService: AdopterService,
    private shelterService: ShelterService,
    private userTypeService: UserTypeService,
  ) {}

  async use(req: RequestModel, res: Response, next: NextFunction) {
        let tokenArray: string[];
        try {
            tokenArray = req.headers['authorization'].split(' ');
        } catch (error) {
            throw new HttpException('Invalid token format', HttpStatus.BAD_REQUEST);
        }
        
        let decodedToken;
        try {
            decodedToken = await this.authService.verifyJwt(tokenArray[1]);
        } catch (error) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        const userType = await this.userTypeService.getUserTypeById(decodedToken.userTypeId);

        let user: Volunteer | Adopter | Shelter;
        if (userType.value === "Volunteer") {
            user = await this.volunteerService.getVolunteerById(decodedToken.id);
        } else if (userType.value === "Adopter") {
            user = await this.adopterService.getAdopterById(decodedToken.id);
        } else if (userType.value === "Shelter") {
            user = await this.shelterService.getShelterById(decodedToken.id);
        }

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        console.log("Successful");
        req.user = user;
        next();
    }
}