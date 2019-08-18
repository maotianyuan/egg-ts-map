import { Controller, Context } from 'egg'

export default class EmailController extends Controller {
  public async index (ctx: Context) {
    const { service } = this
    const { project, url, navigator, content, to } = ctx.query
    const data = {
      subject: 'Egg异常通知邮件',
      to,
      view: {
        content: content || 'test',
        project,
        url,
        navigator,
      },
    }
    try {
      await service.email.sendEmail({ data })
      ctx.body = {
        code: 200,
        success: true,
        rows: '发送成功',
      }
      ctx.status = 200
    } catch (err) {
      ctx.status = 500
    }
  }
}
