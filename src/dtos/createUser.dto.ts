import { IsArray, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export default class CreateUserDto {
    
    

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @Length(3, 50)
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsArray()
    @IsNotEmpty()
    roles: string[];


    constructor(email: string, password: string, name: string , roles : Array<string>) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.roles = roles;
    }
}