import { Service } from 'egg'
// tslint:disable-next-line: no-var-requires
const fs = require('fs').promises
import { join } from 'path'
import * as xlsx from 'xlsx'
const EXCEL_FOLER: string = 'excel' // 存放Excel文件名
const isAllowFileSuffix: string[] = [ 'xlsx' ] // Excel后缀名，目前仅支持xlsx

export default class ExcelService extends Service {
  /**
   * 获取文件夹下所有Excel数据
   * @param {*} handlerFormat 格式化Excel数据
   */
  public async getExcelsData({ folderName, type, handlerFormat }) {
    const publicDir: any = this.app.config.static.dir
    const filePath = join(publicDir, folderName, EXCEL_FOLER, type) // public/path/excel/index
    const filesExcel = await this._getExcels({ filePath })
    const positions = filesExcel.map((item: any) => {
      return handlerFormat(item)
    })
    return positions
  }

  private async _getExcels({ filePath }) {
    const files = await fs.readdir(filePath)
    const filesExcel = files.reduce((acc, crr) => {
      return isAllowFileSuffix.includes(crr.split('.').slice(-1).toString())
        ? acc.concat(this._getExcelSheets({ filePath, file: crr })) : acc
    }, [])
    return filesExcel
  }

  private _getExcelSheets({ filePath, file }) {
    const fileDir = join(filePath, file)
    const workbook = xlsx.readFile(fileDir)
    const sheetsName: number[] = []
    const sheets = workbook.SheetNames.map((name: any) => {
      sheetsName.push(name)
      return workbook.Sheets[name]
    })
    return {
      sheets,
      sheetsName,
      fileName: file,
    }
  }

}
