import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller } = app
  /**
   * 邮件发送
   */
  router.get('/share', controller.share.index.index)
  router.get('/api/email/sendEmail', controller.email.index.index)
}
