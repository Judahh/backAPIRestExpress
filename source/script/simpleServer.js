#!/usr/bin/node
import dBHandler from './dBHandler';
import Index from './routes/index';
import { SimpleApp } from '@backapirest/express';

new SimpleApp(Index.getInstance(), dBHandler);
