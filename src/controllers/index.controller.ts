import * as express from 'express';
import { Request, Response } from 'express';
import IControllerBase from '../interfaces/IControllerBase.interface';

class IndexController implements IControllerBase {
  public path = '/';

  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get('/', this.index);
    this.router.post('/', this.post);
  }

  index = (req: Request, res: Response) => {
    const users = [
      {
        id: 1,
        name: 'Ali',
      },
      {
        id: 2,
        name: 'Can',
      },
      {
        id: 3,
        name: 'Ahmet',
      },
    ];

    res.status(200).json({ users });
  };

  post = (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  };
}

export default IndexController;
