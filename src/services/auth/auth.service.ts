import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserAuth, User } from 'src/dtos/user.dto';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {

    }

    async validateUser(email: string, password: string): Promise<User | null> {
        Logger.log({ email, password })
        const user: UserAuth | undefined = await this.usersService.findOne(email);
        if (user && user.password === password) {
            return user as User;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
