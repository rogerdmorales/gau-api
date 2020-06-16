import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { User } from 'src/user/user.model';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UserDTO } from '../user/user.dto';

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

        console.log('user> ' + JSON.stringify(user));


        return {
            user: user,
            token
        };
    }

    async validateUser(payload: JwtPayload): Promise<User> {
        console.log(JSON.stringify(payload));
        const user = await this.userService.findByEmail(payload.username);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async validatePassword(loginPassword: string, userPassword: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(loginPassword, userPassword, function(err, result) {
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
