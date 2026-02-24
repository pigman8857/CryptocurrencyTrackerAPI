import { Injectable,NestMiddleware } from "@nestjs/common";
import { Request,Response, NextFunction} from 'express';
import { UserService } from "@user/user.service";

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(private userService:UserService){}
    async use(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        const { userID : userId} = req.session || {} as { userID : number};

        if(userId) {
            const user = await this.userService.findOne(userId);     
            req.currentUser = user;
        }

        next();
    }
}