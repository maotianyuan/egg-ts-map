import { Controller, Context } from 'egg'
import * as xlsx from 'xlsx'
import { PathSheet } from '../../interfaces/index'
const PAGE_TAG: string = 'table'
const TYPE: string = 'lostmap'
export default class TableController extends Controller {
  public async getLostMap(ctx: Context) {
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
    const [ RATE, NAME, TYEP ] = [ '占比', '经销商', '类型' ]
    const TYPE_TEXT = {
      '流失/流入': 'point',
      '流入': 'targetInPoint', // 红色
      '流失': 'targetOutPoint', // 蓝色
    }
    const positions: PathSheet.Data = sheets.map((sheet: xlsx.WorkSheet) => {
      if (sheet) {
        const sheetJSON: PathSheet.Column[] = xlsx.utils.sheet_to_json(sheet)
        const pathMap: any = {}
        sheetJSON.forEach(item => {
          const { [RATE]: rate, [NAME]: name, [TYEP]: type, lon, lat } = item
          const text = TYPE_TEXT[type]
          pathMap[text] = pathMap[text] || []
          pathMap[text].push({
            name,
            value: [ lon, lat, rate * 100 + 20 ],
          })
        })
        return pathMap
      }
    })
    return positions
  }
}
