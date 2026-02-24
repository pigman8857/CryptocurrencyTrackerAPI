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

  it('should do nothing if id is not in params', async () => {
    const req: any = { params: {} };
    const res: any = {};
    const next = fn();

    await middleware.use(req, res, next);

    expect(req.currentUser).toBeUndefined();
    expect(portfolioService.findOne).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should assign portfolio if portfolio id param is presented ', async () => {
    //@ts-ignore
    const fakePortfolio: Portfolio = {
      id: 1,
      amount : 999,
      dateOfPurchase: new Date()
    };

    spyOn(portfolioService,"findOne").mockResolvedValue(fakePortfolio);

    const req: any = { params: { "0": "1"} };
    const res: any = {};
    const next = fn();

    await middleware.use(req, res, next);

    expect(portfolioService.findOne).toHaveBeenCalledWith(1);
    expect(req.portfolio).toEqual(fakePortfolio);
    expect(next).toHaveBeenCalled();
  });
});
