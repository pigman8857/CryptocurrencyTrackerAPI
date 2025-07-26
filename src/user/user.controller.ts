import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthService } from './auth/auth.service';
import { UserDTO } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize/serialize.interceptor';
import { SignInDTO } from './dtos/signin-user.dto';

@Controller('user')
@Serialize(UserDTO)
export class UserController {
    constructor(
       private readonly userService: UserService,
       private readonly authService: AuthService
    ) {}

    @Post('/signup')
    async createUser(@Body()body : CreateUserDTO, @Session()session: any): Promise<User> {
        const user = await this.authService.signUp(body.email,body.password);
        //session.userID = user.id;
        return user;
    }

    @Post('/signin')
    async signIn(@Body()body : SignInDTO, @Session()session: any): Promise<User> {
        const user = await this.authService.signIn(body.email,body.password);
        //session.userID = user.id;
        return user;
    }

}
