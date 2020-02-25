import { Request, Response } from 'express';
import Logger from '../config/Logger';

const loggerMiddleware = (req: Request, resp: Response, next: any) => {
  Logger.info('Request logged:', req.method, req.path);
  next();
};

export default loggerMiddleware;
