import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly jwtService: JwtService) { }


    async login({ username, password }) {
        const user = await this.userService.findByEmail(username);

        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        // validar senha

        const token = this._createToken(user);

        return {
            username: user.email,
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

    private _createToken({ username }): String {
        const user: JwtPayload = { username };
        return this.jwtService.sign(user);
    }

}
