import { readdir, readFile as readfil } from 'node:fs/promises';
import RouterSingleton from './router/routerSingleton';

const readName = async (path: string) => {
  const files = await readdir(path);
  const handler = files.filter((file) => file.includes('Handler.ts'))[0];
  if (handler !== undefined && handler !== null) {
    let name = await readfil(path + handler, { encoding: 'utf8' });
    name = name.split('request(')[1].split(');')[0].split("'")[1];
    return name;
  }
  return undefined;
};

const readFolder = async (path: string, router: RouterSingleton) => {
  const files = await readdir(path);
  const handler = await readName(path);
  for (const file of files) {
    if (
      (file.includes('index') || file.includes('].ts')) &&
      handler !== undefined
    )
      readFile(path, file, handler, router);
    else if (!file.includes('.ts')) readFolder(path + file, router);
  }
};

const readFile = async (
  path: string,
  file: string,
  handler: string,
  router: RouterSingleton
) => {
  const isIndex = file.includes('index.ts');
  const param =
    !isIndex && file.includes('].ts')
      ? file?.split('].ts')?.[0]?.split('[')?.[1]
      : undefined;

  const route =
    path + file.replace('.ts', '') + param !== undefined ? `:${param}` : '';

  router.addRoute(route, handler);
};

const execute = async (router: RouterSingleton) => readFolder('./api', router);

export default execute;
