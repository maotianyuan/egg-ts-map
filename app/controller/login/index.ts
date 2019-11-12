import { Controller } from 'egg'

// 定义创建接口的请求参数规则
const createUser = {
  userName: { type: 'string', required: true },
  password: { type: 'string', required: true },
}

export default class LoginController extends Controller {
  public async getUser() {
    const ctx = this.ctx
    ctx.validate(createUser, ctx.request.body)
    const result = await ctx.service.login.getUser(ctx.request.body)
    if (result.length <= 0) {
      ctx.body = {
        currentAuthority: ctx.request.body.userName,
        status: 'error',
        type: 'account',
      }
    } else {
      ctx.body = {
        currentAuthority: ctx.request.body.userName,
        status: 'ok',
        type: 'account',
      }
    }
    ctx.status = 200
  }
}
