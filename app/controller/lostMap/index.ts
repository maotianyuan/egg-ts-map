import { Controller, Context } from 'egg'
import * as xlsx from 'xlsx'
import { PathSheet } from '../../interfaces/index'
const PAGE_TAG: string = 'lostMap'
const TYPE: string = 'index'
const COLOR_MAP = {
  大众: '#929292',
  奔驰: '#3c4b4b',
  宝马: '#0033cc',
  奥迪: '#bb0a30',
  凯迪拉克: '#929292',
  玛莎拉蒂: '#929292',
  斯巴鲁: '#929292',
  本田: '#929292',
}
export default class PathController extends Controller {
  /**
   * 生成网页json
   */ 
  public async getJSON(ctx: Context) {
    const { service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据const rows = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, handlerFormat: this.formatData });
    ctx.body = {
      code: 200,
      data,
      success: true,
    }
    ctx.status = 200
  }
  public formatData({ sheets, fileName }) {
    const [ BRAND, TYPE, NAME ] = [ '品牌', '方向', '名称' ]
    const positions: PathSheet.Data = sheets.map((sheet: xlsx.WorkSheet) => {
      if (sheet) {
        const sheetJSON: PathSheet.Column[] = xlsx.utils.sheet_to_json(sheet)
        const pathMap: PathSheet.PathMap = {}
        sheetJSON.forEach(item => {
          const { lon, lat, num = '', [BRAND]: brand, [TYPE] : type, [NAME]: name } = item
          const key = type !== '中心' ? 'out' : 'pointer'
          const arr: any[] = pathMap[key] = pathMap[key] || []
          if (lon && lat) {
            arr.push({
              name,
              color: COLOR_MAP[brand] || '#929292',
              position: 'left',
              value: [ lon, lat, num * 100 ],
            })
          }
        })
        return Object.assign({
          fileName,
          pathMap,
        })
      }
    })
    return positions
  }
}
