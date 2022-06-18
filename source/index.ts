import {
  BaseController,
  BaseControllerDefault,
  BaseControllerDelete,
  BaseControllerRead,
  BaseControllerCreate,
  BaseControllerUpdate,
  BaseControllerConnect,
  BaseControllerHead,
  BaseControllerTrace,
  Mixin,
} from 'backapirest';

import SimpleApp from './simpleApp';
import RouterSingleton from './router/routerSingleton';
import request from './router/request';

export {
  request,
  SimpleApp,
  BaseController,
  BaseControllerDefault,
  BaseControllerDelete,
  BaseControllerRead,
  BaseControllerCreate,
  BaseControllerUpdate,
  BaseControllerConnect,
  BaseControllerHead,
  BaseControllerTrace,
  RouterSingleton,
  Mixin,
};
