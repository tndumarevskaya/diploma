import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from "express";
import { AuthService } from "src/auth/auth.service";
import { AdopterService } from 'src/user/adopter.service';
import { ShelterService } from 'src/user/shelter.service';
import { Adopter, Shelter, User, Volunteer } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { VolunteerService } from 'src/user/volunteer.service';

export interface RequestModel extends Request {
  user: Volunteer | Adopter | Shelter;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(
    private authService: AuthService,
    private volunteerService: VolunteerService,
    private adopterService: AdopterService,
    private shelterService: ShelterService
  ) {}

  async use(req: RequestModel, res: Response, next: NextFunction) {
        try {
            const tokenArray: string[] = req.headers['authorization'].split(' ');
            const decodedToken = await this.authService.verifyJwt(tokenArray[1]);
        
            let user: Volunteer | Adopter | Shelter;
            if (req.path.startsWith('/volunteer')) {
                user = await this.volunteerService.getVolunteerById(decodedToken.user.id);
            } else if (req.path.startsWith('/adopter')) {
                user = await this.adopterService.getAdopterById(decodedToken.user.id);
            } else if (req.path.startsWith('/shelter')) {
                user = await this.shelterService.getShelterById(decodedToken.user.id);
            }
            
            if (user) {
                req.user = user;
                next();
            } else {
                throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
            }
        } catch {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
    }
}