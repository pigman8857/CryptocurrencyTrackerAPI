import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AuthService } from './auth/auth.service';
import { CurrentUserMiddleware } from '@src/middlewares/current-user/current-user.middleware';
import { TransactionHistory } from '@crypto/transaction-history/entities/transaction-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,TransactionHistory])],
  providers: [UserService, AuthService],
  controllers: [UserController]
})
export class UserModule {
    configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
