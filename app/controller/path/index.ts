import { Controller } from 'egg'
import * as xlsx from 'xlsx'
import { handlerExceelTime } from '../../lib/utils'
import { getView } from '../../view/path/index'
const PAGE_TAG = 'path'
const TYPE = 'index'

interface SeetJSONConfig {
  lon: any
  lat: any
  CITY: any
  TIME: any
  PERSION: any[]
  [POSITION: string]: any
}
export default class PathController extends Controller {
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
    const { ctx, service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
    await service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: getView }) // 生成对应html文件
    await service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }) // 生成js文件
    ctx.body = 'success'
    ctx.status = 200
  }
  /**
   * 生成文件并且下载压缩文件
   */
  async createPathDown() {
    const { ctx, service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
    console.log('--------write---html----begin-----')
    await service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: getView }) // 生成对应html文件
    console.log('--------write---js----begin-----')
    await service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }) // 生成js文件
    console.log('--------begin---compress-----')
    const content = await service.file.compressDir({ ctx, folderName: PAGE_TAG, type: TYPE, isDel: true }) // 压缩文件后将文件返回给服务器,并删除目标文件和压缩文件
    ctx.body = content
    ctx.status = 200
  }
  /**
   * 生成网页json
   */
  public async getJSON() {
    const { ctx, service } = this
    const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }) // 获取PAGE_TAG文件夹下，所有Excel格式化后数据const rows = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, handlerFormat: this.formatData });
    ctx.body = {
      code: 200,
      data,
      success: true,
    }
    ctx.status = 200
  }
  /**
   * 下载示例模版文件
   */
  public async downTemplateFile() {
    const { ctx, service } = this
    const fileName: string = 'index.zip'
    const content = await service.file.readTemplateFile({ ctx, folderName: PAGE_TAG, fileName })
    ctx.body = content
    ctx.status = 200
  }
  public formatData({ sheets, fileName }) {
    const [ PERSION, CITY, TIME, POSITION ] = [ '人员', '城市', '时间', '详细地址' ]
    const positions = sheets.map(sheet => {
      if (sheet) {
        const sheetJSON: SeetJSONConfig[] = xlsx.utils.sheet_to_json(sheet)
        const pathMap = {}
        sheetJSON.forEach(item => {
          const { lon, lat, [POSITION]: position, [PERSION] : persion, [CITY]: city, [TIME]: time } = item
          const arr: any[] = pathMap[persion] = pathMap[persion] || []
          const targetTime = handlerExceelTime(time)
          if (lon && lat) {
            arr.push([ lon, lat, city, targetTime, position ])
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
