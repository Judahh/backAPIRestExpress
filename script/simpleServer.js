#!/usr/bin/env node --noharmony "$0" "$@"
import dBHandler from './dBHandler';
import Index from './routes/index';
import { SimpleApp } from '@backapirest/express';

new SimpleApp(Index.getInstance(), dBHandler);
