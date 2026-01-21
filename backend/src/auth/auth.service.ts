import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
  ) {}

  // Sign JWT token with user ID and email
  private signToken(userId: number, email: string) {
    return {
      access_token: this.jwt.sign({ sub: userId, email }),
    };
  }

  // Register a new user
  async register(data: { email: string; password: string; name: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.users.create({
      ...data,
      password: hashedPassword,
    });

    return this.signToken(user.id, user.email);
  }

  // Login an existing user
  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException();

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException();

    return this.signToken(user.id, user.email);
  }
}
/**
 * Authentication Module
 *
 * This module handles user authentication, including registration and login.
 * It leverages `AuthService` for core logic and `AuthController` for API endpoints.
 */
