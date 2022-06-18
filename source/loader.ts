import { PathLike } from 'node:fs';
import { readdir, readFile as readfil } from 'node:fs/promises';
import RouterSingleton from './router/routerSingleton';

const readName = async (path: PathLike) => {
  const files = await readdir(path);
  const handler = files.filter((file) => file.includes('Handler.ts'))[0];
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
      const handler = await readName(realPath);
      for (const file of files) {
        if (
          (file.includes('index') || file.includes('].ts')) &&
          handler !== undefined
        )
          await readFile(path, file, handler, router);
        else if (!file.includes('.ts'))
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
  const isIndex = file.includes('index.ts');
  const param =
    !isIndex && file.includes('].ts')
      ? file?.split('].ts')?.[0]?.split('[')?.[1]
      : undefined;

  const route = '/' + path + (param !== undefined ? `:${param}` : '');
  router.addRoute(route, handler);
};

const execute = async (router) =>
  await readFolder('api', router, ['./src/pages', './source/pages']);

export default execute;
