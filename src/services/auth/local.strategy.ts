import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/dtos/user.dto';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, pass: string): Promise<User | UnauthorizedException> {
        Logger.log("hello world sssssssssssssss")
        Logger.log({ username, pass })

        const user = await this.authService.validateUser(username, pass);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}