import { Injectable, NestMiddleware } from '@nestjs/common';
import { PortfolioService } from '../portfolio.service';
import { Request,Response, NextFunction} from 'express';

@Injectable()
export class GetPortfolioMiddleware implements NestMiddleware {
  constructor(private portfolioService: PortfolioService){}
  async use(req: Request, res: Response, next: NextFunction) {    
    const {id: portfolioId} = req.body as {id: number}
    if(portfolioId) {
        const portfolio =  await this.portfolioService.findOne(portfolioId)  
        req.portfolio = portfolio;
    }
    next();
  }
}
