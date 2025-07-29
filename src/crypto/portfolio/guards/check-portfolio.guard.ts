import { BadRequestException, CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Portfolio } from '../entities/portfolio.entity';

@Injectable()
export class CheckPortfolioGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const portfolio = request.portfolio as Portfolio
  
    const {portfolioId} = request.params as { portfolioId: number}
    if(!portfolio){
      throw new NotFoundException('Your portfolio does not exist');
    }

    if(portfolio.id != portfolioId){
       throw new BadRequestException('Your portfolio id in url param and body are not the same');
    }

    return true;
  }
}
