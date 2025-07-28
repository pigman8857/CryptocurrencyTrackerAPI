import { CurrentUserMiddleware } from './current-user.middleware';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
const { fn ,mock, spyOn} = jest
describe('CurrentUserMiddleware', () => {
  let userService: UserService;
  let middleware: CurrentUserMiddleware;

  beforeEach(() => {
    //@ts-ignore
    userService = {
      findOne: jest.fn(),
    };
    middleware = new CurrentUserMiddleware(userService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should do nothing if userID is not in session', async () => {
    const req: any = { session: {} };
    const res: any = {};
    const next = fn();

    await middleware.use(req, res, next);

    expect(req.currentUser).toBeUndefined();
    expect(userService.findOne).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should assign currentUser if userID is in session', async () => {
    //@ts-ignore
    const fakeUser: User = {
      id: 1,
      email: 'fakeEmail@somewhere.com',
      password: 'fakepassword',
    };

    spyOn(userService,"findOne").mockResolvedValue(fakeUser);

    const req: any = { session: { userID: 1 } };
    const res: any = {};
    const next = fn();

    await middleware.use(req, res, next);

    expect(userService.findOne).toHaveBeenCalledWith(1);
    expect(req.currentUser).toEqual(fakeUser);
    expect(next).toHaveBeenCalled();
  });
});
