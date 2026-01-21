import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.auth.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.auth.login(body.email, body.password);
  }
}
/**
 * Authentication Controller
 *
 * This controller handles incoming HTTP requests related to authentication.
 * It exposes endpoints for user registration and login, delegating the business logic
 * to the `AuthService`.
 */
