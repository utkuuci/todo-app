import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserRoles } from "./roles.enum";
import { Todo } from "../todo/todo.entity";
import { Message } from "../message/message.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    @Index({unique: true})
    email: string

    @Column()
    password: string

    @Column()
    userRole: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @OneToMany(() => Todo, (todo) => todo.user)
    todos: Todo[]

    @OneToMany(() => Message, (message) => message.from)
    fromMessages: Message[]

    @OneToMany(() => Message, (message) => message.to)
    toMessages: Message[]
    
}