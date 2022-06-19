#!/usr/bin/env node --noharmony "$0" "$@"
//#! /usr/local/bin/node
import dBHandler from './dBHandler';
import Index from './routes/index';
import { SimpleApp } from '@backapirest/express';

new SimpleApp(Index.getInstance(), dBHandler);
