import cors from 'cors';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import httpStatus from 'http-status';
import { registerRoutes } from './registerRoutes';
import { errorHandler } from './Shared/ErrorHandler';

export class App {
  private app: express.Express;
  private port: string;
  readonly apiPath = '/api';

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8000';
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes() {
    const router = Router();
    this.app.use('/api', router);

    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      errorHandler.handleError(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen() {
    this.app.listen(this.port, () => {
      console.log(` App🐶 is running at http://localhost:${this.port}${this.apiPath} 🚀`);
      console.log(' Press CTRL-C to stop\n');
    });
  }

  getAppExpress() {
    return this.app;
  }
}
