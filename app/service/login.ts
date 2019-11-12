import { Service } from 'egg'

export default class LoginService extends Service {
  async getUser(params) {
    // 调用 CNode V1 版本 API
    const Op = this.app.Sequelize.Op
    const { userName = '', password = '' }: any = params
    const search = {
      where: {},
    }
    const target = {
      user_name: userName,
      password,
    }
    Object.keys(target).map(item => {
      if (!target[item]) return
      search.where[item] = {
        [Op.or]: {
          [Op.eq]: target[item],
        },
      }
    })
    console.log(search)
    const result = await this.ctx.model.UsersTb.findAll(search)
    // 检查调用是否成功，如果调用失败会抛出异常
    // this.checkSuccess(result)
    return result
    // 返回创建的 topic 的 id
    // return 1
    // return result.data.topic_id
  }

  // 封装统一的调用检查函数，可以在查询、创建和更新等 Service 中复用
  checkSuccess(result) {
    if (result.status !== 200) {
      const errorMsg = result.data && result.data.error_msg ? result.data.error_msg : 'unknown error'
      this.ctx.throw(result.status, errorMsg)
    }
    if (!result.data.success) {
      // 远程调用返回格式错误
      this.ctx.throw(500, 'remote response error', { data: result.data })
    }
  }
}
