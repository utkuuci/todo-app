import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { SocketServer } from 'src/gateway/websocket.gateway';

@Module({
  providers: [MessageService, SocketServer],
  controllers: [MessageController]
})
export class MessageModule {}
