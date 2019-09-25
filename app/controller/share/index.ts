import { Controller } from 'egg'

export default class HomeController extends Controller {
  public async index () {
    await this.ctx.render('share/index.tpl')
  }
  public async user () {
    this.ctx.body = {"name":"Zebra","avatar":"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png","userid":"00000001","email":"antdesign@alipay.com","signature":"海纳百川，有容乃大","title":"交互专家","group":"蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED","tags":[{"key":"0","label":"很有想法的"},{"key":"1","label":"专注设计"},{"key":"2","label":"辣~"},{"key":"3","label":"大长腿"},{"key":"4","label":"川妹子"},{"key":"5","label":"海纳百川"}],"notifyCount":12,"unreadCount":11,"country":"China","geographic":{"province":{"label":"浙江省","key":"330000"},"city":{"label":"杭州市","key":"330100"}},"address":"西湖区工专路 77 号","phone":"0752-268888888"}
  }
  public async account () {
    this.ctx.body = {
      currentAuthority: 'user',
      status: 'ok',
      type: 'account',
    }
  }
  public async shareAdd() {
    const { service, ctx } = this
    const { cover } = ctx.request.body
    ctx.body = { success: true, msg: '新增成功' }
    const data = {
      ...ctx.request.body,
      cover: cover || 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    }
    await service.share.insert(data)
    ctx.body = { success: true, msg: '新增成功' }
  }
  public async shareDelete() {
    const { service, ctx } = this
    const { id } = ctx.request.body
    if (!id) { ctx.body = { success: true, msg: '请选择要删除的项' } }
    await service.share.delete(id)
    ctx.body = { success: true, msg: '删除成功' }
  }
  public async shareModify() {
    const { service, ctx } = this
    const { cover } = ctx.request.body
    const data = {
      ...ctx.request.body,
      cover: cover || 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    }
    const success = await service.share.updated(data)
    ctx.body = { success, msg: success ? '修改成功' : '修改失败' }
  }
  public async shareList() {
    const { service, ctx } = this
    const result = await service.share.readAll()
    ctx.body = { success: true, list: result }
  }
}
