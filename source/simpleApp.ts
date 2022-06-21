import express from 'express';

import RouterSingleton from './router/routerSingleton';
import { DatabaseHandler } from 'backapi';
import { SimpleApp as SA } from 'backapirest';

import dotEnv from 'dotenv';

dotEnv.config();

export default class SimpleApp extends SA {
  express: express.Application;

  constructor(router: RouterSingleton, databaseHandler: DatabaseHandler) {
    super(router, databaseHandler, express);
  }
}
