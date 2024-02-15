import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class TodoCreateDto {
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