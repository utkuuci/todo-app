import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto, AuthSignupDto } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("/login")
    login(@Body() loginDto: AuthLoginDto) {
        return this.authService.login(loginDto);
    }

    @Post("/signup")
    signup(@Body() signupDto: AuthSignupDto) {
        return this.authService.signup(signupDto)
    }
}
