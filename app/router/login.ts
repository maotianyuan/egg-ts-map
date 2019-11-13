import { Application } from 'egg'
export default (app: Application) => {
  const { router, controller } = app
  /**
   * 登陆
   */
  router.get('/api/currentUser', controller.share.index.user)
  // router.resources('login', '/api/login/account', controller.login.index)
  router.post('/api/login/account', controller.login.index.getUser)
}
