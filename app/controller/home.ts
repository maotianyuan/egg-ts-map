import { Controller } from 'egg'

export default class HomeController extends Controller {
  public async index() {
    const dataList = {
      routerList: [
        {
          type: '热力图',
          list: [
            { title: '热力图-特约店铺-生成网页json', url: '/heatMap/store/getJSON' },
            { title: '热力图-特约店铺-生成文件', url: '/heatMap/store/createPath' },
            { title: '热力图-特约店铺-压缩下载', url: '/heatMap/store/compress' },
            // { title: '～热力图-特约店铺-生成文件并且下载压缩文件', url: '/heatMap/store/createPathDown' },
            { title: '热力图-特约店铺-下载模版文件', url: '/heatMap/store/downTemplateFile' },
            { title: '-----------------------', url: '/' },
            { title: '热力图-位置信息-生成网页json', url: '/heatMap/position/getJSON' },
            { title: '热力图-位置信息-生成文件', url: '/heatMap/position/createPath' },
            { title: '热力图-位置信息-压缩下载', url: '/heatMap/position/compress' },
            { title: '热力图-位置信息-下载模版文件', url: '/heatMap/position/downTemplateFile' },
            { title: '-----------------------', url: '/' },
            { title: '热力图-位置信息-normal-运营演示-生成文件', url: '/heatMap/position/normal/createPath' },
            { title: '热力图-位置信息-normal-运营演示-单独压缩下载', url: '/heatMap/position/normal/compress' },
          ],
        },
        {
          type: '路线派化',
          list: [
            { title: '路线派化-生成网页json', url: '/path/getJSON' },
            { title: '路线派化-生成文件', url: '/path/createPath' },
            { title: '路线派化-压缩下载', url: '/path/compress' },
            // { title: '～路线派化-生成文件并且下载压缩文件', url: '/path/createPathDown' },
            { title: '路线派化-下载模版文件', url: '/path/downTemplateFile' },
          ],
        },
        {
          type: '邮件',
          list: [
            { title: '发送邮件', url: '/email/sendEmail' },
          ],
        },
        {
          type: 'excel 读取工具',
          list: [
            { title: '流向地图', url: '/table/lostmap/index' },
          ],
        },
      ],
    }
    await this.ctx.render('home.tpl', dataList)
  }
}
