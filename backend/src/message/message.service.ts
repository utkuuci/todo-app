import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user/user.entity';
import { SocketServer } from 'src/gateway/websocket.gateway';
import { EntityManager } from 'typeorm';
import { SendMessageDto } from './dto/sendMessage.dto';
import { Message } from 'src/entities/message/message.entity';

@Injectable()
export class MessageService {
    constructor(
        private readonly manager: EntityManager,
        private readonly socket: SocketServer
    ){}

    async sendMessage(user: User, sendMessageDto: SendMessageDto){
        try {
            const body = { ...sendMessageDto, from: user.id }
            await this.socket.onNewMessage(body);
    
            const toUser = await this.manager.findOneBy(User, { id: sendMessageDto.to })

            if (toUser === null) throw new NotFoundException("Not found");

            const m = new Message()
            m.message = sendMessageDto.message;
            m.from = user;
            m.to = toUser
    
            const message = await this.manager.save(Message, m);
    
            return message;
        }
        catch(e) {
            throw new ForbiddenException(e)
        }
    }
    async getPersonMessages(user: User, id: number){
        const toUser = await this.manager.findOneBy(User, { id: id });
        if (toUser === null) throw new NotFoundException("Not found");
        const messages = this.manager.find(Message, {
            where: {
                from: user,
                to: toUser
            }
        })
    }
}
