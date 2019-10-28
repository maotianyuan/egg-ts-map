// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportBookmarksType from '../../../app/controller/bookmarks/type';
import ExportEmailIndex from '../../../app/controller/email/index';
import ExportPathIndex from '../../../app/controller/path/index';
import ExportShareIndex from '../../../app/controller/share/index';
import ExportTableIndex from '../../../app/controller/table/index';
import ExportHeatMapPositionDefaultCity from '../../../app/controller/heatMap/position/defaultCity';
import ExportHeatMapPositionIndex from '../../../app/controller/heatMap/position/index';
import ExportHeatMapPositionNormal from '../../../app/controller/heatMap/position/normal';
import ExportHeatMapStoreIndex from '../../../app/controller/heatMap/store/index';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    bookmarks: {
      type: ExportBookmarksType;
    }
    email: {
      index: ExportEmailIndex;
    }
    path: {
      index: ExportPathIndex;
    }
    share: {
      index: ExportShareIndex;
    }
    table: {
      index: ExportTableIndex;
    }
    heatMap: {
      position: {
        defaultCity: ExportHeatMapPositionDefaultCity;
        index: ExportHeatMapPositionIndex;
        normal: ExportHeatMapPositionNormal;
      }
      store: {
        index: ExportHeatMapStoreIndex;
      }
    }
  }
}
