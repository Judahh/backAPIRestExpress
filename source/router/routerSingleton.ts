/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from 'express';
import { BaseControllerDefault } from 'backapirest';
import { IRouter } from 'backapi';
// @ts-ignore
export default class RouterSingleton {
  protected controller:
    | {
        [name: string]: BaseControllerDefault;
      }
    | undefined;
  // @ts-ignore
  // eslint-disable-next-line no-unused-vars
  abstract createRoutes(initDefault?: IRouter): void;
  protected static _instance: RouterSingleton;

  protected routes: Router;

  protected constructor() {
    this.routes = Router();
  }

  static getInstance(): RouterSingleton {
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }

  getRoutes(): Router {
    return this.routes;
  }

  addRoute(route: string, handler: string): void {
    const routes = this.routes;
    const controller = this.controller?.[handler] as any;
    if (controller !== undefined) {
      if (controller.index)
        routes.get(route, controller.index.bind(controller));
      if (controller.create)
        routes.get(route, controller.create.bind(controller));
      if (controller.read) routes.get(route, controller.read.bind(controller));
      if (controller.update)
        routes.get(route, controller.update.bind(controller));
      if (controller.delete)
        routes.get(route, controller.delete.bind(controller));
    }
  }
}
