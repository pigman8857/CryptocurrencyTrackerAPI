import { Body, Controller, Get, Param, Post, Session, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthService } from './auth/auth.service';
import { UserDTO } from './dto/user.dto';
import { Serialize } from '@src/interceptors/serialize.interceptor';
import { SignInDTO } from './dto/signin-user.dto';
import { CurrentUser } from '@src/decorators/current-user.decorator'
import { AuthDataGuard } from '@src/guards/auth-data.guard';


@Controller('user')
@Serialize(UserDTO)
export class UserController {
    constructor(
       private readonly userService: UserService,
       private readonly authService: AuthService
    ) {}

    @Get('/whoami')
    whoAmI(@CurrentUser() user: User){
        return user;
    }

    @Post('/signup')
    @UseGuards(AuthDataGuard)
    async createUser(@Body()body : CreateUserDTO, @Session()session: any): Promise<User> {
        const user = await this.authService.signUp(body.email,body.password);
        session.userID = user.id;
        return user;
    }

    @Post('/signin')
    @UseGuards(AuthDataGuard)
    async signIn(@Body()body : SignInDTO, @Session()session: any): Promise<User> {
        const user = await this.authService.signIn(body.email,body.password);
        session.userID = user.id;
        return user;
    }

    @Post('signOut')
    signOut(@Session()session: any){
        session.userID = null;
    }

}
