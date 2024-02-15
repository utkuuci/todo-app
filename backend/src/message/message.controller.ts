import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GetUser } from 'src/auth/decorators/getUser.decorator';
import { User } from 'src/entities/user/user.entity';
import { SendMessageDto } from './dto/sendMessage.dto';

@Controller('message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService
    ){}

    @Post("/send")
    @UseGuards(JwtGuard)
    sendMessage(@GetUser() user: User, @Body() sendMessageDto: SendMessageDto){
        
    }
}
