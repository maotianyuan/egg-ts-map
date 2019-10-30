import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller } = app
  /**
   * 技能小屋 - 类别管理
   */
  router.post('/api/bookmarks/type/add', controller.bookmarks.type.add)
  router.post('/api/bookmarks/type/delete', controller.bookmarks.type.delete)
  router.post('/api/bookmarks/type/modify', controller.bookmarks.type.modify)
  router.get('/api/bookmarks/type/tableList', controller.bookmarks.type.list)

  /**
   * 技能小屋 - 标签管理
   */
  router.post('/api/bookmarks/tag/add', controller.bookmarks.tag.add)
  router.post('/api/bookmarks/tag/delete', controller.bookmarks.tag.delete)
  router.post('/api/bookmarks/tag/modify', controller.bookmarks.tag.modify)
  router.get('/api/bookmarks/tag/tableList', controller.bookmarks.tag.list)

  /**
   * 技能小屋 - 技能列表
   */
  router.post('/api/bookmarks/list/add', controller.bookmarks.list.add)
  router.post('/api/bookmarks/list/delete', controller.bookmarks.list.delete)
  router.post('/api/bookmarks/list/modify', controller.bookmarks.list.modify)
  router.get('/api/bookmarks/list/tableList', controller.bookmarks.list.list)
  router.get('/api/bookmarks/list/getTypeTag', controller.bookmarks.list.getTypeTag)
}
