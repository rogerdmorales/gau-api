import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.model';
import { UserService } from '../user/user.service';
import { LoginDTO } from './dto/login.dto';
import { JwtPayload } from './jwt.strategy';
import { OAuth2Client } from 'google-auth-library';
import { AuthMethod } from './enum/auth-method';

const CLIENT_ID = '274535529742-jor0pqgm5390s1ef96a3kism5jkv4khr.apps.googleusercontent.com';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService) { }


    async login(loginDTO: LoginDTO) {
        const user = await this.userService.findByEmail(loginDTO.username);

        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await this.validatePassword(loginDTO.password, user.password);

        if (!isPasswordValid) {
            throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
        }
        const token = this._createToken(user);

        return {
            user,
            token
        };
    }

    async loginGoogle(idToken: string) {
        const client = new OAuth2Client(CLIENT_ID);
        
        const ticket = await client.verifyIdToken({
            idToken,
            audience: CLIENT_ID
        });

        const userInfo = ticket.getPayload();
        let user = await this.userService.findByEmail(userInfo.email);

        if (!user) {
            user = {
                name: userInfo.name,
                email: userInfo.email,
                photo: userInfo.picture,
                authMethod: AuthMethod.GOOGLE
            }
            await this.userService.create(user);
        }

        const token = this._createToken(user);

        return {
            user,
            token
        };
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        const user = await this.userService.findByEmail(payload.username);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async validatePassword(loginPassword: string, userPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(loginPassword, userPassword, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
    }

    private _createToken({ email }): String {
        const user: JwtPayload = { username: email };
        return this.jwtService.sign(user);
    }

}
