import { Service } from 'egg';
import { createReadStream, unlink, existsSync, readdirSync, statSync, unlinkSync, rmdirSync } from 'fs';
import { resolve } from 'path';
import * as compressing from 'compressing';
const EXPORT_FOLDER = 'export'; // 导出js html文件名
const DOWN_TEMPLATE_FOLER = 'template'; // 导出js html文件名

export default class FileService extends Service {
  public async readTemplateFile({ ctx, folderName, fileName }) {
    ctx.attachment(fileName);
    const filePath = resolve(ctx.app.config.static.dir, folderName, DOWN_TEMPLATE_FOLER, fileName); // 示例 path： path/template/index.zip
    ctx.set('Content-Type', 'application/octet-stream');
    return await createReadStream(filePath);
  }
  /**
   * 读取压缩包
   * @param {filePath isDel}  文件路径 读完是否删除
   */
  private async _readZipDel({ ctx, targetZipFile, isDel = false, sourceFolder }) {
    ctx.set('Content-Type', 'application/octet-stream');
    return await createReadStream(targetZipFile).on('close', () => {
      if (!isDel) return;
      unlink(targetZipFile, err => {
        if (err) throw err;
        console.log('---------success---delete------zip------');
        this.delFolder(sourceFolder); // 删除源文件
      });
    });
  }
  /**
   * 生成压缩包
   * @param {ctx folderName, type} 上下文 目录 类型
   */
  public async compressDir({ ctx, folderName, type, isDel }) {
    const sourceFolder = resolve(ctx.app.config.static.dir, folderName, EXPORT_FOLDER, type); // 源文件需要压缩的文件
    const fileName: string = `${type}.zip`;
    const targetZipFile: string = resolve(ctx.app.config.static.dir, folderName, EXPORT_FOLDER, fileName); // 压缩后文件放置文件目录
    await compressing.zip.compressDir(sourceFolder, targetZipFile);
    ctx.attachment(fileName);
    console.log('--------compress---ok---------');
    return await this._readZipDel({ ctx, targetZipFile, isDel, sourceFolder });
  }
  public async delFolder(path) {
    let files: any[] = [];
    if (existsSync(path)) {
      files = readdirSync(path);
      files.forEach(file => {
        const curPath = path + '/' + file;
        if (statSync(curPath).isDirectory()) {
          this.delFolder(curPath); // 递归删除文件夹
        } else {
          unlinkSync(curPath); // 删除文件
        }
      });
      rmdirSync(path); // 删除目录
    }
  }
}
