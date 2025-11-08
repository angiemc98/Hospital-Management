import { IsEmail, IsNotEmpty, IsString, Min } from "class-validator";


export class LoginDto {
    @IsEmail({}, { message: 'Email is invalid' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password is required' })
    @Min(6, { message: 'Password must be at least 6 characters long' })
    password: string;

}