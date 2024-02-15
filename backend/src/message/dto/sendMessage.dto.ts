import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SendMessageDto {

    @IsNotEmpty()
    @ApiProperty()
    message: string

    @IsNotEmpty()
    @IsNumber()
    to: number
}