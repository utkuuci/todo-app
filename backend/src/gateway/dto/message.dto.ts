import { IsNotEmpty } from "class-validator";

export class MessageDto {
    message: string;
    from: number;
    to: number;
}