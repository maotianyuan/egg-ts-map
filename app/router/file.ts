import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller } = app
  /**
   * table工具
   */
  router.post('/file/partUpload/:filename/:chunkName/:start', controller.file.index.partUpload)
  router.post('/file/getUploadedList', controller.file.index.getUploadedList)
  router.post('/file/upload', controller.file.index.upload)
}
