import { Module } from '@nestjs/common';
import { SocketServer } from './websocket.gateway';

@Module({
    providers: [SocketServer]
})
export class GatewayModule {}
