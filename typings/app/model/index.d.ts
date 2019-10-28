// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBookmarksType = require('../../../app/model/bookmarksType');
import ExportShare = require('../../../app/model/share');

declare module 'egg' {
  interface IModel {
    BookmarksType: ReturnType<typeof ExportBookmarksType>;
    Share: ReturnType<typeof ExportShare>;
  }
}
