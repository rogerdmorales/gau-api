import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')  
    public async login(@Body() loginDTO: LoginDTO): Promise<any> {
      return await this.authService.login(loginDTO); 
    }
}
