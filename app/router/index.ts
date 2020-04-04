import { Application } from 'egg'
import bookmarks from './bookmarks'
import share from './share'
import heatmap from './heatmap'
import email from './email'
import tool from './tool'
import login from './login'
import file from './file'

export default (app: Application) => {
  const { controller, router } = app
  router.get('/', controller.home.index)

  bookmarks(app) // 技能
  heatmap(app) // 热力图
  email(app) // 邮件
  share(app) // 分享屋
  tool(app) // 工具
  login(app) // 登陆
  file(app) // 大文件上传
}
