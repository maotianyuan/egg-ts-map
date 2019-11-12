import { Controller } from 'egg'
import * as moment from 'moment'
import { toInt } from '../../lib/utils'
export default class HomeController extends Controller {
  public async index () {
    await this.ctx.render('share/index.tpl')
  }
  public async user () {
    this.ctx.body = {"name":"Zebra","avatar":"https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png","userid":"00000001","email":"antdesign@alipay.com","signature":"海纳百川，有容乃大","title":"交互专家","group":"蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED","tags":[{"key":"0","label":"很有想法的"},{"key":"1","label":"专注设计"},{"key":"2","label":"辣~"},{"key":"3","label":"大长腿"},{"key":"4","label":"川妹子"},{"key":"5","label":"海纳百川"}],"notifyCount":12,"unreadCount":11,"country":"China","geographic":{"province":{"label":"浙江省","key":"330000"},"city":{"label":"杭州市","key":"330100"}},"address":"西湖区工专路 77 号","phone":"0752-268888888"}
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
    await ctx.model.Share.destroy({
      where: {
        id,
      },
    }),
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
  public async shareCardList() {
    const { ctx } = this
    const Op = this.app.Sequelize.Op
    const { name = '', category = [] } = ctx.request.body
    const target = {
      labels: category,
      name,
    }
    const search = {
      order: [
        [ 'createdAt', 'DESC' ],
      ],
      where: {
        status: {
          [Op.eq]: 0,
        },
      },
    }
    Object.keys(target).map(item => {
      if (!target[item]) return
      if (target[item].length <= 0) return
      if (item === 'name') {
        search.where[item] = {
          [Op.or]: {
            [Op.substring]: target[item],
          },
        }
      } else {
        search.where[item] = {
          [Op.in]: target[item],
        }
      }
    })
    const result = await ctx.model.Share.findAll(search)
    ctx.body = {
      success: true,
      list: result,
    }
  }
  public async shareList() {
    const { ctx } = this
    const Op = this.app.Sequelize.Op
    const { name = '', subject = '', status = '', labels = '', createdAt: created_at= '', updatedAt: updated_at = '', currentPage = 1, pageSize = 10, sorter = 'updatedAt_descend' }: any = ctx.request.query
    const supperOrderKey = [ 'createdAt', 'updatedAt' ] // 支持排序字段
    const key = sorter.split('_')[0]
    const orderKey = supperOrderKey.includes(key) ? key : supperOrderKey[0]
    const orderValue = sorter.split('_')[1] === 'ascend' ? 'ASC' : 'DESC'
    let search = {
      order: [
        [ orderKey, orderValue ],
      ],
      where: {},
    }
    const target = {
      name,
      subject,
      status,
      labels,
      created_at,
      updated_at,
    }
    Object.keys(target).map(item => {
      if (!target[item]) return
      if (item === 'created_at') {
        search.where[item] = {
          [Op.gt]: moment(created_at).format(),
        }
      } else if (item === 'updated_at') {
        search.where[item] = {
          [Op.lt]: moment(updated_at).format(),
        }
      } else {
        search.where[item] = {
          [Op.or]: {
            [Op.substring]: ctx.request.query[item],
          },
        }
      }
    })
    const { count: total } = await ctx.model.Share.findAndCountAll(search)
    if (pageSize !== 'all') {
      const offset = pageSize * (parseInt(currentPage) - 1)
      let limit = parseInt(pageSize)
      if (offset + pageSize > total) {
        limit = total - offset
      }
      search = Object.assign({}, search, {
        offset,
        limit,
      })
    }
    
    const result = await ctx.model.Share.findAll(search)
    ctx.body = {
      success: true,
      list: result,
      pagination: {
        total,
        pageSize: ~~pageSize,
        current: parseInt(currentPage),
      },
    }
  }
}
