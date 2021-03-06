import express from 'express';

import RouterSingleton from './router/routerSingleton';
import { DatabaseHandler, DatabaseHandlerInitializer } from 'backapi';

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

  protected routes(initDefault?: DatabaseHandlerInitializer): void {
    this.router.createRoutes(initDefault);
    this.express.use(this.router.getRoutes());
  }
}
