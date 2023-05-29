import { Injectable, NestMiddleware, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Adopter, Shelter, User, Volunteer } from 'src/user/user.model';

interface RequestModel extends Request {
  user: User<Shelter | Volunteer | Adopter>;
}

@Injectable()
export class CheckRoleMiddleware implements NestMiddleware {
    constructor(private readonly allowedUserTypes: string[]) {}

    use(req: RequestModel, res: Response, next: NextFunction) {
        const user: User<Shelter | Volunteer | Adopter> = req.user;

        if (!user) {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const userType: string = user.userType.value;

        if (!this.allowedUserTypes.includes(userType)) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        next();
    }
}