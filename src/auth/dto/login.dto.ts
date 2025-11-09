import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";


export class LoginDto {
    
    @ApiProperty({ name: 'email', description: 'Email of the user', type: String, example: 'usuario@example.com' })
    @IsEmail({}, { message: 'Email is invalid' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({ name: 'password', description: 'Password of the user', type: String, example: 'securePass123' })
    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @Min(6, { message: 'Password must be at least 6 characters long' })
    password: string;

}