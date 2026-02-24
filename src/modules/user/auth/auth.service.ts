import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "@user/user.service";
import { PasswordHasher } from "@src/library_wrappers/passwordHasher";
import { User } from "@user/entities/user.entity";

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async signUp(email: string, password: string): Promise<User> {
      //See if email is in use
      const users = await this.userService.find(email);
      if(users.length){
          throw new BadRequestException('You have already signed up!');  ;
      }
     
      // Hash the users password
      const hashPassword = await PasswordHasher.hash(password);


      // Create a new user and save it
      const user = await this.userService.create(email, hashPassword);


      return user
    }

    async signIn (email: string, password: string): Promise<User> {
      const users = await this.userService.find(email);
      if(!users.length){
          throw new NotFoundException('User not found');  
      }

      const isTheSame = await PasswordHasher.verify(password,users[0].password);
      if(!isTheSame){
        throw new BadRequestException('bad password')
      }

      return users[0];
    }
}
