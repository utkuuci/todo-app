import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { GatewayModule } from './gateway/gateway.module';
import { MessageModule } from './message/message.module';


@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), AuthModule, DatabaseModule, UserModule, TodoModule, GatewayModule, MessageModule],
})
export class AppModule {}
