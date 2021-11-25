import { Injectable } from '@nestjs/common';
import { User as UserModel } from '.prisma/client'
import { User as UserDto, UserAuth } from '../../dtos/user.dto'
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {

    }
    async findOne(email: string): Promise<UserAuth | undefined> {
        const userFromDb = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        })
        return this.mapUser(userFromDb)

    }

    private mapUser(userModel: UserModel | undefined): UserAuth | undefined {
        if (!userModel)
            return undefined
        const mappedUser = new UserAuth();
        mappedUser.email = userModel.email
        mappedUser.id = userModel.id
        mappedUser.name = userModel.name
        mappedUser.password = userModel.password
        return mappedUser
    }

}


