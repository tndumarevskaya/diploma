import { Injectable, NestMiddleware, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Adopter, Shelter, User, Volunteer } from 'src/user/user.model';

interface RequestModel extends Request {
  user: User<Shelter | Volunteer | Adopter>;
}

@Injectable()
export class CheckRoleMiddleware implements NestMiddleware {
    private readonly allowedUserTypes: Set<string>;

    constructor(allowedUserTypes: string[]) {
        if (!allowedUserTypes || allowedUserTypes.length === 0) {
            throw new Error('allowedUserTypes must be a non-empty array');
        }
        this.allowedUserTypes = new Set(allowedUserTypes);
    }

    use(req: RequestModel, res: Response, next: NextFunction) {
        const user: User<Shelter | Volunteer | Adopter> = req.user;

        if (!user || !user.userType || !user.userType.value) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const userType: string = user.userType.value;

        if (!this.allowedUserTypes.has(userType)) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }

        next();
    }
}