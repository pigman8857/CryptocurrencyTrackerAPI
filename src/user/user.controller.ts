import { Body, Controller, Get, Param, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { AuthService } from './auth/auth.service';
import { UserDTO } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';

@Controller('user')
@Serialize(UserDTO)
export class UserController {
    constructor(
       private readonly userService: UserService,
       private authService: AuthService
    ) {}

    @Post('/signup')
    async createUser(@Body()body : CreateUserDTO, @Session()session: any): Promise<User> {
        console.log('signup body',body);
        const user = await this.authService.signUp(body.email,body.password);
        //session.userID = user.id;
        return user;
    }

}
