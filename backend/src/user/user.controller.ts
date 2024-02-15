import { Controller, Get, Param, ParamData, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { User } from 'src/entities/user/user.entity';
import { UserRoles } from 'src/entities/user/roles.enum';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @UseGuards(JwtGuard)
    @Get('me')
    @ApiBearerAuth("Token")
    getMe(@GetUser() user: User){
        return user;
    }

    @UseGuards(JwtGuard)
    @Get('/all')
    @ApiBearerAuth("Token")
    getAll(){
        return this.userService.getAll();
    }

    @UseGuards(JwtGuard)
    @Get('/:id')
    getUserById(@Param("id") id: number){
        return this.userService.getUserById(id);
    }
}
