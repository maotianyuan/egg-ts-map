import { Controller, Context } from 'egg'
import * as xlsx from 'xlsx'
import { PathSheet } from '../../interfaces/index'
const PAGE_TAG: string = 'table'
const TYPE: string = 'index'
export default class TableController extends Controller {
  public async getUserJSON(ctx: Context) {
    const { service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据const rows = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, handlerFormat: this.formatData });
    ctx.body = {
      code: 200,
      data,
      success: true,
    }
    ctx.status = 200
  }
  public async getDealerJSON(ctx: Context) {
    const { service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatDataDealer }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据const rows = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, handlerFormat: this.formatData });
    ctx.body = {
      code: 200,
      data,
      success: true,
    }
    ctx.status = 200
  }
  public formatDataDealer({ sheets }) {
    const positions: PathSheet.Data = sheets.map((sheet: xlsx.WorkSheet) => {
      if (sheet) {
        const sheetJSON: PathSheet.Column[] = xlsx.utils.sheet_to_json(sheet)
        return sheetJSON
      }
    })
    return positions
  }
  public formatData({ sheets }) {
    const [ NAME, TEL, EMAIL, ACCOUNT, PERMISSION ] = [ '姓名', '电话', '邮箱', '账号类型', '权限范围' ]
    const positions: PathSheet.Data = sheets.map((sheet: xlsx.WorkSheet) => {
      if (sheet) {
        const sheetJSON: PathSheet.Column[] = xlsx.utils.sheet_to_json(sheet)
        const pathMap:any = []
        sheetJSON.forEach(item => {
          const { [NAME]: name, [TEL] : tel, [EMAIL]: email, [ACCOUNT]: account, [PERMISSION]: permission } = item
          pathMap.push({
            name,
            tel,
            email,
            account,
            permission,
          })
        })
        return pathMap
      }
    })
    return positions
  }
}
