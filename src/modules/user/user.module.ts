import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { AuthService } from './auth/auth.service';
import { CurrentUserMiddleware } from '@src/common/middlewares/current-user.middleware';
import { Portfolio } from '@portfolio/entities/portfolio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,Portfolio])],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService], // 👈 Export for crypto module to use so that current-user.middleware that is also used by crypto module can use it.
})
export class UserModule {
    configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes(UserController);
  }
}
