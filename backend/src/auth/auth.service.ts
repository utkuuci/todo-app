import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthSignupDto } from './dto';
import { EntityManager } from 'typeorm';
import * as argon from 'argon2';
import { User } from 'src/entities/user/user.entity';
import { UserRoles } from 'src/entities/user/roles.enum';

@Injectable({})
export class AuthService {

    constructor(
        private configService: ConfigService,
        private jwtService: JwtService,
        private readonly manager: EntityManager
    ){}
    
    async login(authDto: AuthLoginDto){
        try {
            // Find User
            const user = await this.manager.findOneBy(User, {
                email: authDto.email
            });
            // If user is not found
            if (user === null) 
                throw ("Email or password invalid");
            
            // Password match
            const pwMatches = await argon.verify(user.password, authDto.password);
            // If password is not matched
            if (!pwMatches)
                throw ("Email or password invalid");

            // Sign token
            return this.signToken(user.id, user.email);

        } catch(error){
            throw new BadRequestException(error);
        }
    }

    async signup(authDto: AuthSignupDto){
        try{
            // Hash password
            if (authDto.password !== authDto.passwordCheck) 
                throw ("Invalid Credentials");

            const u = await this.manager.findOneBy(User, {
                email: authDto.email
            })

            if (u !== null) {
                throw ("Invalid Credentials");
            }

            const hash = await argon.hash(authDto.password)

            // Create user
            const user = new User();
            user.email = authDto.email;
            user.password = hash;
            user.firstName = authDto.firstName;
            user.lastName = authDto.lastName;
            user.userRole = UserRoles.User;

            
            const createdUser = await this.manager.save(User, user);
            
            // sign token
            return this.signToken(createdUser.id, createdUser.email);
        } catch(error) {
            throw new ForbiddenException(error);
        }
    }

    private async signToken(userId: number, email: string): Promise<{access_token: string}>{
        const payload = {sub: userId, email: email}
        const secret = this.configService.get("JWT_SECRET");
        const token = await this.jwtService.signAsync(payload, {
            expiresIn: '30d',
            secret: secret
        })
        return {access_token: token}
    }
}
