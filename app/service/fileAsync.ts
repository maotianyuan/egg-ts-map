import { Service } from 'egg'
// tslint:disable-next-line: no-var-requires
const fs = require('fs').promises
import { join } from 'path'
import { CreateJSConfig, CreateHTMLConfig } from '../interfaces'
const EXPORT_FOLDER: string = 'export' // 导出js html文件名
const EXPORT_JS_VARIABLE: string = 'EXTRA_DATA' // 导出js文件的变量名

export default class FileAsyncService extends Service {
  /**
   * 生成js文件
   */
  public async writeFilesJS({ data, folderName, type }: CreateJSConfig) {
    await data.map(async (item, index) => {
      const publicDir: any = this.app.config.static.dir
      const fileNameJS: string = join(publicDir, folderName, EXPORT_FOLDER, type, 'data', `data_${index}.js`)
      const content: string = `var ${EXPORT_JS_VARIABLE} = ${JSON.stringify(item)}`
      await fs.mkdir(join(publicDir, folderName, EXPORT_FOLDER, type, 'data'), { recursive: true })
      await fs.writeFile(fileNameJS, content)
    })
    console.log('---------success---write---js-----------')
  }
  /**
   * 生成html文件
   */
  public async writeFilesHTML({ data, folderName, type, templateView }: CreateHTMLConfig) {
    await data.map(async (item, index) => {
      const publicDir: any = this.app.config.static.dir
      const fileNameExcel: string = item[0].fileName.split('.xlsx')[0]
      const fileNameHtml: string = join(publicDir, folderName, EXPORT_FOLDER, type, `${fileNameExcel}_${index}.html`)
      const content: string = templateView(`data_${index}`)
      await fs.mkdir(join(publicDir, folderName, EXPORT_FOLDER, type), { recursive: true })
      await fs.writeFile(fileNameHtml, content)
    })
    console.log('---------success---write---html---------')
  }
}
