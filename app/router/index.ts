import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router } = app

  router.get('/', controller.home.index)
  /**
   * 热力图
   */
  // 热力图-特约店铺-生成网页json
  router.get('/heatMap/store/getJSON', controller.heatMap.store.index.getJSON)
  // 热力图-特约店铺--生成文件
  router.get('/heatMap/store/createPath', controller.heatMap.store.index.createPath)
  // 热力图-特约店铺--生成文件并且下载压缩文件
  router.get('/heatMap/store/createPathDown', controller.heatMap.store.index.createPathDown)
  // 热力图-特约店铺-单独压缩下载
  router.get('/heatMap/store/compress', controller.heatMap.store.index.compress)
  // 热力图-特约店铺-下载模版文件
  router.get('/heatMap/store/downTemplateFile', controller.heatMap.store.index.downTemplateFile)

  // 热力图-位置信息-生成网页json
  router.get('/heatMap/position/getJSON', controller.heatMap.position.index.getJSON)
  // 热力图-位置信息--生成文件
  router.get('/heatMap/position/createPath', controller.heatMap.position.index.createPath)
  // 热力图-位置信息-生成文件并且下载压缩文件
  router.get('/heatMap/position/createPathDown', controller.heatMap.position.index.createPathDown)
  // 热力图-位置信息-单独压缩下载
  router.get('/heatMap/position/compress', controller.heatMap.position.index.compress)
  // 热力图-位置信息-下载模版文件
  router.get('/heatMap/position/downTemplateFile', controller.heatMap.position.index.downTemplateFile)

  // 热力图-位置信息-normal-运营演示-生成文件
  router.get('/heatMap/position/normal/createPath', controller.heatMap.position.normal.createPath)
  // 热力图-位置信息-normal-运营演示-单独压缩下载
  router.get('/heatMap/position/normal/compress', controller.heatMap.position.normal.compress)

  /**
   * 路线派化
   */
  // 路线派化-生成网页json
  router.get('/path/getJSON', controller.path.index.getJSON)
  // 路线派化-生成文件
  router.get('/path/createPath', controller.path.index.createPath)
  // 路线派化-生成文件并且下载压缩文件
  router.get('/path/createPathDown', controller.path.index.createPathDown)
  // 路线派化-下载模版文件
  router.get('/path/downTemplateFile', controller.path.index.downTemplateFile)
}
