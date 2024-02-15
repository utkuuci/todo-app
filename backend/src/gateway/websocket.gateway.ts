import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto } from "./dto/message.dto";
import { OnModuleInit } from "@nestjs/common";
import { Server } from "socket.io";
import { EntityManager } from "typeorm";

@WebSocketGateway()
export class SocketServer implements OnModuleInit {
    constructor(private manager: EntityManager){}

    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connection', socket => {
            console.log(socket.id);
            console.log('connected')
        })
    }

    @SubscribeMessage('newmessage')
    async onNewMessage(@MessageBody() body: any) {
        this.server.emit('onMessage', {
            msg: 'New Message',
            content: body
        })
    }
}