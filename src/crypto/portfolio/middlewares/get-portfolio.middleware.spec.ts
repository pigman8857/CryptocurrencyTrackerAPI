import { Portfolio } from '@portfolio/entities/portfolio.entity';
import { PortfolioService } from '@portfolio/portfolio.service';
import { GetPortfolioMiddleware } from './get-portfolio.middleware';
const { fn ,mock, spyOn} = jest
describe('GetPortfolioMiddleware', () => {

  let portfolioService: PortfolioService;
  let middleware: GetPortfolioMiddleware;

  beforeEach(() => {
    //@ts-ignore
    portfolioService = {
      findOne: jest.fn(),
    };
    middleware = new GetPortfolioMiddleware(portfolioService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should do nothing if userID is not in session', async () => {
    const req: any = { body: {} };
    const res: any = {};
    const next = fn();

    await middleware.use(req, res, next);

    expect(req.currentUser).toBeUndefined();
    expect(portfolioService.findOne).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should assign portfolio if portfolio id is presented ', async () => {
    //@ts-ignore
    const fakePortfolio: Portfolio = {
      id: 1,
      Amount : 999,
      DateOfPurchase: new Date()
    };

    spyOn(portfolioService,"findOne").mockResolvedValue(fakePortfolio);

    const req: any = { body: { id: 1} };
    const res: any = {};
    const next = fn();

    await middleware.use(req, res, next);

    expect(portfolioService.findOne).toHaveBeenCalledWith(1);
    expect(req.portfolio).toEqual(fakePortfolio);
    expect(next).toHaveBeenCalled();
  });
});
