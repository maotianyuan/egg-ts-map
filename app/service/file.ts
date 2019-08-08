import { Service } from 'egg'
import { write } from 'await-stream-ready'
import sendToWormhole from 'stream-wormhole'
import { createWriteStream, createReadStream, unlink, existsSync, readdirSync, statSync, unlinkSync, rmdirSync } from 'fs'
import { resolve } from 'path'
import * as compressing from 'compressing'
const EXPORT_FOLDER = 'export' // 导出js html文件名
const EXCEL_FOLDER = 'excel' // excel存放目录
const DOWN_TEMPLATE_FOLER = 'template' // 导出js html文件名

interface ZipConfig {
  ctx: any
  fileName: string, // 压缩后目录名称
  targetZipFile: string // 压缩后文件放置文件目录
  sourceFolder: string // 源文件需要压缩的文件
  isDel?: boolean // 压缩后是否删除
}
interface CompressConfig {
  ctx: any
  folderName: string // 模块文件
  type: string // 模块文件类型
  isDel?: boolean
}
interface TemplateConfig {
  ctx: any
  folderName: string // 模块文件
  fileName: string // 压缩后目录名称
}

export default class FileService extends Service {
  public async uploadFile({ ctx, folderName, type, stream }) {
    const fileName = stream.filename
    const target = resolve(ctx.app.config.static.dir, folderName, EXCEL_FOLDER, type, fileName) // 示例 path： path/excel/test.xlsx
    const writeStream = createWriteStream(target)
    try {
        await write(stream.pipe(writeStream))
    } catch (err) {
        await sendToWormhole(stream)
    }
  }
  public async readTemplateFile({ ctx, folderName, fileName }: TemplateConfig) {
    ctx.attachment(fileName)
    const filePath: string = resolve(ctx.app.config.static.dir, folderName, DOWN_TEMPLATE_FOLER, fileName) // 示例 path： path/template/index.zip
    ctx.set('Content-Type', 'application/octet-stream')
    return await createReadStream(filePath)
  }
  /**
   * 读取压缩包
   */
  private async _readZipDel({ ctx, fileName, targetZipFile, isDel = false, sourceFolder }: ZipConfig) {
    ctx.attachment(fileName)
    ctx.set('Content-Type', 'application/octet-stream')
    return await createReadStream(targetZipFile).on('close', () => {
      if (!isDel) return
      unlink(targetZipFile, err => {
        if (err) throw err
        console.log('---------success---delete------zip------')
        this.delFolder(sourceFolder) // 删除源文件
      })
    })
  }
  /**
   * 生成压缩包
   */
  public async compressDir({ ctx, folderName, type, isDel }: CompressConfig) {
    const sourceFolder: string = resolve(ctx.app.config.static.dir, folderName, EXPORT_FOLDER, type)
    const fileName: string = `${type}.zip`
    const targetZipFile: string = resolve(ctx.app.config.static.dir, folderName, EXPORT_FOLDER, fileName)
    await compressing.zip.compressDir(sourceFolder, targetZipFile)
    console.log('--------compress---ok---------')
    return await this._readZipDel({ ctx, fileName, targetZipFile, isDel, sourceFolder })
  }
  public async delFolder(path: string) {
    let files: string[] = []
    if (existsSync(path)) {
      files = readdirSync(path)
      files.forEach(file => {
        const curPath = path + '/' + file
        if (statSync(curPath).isDirectory()) {
          this.delFolder(curPath) // 递归删除文件夹
        } else {
          unlinkSync(curPath) // 删除文件
        }
      })
      rmdirSync(path) // 删除目录
    }
  }
}
