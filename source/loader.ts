import { PathLike } from 'node:fs';
import { readdir, readFile as readfil } from 'node:fs/promises';
import RouterSingleton from './router/routerSingleton';

const isFile = (file: string): boolean => {
  return file.includes('.ts') || file.includes('.js');
};

const isIndexFile = (file: string): boolean => {
  return file.includes('index.ts') || file.includes('index.js');
};

const isParamFile = (file: string): boolean => {
  return file.includes('].ts') || file.includes('].js');
};

const getParam = (file: string): string => {
  return file?.split(/\]\.(t|j)s/)?.[0]?.split('[')?.[1];
};

const getHandlerName = async (path: PathLike): Promise<string> => {
  const files = await readdir(path);
  const handler = files.filter(
    (file) => file.includes('Handler.ts') || file.includes('Handler.js')
  )[0];
  return handler;
};

const getHandler = async (path: PathLike, handler?: string) => {
  if (handler !== undefined && handler !== null) {
    let name = await readfil(path + '/' + handler, { encoding: 'utf8' });
    name = name.split('request(')[1].split(');')[0].split("'")[1];
    return name;
  }
  return undefined;
};

const readFolder = async (
  path: PathLike,
  router: RouterSingleton,
  roots: PathLike[]
) => {
  for (const root of roots) {
    const realPath = root !== undefined ? root + '/' + path : path;
    try {
      const files = await readdir(realPath);
      const handler = await getHandler(
        realPath,
        await getHandlerName(realPath)
      );
      for (const file of files) {
        if (isFile(file) && handler !== undefined)
          await readFile(path, file, handler, router);
        else if (!isFile(file))
          await readFolder(path + '/' + file, router, [root]);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.message);
    }
  }
};

const readFile = async (
  path: PathLike,
  file: string,
  handler: string,
  router: RouterSingleton
) => {
  const isIndex = isIndexFile(file);
  const param = !isIndex && isParamFile(file) ? getParam(file) : undefined;

  const route = '/' + path + (param !== undefined ? `:${param}` : '');
  router.addRoute(route, handler);
};

const execute = async (router) =>
  await readFolder('api', router, [
    '.',
    './src',
    './source',
    './src/pages',
    './source/pages',
    './dist',
    './dist/src',
    './dist/source',
    './dist/src/pages',
    './dist/source/pages',
  ]);

export default execute;
