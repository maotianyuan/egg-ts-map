// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportExcel from '../../../app/service/excel';
import ExportFile from '../../../app/service/file';
import ExportFileAsync from '../../../app/service/fileAsync';

declare module 'egg' {
  interface IService {
    excel: ExportExcel;
    file: ExportFile;
    fileAsync: ExportFileAsync;
  }
}
