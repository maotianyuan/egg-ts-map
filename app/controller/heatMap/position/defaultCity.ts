import { Controller, Context } from 'egg'
import * as xlsx from 'xlsx'
import { getView } from '../../../view/heatMap/position/default-baidu'
import { HeatMapPositionSheet } from '../../../interfaces'

const PAGE_TAG = 'heatMap'
const TYPE = 'position/default'

export default class PositionDefaultController extends Controller {
  public async upload (ctx: Context) {
    const { service } = this
    await service.file.uploadFileMultiple({ ctx, folderName: PAGE_TAG, type: TYPE }) // 文件转存处理
    ctx.body = {
      code: 200,
      success: true,
      rows: '上传成功',
    }
    ctx.status = 200
  }
  /**
   * 生成文件
   */
  public async createPath(ctx: Context) {
    const { service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
    await service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: getView }) // 生成对应html文件
    await service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }) // 生成js文件
    ctx.body = 'success'
    ctx.status = 200
  }
  /**
   * 压缩文件
   */
  public async compress(ctx: Context) {
    const content = await this.service.file.compressDir({ ctx, folderName: PAGE_TAG, type: TYPE, isDel: true }) // 压缩文件后将文件返回给服务器,并删除目标文件和压缩文件
    ctx.body = content
    ctx.status = 200
  }
  /**
   * 生成网页json
   */
  public async getJSON(ctx: Context) {
    const data = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据const rows = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, handlerFormat: this.formatData });
    ctx.body = {
      code: 200,
      data,
      success: true,
    }
    ctx.status = 200
  }
  formatData({ sheets, fileName }) {
    const positions = sheets.map((sheet: xlsx.WorkSheet, index: number) => {
      if (sheet && index === 0) {
        return getPosition({ sheet, fileName })
      }
    })
    return positions
  }
}

function getPosition({ sheet, fileName }) {
  const sheetJSON: HeatMapPositionSheet.Column[] = xlsx.utils.sheet_to_json(sheet)
  const heatMap = {}
  const rateObj = {}
  const [ TYPE, RATE, CITY ] = [ '结果类别', '覆盖占比', '市' ]
  const canCreateCity = [ '成都市', '广州市', '深圳市', '东莞市', '郑州市', '沈阳市', '长沙市', '武汉市', '石家庄市' ]
  const max = {}
  sheetJSON.forEach(item => {
    const { lon, lat, [RATE]: rate, [CITY] : city, [TYPE]: type } = item
    if (type === '常访地' && canCreateCity.includes(city)) {
      const tempHeatMapArr = heatMap[city] = heatMap[city] || []
      const tempHeatRateArr = rateObj[city] = rateObj[city] || []
      tempHeatRateArr.push(rate)
      tempHeatMapArr.push([ lon, lat, rate ])
    }
  })

  Object.keys(rateObj).forEach(key => {
    const newArray: any[] = Array.from(new Set(rateObj[key]))
    max[`${key}`] = Math.max(...newArray)
  })
  return Object.assign({
    radius: 20,
    fileName,
    heatMap,
    max,
  })
}
