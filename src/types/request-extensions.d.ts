import { Portfolio } from '@src/crypto/portfolio/entities/portfolio.entity';
import { User } from '@user/entities/user.entity';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
      portfolio?: Portfolio;
    }
  }
}