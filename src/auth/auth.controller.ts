import { Controller, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')  
    public async login(@Body() loginDTO: LoginDTO): Promise<any> {
      return await this.authService.login(loginDTO); 
    }

    @Post('login/:token')
    public async loginGoogle(@Param() param): Promise<any> {
      return await this.authService.loginGoogle(param.token);
    }
}
