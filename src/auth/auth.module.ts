import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


@Global()
@Module({
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        JwtModule.register({
            secret: 'secret12356789'
        })
    ],
    providers: [JwtStrategy, AuthService],
    controllers: [AuthController],
    exports: [
        PassportModule,
        JwtModule
    ]
})
export class AuthModule { }