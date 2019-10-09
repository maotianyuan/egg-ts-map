import { Controller } from 'egg'
import { toInt } from '../../lib/utils'
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
    const { ctx } = this
    const { name, link, cover, subject, labels, status } = ctx.request.body
    const data = {
      name,
      link,
      subject,
      labels,
      status,
      cover: cover || 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    }
    const share = await ctx.model.Share.create(data)
    ctx.body = { success: true, msg: '新增成功', code: share }
  }
  public async shareDelete() {
    const { ctx } = this
    const { id } = ctx.request.body
    if (!id) { ctx.body = { success: true, msg: '请选择要删除的项' } }
    const _id = toInt(id.toString())
    const share = await ctx.model.Share.findByPk(_id)
    if (!share) {
      ctx.body = { success: false, msg: '不存在' }
      return
    }
    await share.destroy()
    ctx.body = { success: true, msg: '删除成功' }
  }
  public async shareModify() {
    const { ctx } = this
    const { id, name, link, cover, subject, labels, status } = ctx.request.body
    const data = {
      id,
      name,
      link,
      subject,
      labels,
      status,
      cover: cover || 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png',
    }
    if (!id) { ctx.body = { success: true, msg: '请选择要删除的项' } }
    const _id = toInt(id.toString())
    const share = await ctx.model.Share.findByPk(_id)
    if (!share) {
      ctx.body = { success: false, msg: '不存在' }
      return
    }
    await share.update(data)
    ctx.body = { success: true, msg: '修改成功' }
  }
  public async shareList() {
    const { ctx } = this
    // const { name = null, subject = null, labels = null, status = null } = ctx.request.query
    const { name = null } = ctx.request.query
    const Op = this.app.Sequelize.Op
    const result = await ctx.model.Share.findAll({
      where: {
        // status: {
        //   // [Op.any]: [ status, null ],
        // },
        name: {
          [Op.or]: {
            [Op.substring]: name,
            [Op.eq]: null,
          },
        },
      },
    })
    ctx.body = { success: true, list: result }
  }
}
