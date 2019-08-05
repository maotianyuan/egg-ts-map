import { Controller } from 'egg';
import * as xlsx from 'xlsx';
import { getView } from '../../../view/heatMap/position/position-has-pointer';
import { getViewAmap3D } from '../../../view/heatMap/position/position-has-pointer-amap-3d';
import { getViewAmap } from '../../../view/heatMap/position/position-has-pointer-amap';
import { HEAMP_MARKER_ICON } from '../../../lib/utils';

const PAGE_TAG = 'heatMap';
const TYPE = 'position';
const isSelfProvince = false; // 是否只获取本省内Excel数据，默认全部

export default class PositionController extends Controller {
  /**
   * 生成文件
   */
  public async createPath() {
    const { ctx } = this;
    const { type = '' } = this.ctx.query;
    let handlerFormatFun = getView;
    if (type === 'amap') {
      handlerFormatFun = getViewAmap;
    } else if (type === 'amap3D') {
      handlerFormatFun = getViewAmap3D;
    }
    const data = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }); // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
    await this.service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: handlerFormatFun }); // 生成对应html文件
    await this.service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }); // 生成js文件
    ctx.body = 'success';
    ctx.status = 200;
  }
  /**
   * 生成文件并且下载压缩文件 @TODO 出错
   */
  public async createPathDown() {
    const { ctx } = this;
    const { type = '' } = this.ctx.query;
    let handlerFormatFun = getView;
    if (type === 'amap') {
      handlerFormatFun = getViewAmap;
    } else if (type === 'amap3D') {
      handlerFormatFun = getViewAmap3D;
    }
    const data = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }); // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
    console.log('--------write---html----begin-----');
    await this.service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: handlerFormatFun }); // 生成对应html文件
    console.log('--------write---js----begin-----');
    await this.service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }); // 生成js文件
    ctx.body = 'test';
    ctx.status = 200;
  }
  /**
   * 压缩文件
   */
  public async compress() {
    const { ctx } = this;
    const content = await this.service.file.compressDir({ ctx, folderName: PAGE_TAG, type: TYPE, isDel: true }); // 压缩文件后将文件返回给服务器,并删除目标文件和压缩文件
    ctx.body = content;
    ctx.status = 200;
  }
  /**
   * 生成网页json
   */
  public async getJSON() {
    const { ctx } = this;
    const data = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }); // 获取PAGE_TAG文件夹下，所有Excel格式化后数据const rows = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, handlerFormat: this.formatData });
    ctx.body = {
      code: 200,
      data,
      success: true,
    };
    ctx.status = 200;
  }
  /**
   * 下载示例模版文件
   */
  public async downTemplateFile() {
    const { ctx } = this;
    const fileName = '居住常访地-带点.zip';
    const content = await this.service.file.readTemplateFile({ ctx, folderName: PAGE_TAG, fileName });
    ctx.body = content;
    ctx.status = 200;
  }
  formatData({ sheets, fileName }) {
    const positions = sheets.map((sheet, index) => {
      if (sheet && index === 0) {
        return getPosition({ sheet, fileName }, isSelfProvince);
      } else if (sheet && index === 1) {
        return getPointer({ sheet, icon: HEAMP_MARKER_ICON.blue });
      } else if (sheet && index === 2) {
        return getPointer({ sheet, icon: HEAMP_MARKER_ICON.pink });
      }
    });
    return positions;
  }
}
interface SeetJSONConfig {
  lon: any;
  lat: any;
  RATE: any;
  PROVINCE: any;
  CITY: any;
  [TYPE: string]: any;
}

interface SeetPointerConfig {
  gdlon: any;
  gdlat: any;
  [NAME: string]: any;
}
function getPosition({ sheet, fileName }, self) {
  const sheetJSON: SeetJSONConfig[] = xlsx.utils.sheet_to_json(sheet);
  const heatMap = {};
  const rateObj = {};
  const [ TYPE, RATE, PROVINCE, CITY ] = [ '位置信息', '覆盖占比', '省', '市' ];
  const max = {};
  const selfProvince = sheetJSON && sheetJSON[0][PROVINCE];
  if (self) {
    console.log('------本省-----');
    sheetJSON.forEach(item => {
      const { lon, lat, [RATE]: rate, [PROVINCE] : province, [TYPE]: type } = item;
      if (selfProvince === province) {
        const tempHeatMapArr = heatMap[type] = heatMap[type] || [];
        const tempHeatRateArr = rateObj[type] = rateObj[type] || [];
        tempHeatRateArr.push(rate);
        tempHeatMapArr.push([ lon, lat, rate ]);
      }
    });
  } else {
    console.log('------所有-----');
    sheetJSON.forEach(item => {
      const { gdlon, gdlat, [RATE]: rate, [TYPE]: type } = item;
      const tempHeatMapArr = heatMap[type] = heatMap[type] || [];
      const tempHeatRateArr = rateObj[type] = rateObj[type] || [];
      tempHeatRateArr.push(rate);
      tempHeatMapArr.push([ gdlon, gdlat, rate ]);
    });
  }

  Object.keys(rateObj).forEach(key => {
    const newArray: any[] = Array.from(new Set(rateObj[key]));
    max[`${key}`] = Math.max(...newArray);
  });
  return Object.assign({
    radius: 20,
    province: selfProvince,
    city: sheetJSON && sheetJSON[0][CITY],
    fileName,
    heatMap,
    max,
  });
}
function getPointer({ sheet, icon }) {
  const sheetJSON: SeetPointerConfig[] = xlsx.utils.sheet_to_json(sheet);
  const pointer: any[] = [];
  const NAME = '店名';
  sheetJSON.forEach(item => {
    const { gdlon, gdlat, [NAME]: name } = item;
    pointer.push([ gdlon, gdlat, name ]);
  });
  return Object.assign({
    pointer,
    icon,
  });
}
