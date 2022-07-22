import express from 'express';

import RouterSingleton from './router/routerSingleton';
import { DatabaseHandler } from 'backapi';
import { SimpleApp as SA } from 'backapirest';
import execute from './loader';

import dotEnv from 'dotenv';

dotEnv.config();

export default class SimpleApp extends SA {
  express: express.Application;

  constructor(
    router: RouterSingleton,
    databaseHandler: DatabaseHandler,
    autoStart = true
  ) {
    super(router, databaseHandler, express, execute, autoStart);
  }
}
