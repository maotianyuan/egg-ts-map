import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller } = app
  /**
   * 流向地图
   */
  router.get('/lostMap/getJSON', controller.lostMap.index.getJSON)
}
