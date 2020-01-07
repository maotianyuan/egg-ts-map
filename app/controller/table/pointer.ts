import { Controller, Context } from 'egg'
import * as xlsx from 'xlsx'
import { PathSheet } from '../../interfaces/index'
const PAGE_TAG: string = 'table'
const TYPE: string = 'pointer'
export default class TableController extends Controller {
  public async getPointerJSON(ctx: Context) {
    const { service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据const rows = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, handlerFormat: this.formatData });
    ctx.body = {
      code: 200,
      data,
      success: true,
    }
    ctx.status = 200
  }

  public formatData({ sheets }) {
    const [ BRAND, NAME ] = [ '品牌', '店名' ]
    const positions: PathSheet.Data = sheets.map((sheet: xlsx.WorkSheet) => {
      if (sheet) {
        const sheetJSON: PathSheet.Column[] = xlsx.utils.sheet_to_json(sheet)
        const pathMap: any = {}
        sheetJSON.forEach(item => {
          const { [NAME]: name, [BRAND] : brand, lon, lat } = item
          pathMap[brand] = pathMap[brand] || {}
          pathMap[brand].brand = brand
          pathMap[brand].value = pathMap[brand].value || []
          pathMap[brand].value.push([ lon, lat, name ])
        })
        return pathMap
      }
    })
    return positions
  }
}
