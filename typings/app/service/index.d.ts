// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportEmail from '../../../app/service/email';
import ExportExcel from '../../../app/service/excel';
import ExportFile from '../../../app/service/file';
import ExportFileAsync from '../../../app/service/fileAsync';

declare module 'egg' {
  interface IService {
    email: ExportEmail;
    excel: ExportExcel;
    file: ExportFile;
    fileAsync: ExportFileAsync;
  }
}
