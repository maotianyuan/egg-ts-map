// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportBookmarksList from '../../../app/controller/bookmarks/list';
import ExportBookmarksTag from '../../../app/controller/bookmarks/tag';
import ExportBookmarksType from '../../../app/controller/bookmarks/type';
import ExportEmailIndex from '../../../app/controller/email/index';
import ExportFileIndex from '../../../app/controller/file/index';
import ExportLoginIndex from '../../../app/controller/login/index';
import ExportLostMapIndex from '../../../app/controller/lostMap/index';
import ExportPathIndex from '../../../app/controller/path/index';
import ExportShareIndex from '../../../app/controller/share/index';
import ExportTableIndex from '../../../app/controller/table/index';
import ExportTableLostmap from '../../../app/controller/table/lostmap';
import ExportTablePointer from '../../../app/controller/table/pointer';
import ExportHeatMapPositionDefaultCity from '../../../app/controller/heatMap/position/defaultCity';
import ExportHeatMapPositionIndex from '../../../app/controller/heatMap/position/index';
import ExportHeatMapPositionNormal from '../../../app/controller/heatMap/position/normal';
import ExportHeatMapStoreIndex from '../../../app/controller/heatMap/store/index';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    bookmarks: {
      list: ExportBookmarksList;
      tag: ExportBookmarksTag;
      type: ExportBookmarksType;
    }
    email: {
      index: ExportEmailIndex;
    }
    file: {
      index: ExportFileIndex;
    }
    login: {
      index: ExportLoginIndex;
    }
    lostMap: {
      index: ExportLostMapIndex;
    }
    path: {
      index: ExportPathIndex;
    }
    share: {
      index: ExportShareIndex;
    }
    table: {
      index: ExportTableIndex;
      lostmap: ExportTableLostmap;
      pointer: ExportTablePointer;
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
