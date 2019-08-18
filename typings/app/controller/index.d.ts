// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportEmailIndex from '../../../app/controller/email/index';
import ExportPathIndex from '../../../app/controller/path/index';
import ExportHeatMapPositionIndex from '../../../app/controller/heatMap/position/index';
import ExportHeatMapPositionNormal from '../../../app/controller/heatMap/position/normal';
import ExportHeatMapStoreIndex from '../../../app/controller/heatMap/store/index';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    email: {
      index: ExportEmailIndex;
    }
    path: {
      index: ExportPathIndex;
    }
    heatMap: {
      position: {
        index: ExportHeatMapPositionIndex;
        normal: ExportHeatMapPositionNormal;
      }
      store: {
        index: ExportHeatMapStoreIndex;
      }
    }
  }
}
