/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from 'express';
import { RouterSingleton as RS } from 'backapirest';
// @ts-ignore
export default class RouterSingleton extends RS {
  protected routes: Router;

  protected constructor() {
    super(Router);
  }

  getRoutes(): Router {
    return this.routes;
  }
}
