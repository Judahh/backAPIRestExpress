import express from 'express';

import RouterSingleton from './router/routerSingleton';
import { DatabaseHandler, IDatabaseHandler } from 'backapi';
import execute from './loader';

export default class SimpleApp {
  express: express.Application;
  router: RouterSingleton;
  databaseHandler: DatabaseHandler;
  constructor(router: RouterSingleton, databaseHandler: DatabaseHandler) {
    this.express = express();
    this.middlewares();
    this.router = router;
    this.databaseHandler = databaseHandler;
    this.routes(databaseHandler.getInit());
  }

  protected middlewares(): void {
    this.express.use(express.json());
  }

  protected async routes(initDefault?: IDatabaseHandler): Promise<void> {
    this.router.createRoutes(initDefault);
    await execute(this.router);
    this.express.use(this.router.getRoutes());
  }
}
