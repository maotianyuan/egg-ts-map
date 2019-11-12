// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportError from '../../../app/middleware/error';

declare module 'egg' {
  interface IMiddleware {
    error: typeof ExportError;
  }
}
