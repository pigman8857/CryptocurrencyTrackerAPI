import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Portfolio } from '../entities/portfolio.entity';
import { Request } from 'express';
@Injectable()
export class CheckPortfolioGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const portfolio = request.portfolio as Portfolio
  
    const { id } = request.body as { id: number }
    if(!portfolio){
      throw new NotFoundException('Your portfolio does not exist');
    }

    if(portfolio.id != id){
       throw new BadRequestException('Your portfolio id in url param and body are not the same');
    }
 
    return true;
  }
}
