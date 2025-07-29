import { BadRequestException, ExecutionContext, NotFoundException } from '@nestjs/common';
import { CheckPortfolioGuard } from './check-portfolio.guard';
import { Portfolio } from '@portfolio/entities/portfolio.entity';

describe('CheckPortfolioGuard', () => {

  let guard: CheckPortfolioGuard;

  beforeEach(() => {
    guard = new CheckPortfolioGuard();
  });

  const createMockContext = ({portfolio, body}: {portfolio?:Portfolio; body?: {id : number} }): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({  
          portfolio,
          body
        }),
      }),
    } as unknown as ExecutionContext;
  };


  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true if portfolio is present and portfolio id in body match', async () => {
    const mockContext = createMockContext(
      { 
        //@ts-ignore
        portfolio: { 
          id:1, 
          purchasePrice: 999, 
          amount: 1, 
          dateOfPurchase: new Date() 
        }, 
        body: { id : 1 }
      }
    );
    await expect(guard.canActivate(mockContext)).toBe(true);
  });

  it('should throw NotFoundException if portfolio is missing', async () => {
    const mockContext = createMockContext({portfolio: undefined, body : { id : 1}});

    //Use double await trick to handle the asynchronous logic
    await expect(async () => {
      await guard.canActivate(mockContext);
    }).rejects.toThrowError(new NotFoundException('Your portfolio does not exist'));
  });

  it('should throw BadRequestException if portfolio id in body and in request.portfolio are not the same', async () => {
    const mockContext = createMockContext(
      { 
        //@ts-ignore
        portfolio: { 
          id:1, 
          purchasePrice: 999, 
          amount: 1, 
          dateOfPurchase: new Date() 
        }, 
        body: { id:2 }
      }
    );

    //Use double await trick to handle the asynchronous logic
    await expect(async () => {
      await guard.canActivate(mockContext);
    }).rejects.toThrowError(new BadRequestException('Your portfolio id in url param and body are not the same'));
  });


});
