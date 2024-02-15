import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user/user.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly manager: EntityManager
    ){}

    async getAll(){
        const userRepo = this.manager.getRepository(User);
        const data  = await userRepo.find({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                userRole: true,
            }
        });

        return { data }
    }

    async getUserById(id: number){
        const user = await this.manager.findOne(User, {
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                userRole: true,
            },
            where: {
                id
            }
        })
        if (user === null) { throw new BadRequestException("User couldn't found") }
        return user;
    }
}
