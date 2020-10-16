import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')  
    public async login(@Body() loginDTO: LoginDTO): Promise<any> {
      return await this.authService.login(loginDTO); 
    }

    @Post('refresh/:token')
    public async renewToken(@Param() param) {
      return await this.authService.renewToken(param.token);
    }

    @Post('login/:token')
    public async loginGoogle(@Param() param): Promise<any> {
      return await this.authService.loginGoogle(param.token);
    }
}
