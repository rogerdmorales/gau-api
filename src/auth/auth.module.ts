import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth/auth.service';


@Module({
    imports: [
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false
        }),
        JwtModule.register({
            secretOrPrivateKey: 'secret12356789'
        })
    ],
    providers: [UserModule, JwtStrategy, AuthService]
})
export class AuthModule { }