import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user.service";
import { PasswordHasher } from "src/library_wrappers/passwordHasher";
import { User } from "../entities/user.entity";

@Injectable()
export class AuthService {
    constructor(private userService: UserService){}

    async signUp(email: string, password: string): Promise<User> {
      //See if email is in use
      const users = await this.userService.find(email);
      if(users.length){
          throw new BadRequestException;
      }

      // Hash the users password
      const hashPassword = await PasswordHasher.hash(password);

      //Test verify, will be to another login method later.
      // const isTheSame = await BcryptHasherWrapper.verify(password,hashPassword);
      // console.log('isTheSame >',isTheSame);

      // Create a new user and save it
      const user = await this.userService.create(email, hashPassword);


      return user
    }
}
