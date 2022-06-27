import { Mixin, request } from 'backapirest';

import BaseController from './controller/baseController';
import BaseControllerDefault from './controller/baseControllerDefault';
import BaseControllerDelete from './controller/baseControllerDelete';
import BaseControllerRead from './controller/baseControllerRead';
import BaseControllerCreate from './controller/baseControllerCreate';
import BaseControllerUpdate from './controller/baseControllerUpdate';
import BaseControllerConnect from './controller/baseControllerConnect';
import BaseControllerHead from './controller/baseControllerHead';
import BaseControllerTrace from './controller/baseControllerTrace';

import SimpleApp from './simpleApp';
import RouterSingleton from './router/routerSingleton';

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
