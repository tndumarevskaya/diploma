import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Adopter, Shelter, User, Volunteer } from 'src/user/user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

  constructor(private readonly jwtService: JwtService) {}

  async generateJwt(user: Volunteer | Adopter | Shelter): Promise<string> {
    return this.jwtService.signAsync(user);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePasswords(password: string, storedPasswordHash: string): Promise<any> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }

}