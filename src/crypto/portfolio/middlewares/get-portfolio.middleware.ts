import { Injectable, NestMiddleware } from '@nestjs/common';
import { PortfolioService } from '../portfolio.service';
import { Request,Response, NextFunction} from 'express';

@Injectable()
export class GetPortfolioMiddleware implements NestMiddleware {
  constructor(private portfolioService: PortfolioService){}
  async use(req: Request, res: Response, next: NextFunction) {    
    const id = +req.params[0] as number
    if(id) {
        const portfolio =  await this.portfolioService.findOne(id)  
        req.portfolio = portfolio;
    }

    next();
  }
}
