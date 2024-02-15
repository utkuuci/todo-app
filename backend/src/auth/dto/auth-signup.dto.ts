import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthSignupDto {

    @IsNotEmpty()
    @ApiProperty()
    firstName: string

    @IsNotEmpty()
    @ApiProperty()
    lastName: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    passwordCheck: string
}