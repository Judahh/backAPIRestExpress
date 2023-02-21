#!/usr/bin/env node

// try {
//   import dBHandler from '../../../../dist/source/dBHandler.js';
// } catch (error) {
//   import dBHandler from '../../../../dist/src/dBHandler.js';
// }

// try {
//   import index from '../../../../dist/source/route/index.js';
// } catch (error) {
//   import index from '../../../../dist/src/route/index.js';
// }

import { SimpleApp } from '@backapirest/express';
import { chdir, cwd } from 'node:process';

const verbose = JSON.parse(
  (process.env.BACK_API_REST_DEBUG || 'false').toLowerCase()
);

const sImport = async (root, paths) => {
  const sImports = paths.map((path) => root + '/' + path);
  const errors = [];
  for (const sImport of sImports) {
    try {
      const imported = await import(sImport);
      return imported;
    } catch (error) {
      errors.push(error);
    }
  }
  console.error('No import found');
  console.error(errors);
};

// new SimpleApp(index.default.getInstance(), dBHandler.default);

const folderIndex = process.argv.indexOf('-f');
const migrate = process.argv.indexOf('-m') > -1;
let folder;
if (folderIndex > -1) {
  // Retrieve the value after --custom
  folder = process.argv[folderIndex + 1];
}
if (verbose) console.log('Folder:', `${folder}`);
try {
  chdir(folder);
  global.__basedir = folder;
  if (verbose) console.log('Changed directory to:', `${cwd()}`);
  sImport('../../../..', [
    'dist/source/dBHandler.js',
    'source/dBHandler.js',
    'dist/src/dBHandler.js',
    'src/dBHandler.js',
  ]).then((dBHandler) => {
    sImport('../../../..', [
      'dist/source/route/index.js',
      'source/route/index.js',
      'dist/src/route/index.js',
      'src/route/index.js',
      'dist/source/routes/index.js',
      'source/routes/index.js',
      'dist/src/routes/index.js',
      'src/routes/index.js',
    ]).then((index) => {
      const rIndex = index?.default?.default;
      const instance = rIndex?.getInstance();
      const handler = dBHandler?.default?.default;
      if (
        JSON.parse((process.env.BACK_API_REST_DEBUG || 'false').toLowerCase())
      ) {
        console.log('index', rIndex);
        console.log('instance', instance);
        console.log('handler', handler);
      }
      const app = new SimpleApp(instance, handler, !migrate);
      if (migrate) app.migrate();
    });
  });
} catch (error) {
  console.error('Error changing directory:', `${error}`);
}
