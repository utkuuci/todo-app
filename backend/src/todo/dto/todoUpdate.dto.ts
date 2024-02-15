import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class TodoUpdateDto{
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    startDate: Date;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    endDate: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    todoStatus: string
}