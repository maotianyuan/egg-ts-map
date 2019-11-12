import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller } = app
  /**
   * 分享小屋
   */
  router.post('/api/share/add', controller.share.index.shareAdd)
  router.post('/api/share/delete', controller.share.index.shareDelete)
  router.post('/api/share/modify', controller.share.index.shareModify)
  router.get('/api/share/tableList', controller.share.index.shareList)
  router.post('/api/share/cardlist', controller.share.index.shareCardList)
}
