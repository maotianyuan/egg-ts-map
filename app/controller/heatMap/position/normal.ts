import { Controller } from 'egg'
import * as xlsx from 'xlsx'
import { getView } from '../../../view/heatMap/position/normal'
const PAGE_TAG = 'heatMap'
const TYPE = 'position/normal'

export default class PositionNormalController extends Controller {
  public async upload () {
    const { ctx, service } = this
    const stream = await ctx.getFileStream()
    await service.file.uploadFile({ ctx, folderName: PAGE_TAG, type: TYPE, stream }) // 文件转存处理
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
  async createPath() {
    const { ctx , service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
    await service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: getView }) // 生成对应html文件
    await service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }) // 生成js文件
    ctx.body = 'success'
    ctx.status = 200
  }
  /**
   * 压缩文件
   */
  async compress() {
    const { ctx, service } = this
    const content = await service.file.compressDir({ ctx, folderName: PAGE_TAG, type: TYPE, isDel: true }) // 压缩文件后将文件返回给服务器,并删除目标文件和压缩文件
    ctx.body = content
    ctx.status = 200
  }
  formatData({ sheets, fileName }) {
    const positions = sheets.map(sheet => {
      return getPosition({ sheet, fileName })
    })
    return positions
  }
}

interface SeetJSONConfig {
  lon: any
  lat: any
  RATE: any
  PERSION: any
  PROVINCE: any
  CITY: any
  [TYPE: string]: any
}

function getPosition({ sheet, fileName }, self?: boolean) {
  const sheetJSON: SeetJSONConfig[] = xlsx.utils.sheet_to_json(sheet)
  const heatMap = {}
  const rateObj = {}
  const [ TYPE, RATE, PROVINCE, CITY, PERSION ] = [ '结果类别', '覆盖占比', '省', '市', '人群包名称' ]
  const max = {}
  const selfProvince = sheetJSON && sheetJSON[0][PROVINCE]
  if (self) {
    console.log('------本省-----')
    sheetJSON.forEach(item => {
      const { lon, lat, [RATE]: rate, [PROVINCE] : province, [TYPE]: type } = item
      if (selfProvince === province) {
        const tempHeatMapArr = heatMap[type] = heatMap[type] || []
        const tempHeatRateArr = rateObj[type] = rateObj[type] || []
        tempHeatRateArr.push(rate)
        tempHeatMapArr.push([ lon, lat, rate ])
      }
    })
  } else {
    console.log('------所有-----')
    sheetJSON.forEach(item => {
      const { lon, lat, [RATE]: rate, [TYPE]: type } = item
      const tempHeatMapArr = heatMap[type] = heatMap[type] || []
      const tempHeatRateArr = rateObj[type] = rateObj[type] || []
      tempHeatRateArr.push(rate)
      tempHeatMapArr.push([ lon, lat, rate ])
    })
  }

  Object.keys(rateObj).forEach(key => {
    const newArray: any[] = Array.from(new Set(rateObj[key]))
    max[`${key}`] = Math.max(...newArray)
  })
  return Object.assign({
    radius: 20,
    province: selfProvince,
    city: sheetJSON && sheetJSON[0][CITY],
    persion: sheetJSON && sheetJSON[0][PERSION],
    fileName,
    heatMap,
    max,
  })
}
