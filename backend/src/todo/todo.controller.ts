import { Body, Controller, Delete, Get, Param, Patch, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { User } from 'src/entities/user/user.entity';
import { UserRoles } from 'src/entities/user/roles.enum';
import { TodoCreateDto } from './dto/todoCreate.dto';
import { TodoUpdateDto } from './dto/todoUpdate.dto';

@Controller('todo')
export class TodoController {
    constructor(
        private readonly todoService: TodoService
    ){}

    @UseGuards(JwtGuard)
    @Get("/mytodo")
    getUserTodo(@GetUser() user: User){
        return this.todoService.getUserTodo(user);
    }

    @UseGuards(JwtGuard)
    @Get("/:id")
    getTodoById(@Param("id") id: number){
        return this.todoService.getTodoById(id)
    }

    @UseGuards(JwtGuard)
    @Post("/create")
    createTodo(@GetUser() user: User, @Body() todoCreateDto: TodoCreateDto){
        return this.todoService.createTodo(user, todoCreateDto)
    }

    @UseGuards(JwtGuard)
    @Patch("/update/:id")
    updateTodo(@Body() todoUpdateDto: TodoUpdateDto, @Param("id") id: number) {
        return this.todoService.updateTodo(todoUpdateDto, id);
    }

    @UseGuards(JwtGuard)
    @Delete('/delete/:id')
    deleteTodo(@Param("id") id: number) {
        return this.todoService.deleteTodo(id);
    }
}
