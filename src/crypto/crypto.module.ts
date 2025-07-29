import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './crypto.controller';
import { User } from '@src/user/entities/user.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from './entities/crypto.entity';
import { Portfolio } from '@portfolio/entities/portfolio.entity';
import { PortfolioService } from '@portfolio/portfolio.service';
import { PortfolioController } from './portfolio/portfolio.controller';
import { CurrentUserMiddleware } from '@src/middlewares/current-user/current-user.middleware';
import { GetPortfolioMiddleware } from './portfolio/middlewares/get-portfolio.middleware';
import { UserModule } from '@src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto,Portfolio,User]), UserModule],
  controllers: [CryptoController, PortfolioController],
  providers: [CryptoService, PortfolioService],
})
export class CryptoModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes(CryptoController, PortfolioController);
    consumer
      .apply(GetPortfolioMiddleware)
      .forRoutes({ path: 'crypto/portfolio/*', method: RequestMethod.PATCH })
  }
}
