// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportShare = require('../../../app/model/share');

declare module 'egg' {
  interface IModel {
    Share: ReturnType<typeof ExportShare>;
  }
}
