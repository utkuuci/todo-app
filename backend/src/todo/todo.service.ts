import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from 'src/entities/todo/todo.entity';
import { User } from 'src/entities/user/user.entity';
import { EntityManager } from 'typeorm';
import { TodoCreateDto } from './dto/todoCreate.dto';
import { TodoUpdateDto } from './dto/todoUpdate.dto';

@Injectable()
export class TodoService {
    constructor(
        private readonly manager: EntityManager
    ){}

    async getAllTodo(){
        const todos = await this.manager.find(Todo, {
            select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                todoStatus: true,
            }
        })
        return todos
    }

    async getUserTodo(user: User) {
        try {
            const todos = await this.manager.query(`SELECT * FROM todo WHERE "userId" = ${user.id}`)
            return todos;
        } catch (error) {
            console.error('getUserTodo Error:', error);
            throw error;
        }
    }

    async getTodoById(id: number){
        const todo = await this.manager.findOne(Todo, {
            select: {
                id: true,
                title: true,
                description: true,
                startDate: true,
                endDate: true,
                todoStatus: true,
            },
            where: {
                id: id
            }
        });
        if (todo === null) throw new NotFoundException("Not found");
        return todo;
    }

    async createTodo(user: User, todoCreateDto: TodoCreateDto){
        try {
            const todo = new Todo();
            todo.title = todoCreateDto.title;
            todo.description = todoCreateDto.description;
            todo.startDate = todoCreateDto.startDate;
            todo.endDate = todoCreateDto.endDate;
            todo.todoStatus = todoCreateDto.todoStatus;
            todo.user = user;
            
            const saved = await this.manager.save(Todo, todo);
            delete saved.user
            return saved;
        } catch(e) {
            throw new ForbiddenException(e);
        }
    }
    async updateTodo(todoUpdateDto: TodoUpdateDto, id: number) {
        try{ 
            const todo = await this.manager.findOne(Todo, {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    startDate: true,
                    endDate: true,
                    todoStatus: true,
                },
                where: {
                    id: id
                }
            });
            if (todo === null) {
                throw new NotFoundException("Not Found");
            }
            todo.title = todoUpdateDto.title;
            todo.description = todoUpdateDto.description;
            todo.startDate = todoUpdateDto.startDate;
            todo.endDate = todoUpdateDto.endDate;
            todo.todoStatus = todoUpdateDto.todoStatus;

            const updatedTodo = await this.manager.save(Todo, todo);
            return updatedTodo;
        } catch(e){
            throw new ForbiddenException(e);
        }
    }
    async deleteTodo(id: number) {
        try {
            const todo = await this.manager.findOne(Todo, {
                where: {
                    id: id
                }
            });
            if (todo === null) throw new NotFoundException("Not Found")
            const result = await this.manager.createQueryBuilder()
                                    .delete()
                                    .from(Todo)
                                    .where("id = :id", {id: id})
                                    .execute();
            return result;
        } catch(e) {
            throw new ForbiddenException(e)
        }
    }
}
