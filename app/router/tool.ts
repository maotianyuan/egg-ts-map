import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller } = app
  /**
   * table工具
   */
  router.get('/table/user/getJSON', controller.table.index.getUserJSON)
  router.get('/table/dealer/getJSON', controller.table.index.getDealerJSON)
  router.get('/table/lostmap/index', controller.table.lostmap.getLostMap)
  router.get('/table/pointer/index', controller.table.pointer.getPointerJSON)
}
