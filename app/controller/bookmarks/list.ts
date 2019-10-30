import { Controller } from 'egg'
import { toInt } from '../../lib/utils'
export default class BookmarksListController extends Controller {
  public async add() {
    const { ctx } = this
    const { name, subject, type = [], icon, link } = ctx.request.body
    const [ _type = '', tag = '' ] = type
    const data = {
      name,
      subject,
      type: _type,
      tag,
      icon,
      link,
    }
    const list = await ctx.model.BookmarksList.create(data)
    ctx.body = { success: true, msg: '新增成功', code: list }
  }
  public async delete() {
    const { ctx } = this
    const { id } = ctx.request.body
    if (!id) { ctx.body = { success: true, msg: '请选择要删除的项' } }
    await ctx.model.BookmarksList.destroy({
      where: {
        id,
      },
    }),
    ctx.body = { success: true, msg: '删除成功' }
  }
  public async modify() {
    const { ctx } = this
    const { id, name, subject, type = [], icon, link } = ctx.request.body
    const [ _type = '', tag = '' ] = type
    const data = {
      id,
      name,
      subject,
      type: _type,
      tag,
      icon,
      link,
    }
    if (!id) { ctx.body = { success: true, msg: '请选择要删除的项' } }
    const _id = toInt(id.toString())
    const list = await ctx.model.BookmarksList.findByPk(_id)
    if (!list) {
      ctx.body = { success: false, msg: '不存在' }
      return
    }
    await list.update(data)
    ctx.body = { success: true, msg: '修改成功' }
  }
  public async list() {
    const { ctx } = this
    const Op = this.app.Sequelize.Op
    const { count: total } = await ctx.model.BookmarksList.findAndCountAll()
    const { name = '', subject = '', type = [], icon = '', link = '', currentPage = 1, pageSize = 10 }: any = ctx.request.query
    const [ _type = '', tag = '' ] = type
    const offset = pageSize * (parseInt(currentPage) - 1)
    let limit = parseInt(pageSize)
    if (offset + pageSize > total) {
      limit = total - offset
    }
    const search = {
      attributes: [ 'id', 'name', 'subject', 'tag', 'link', 'type', 'icon' ],
      include: [
        {
          model: ctx.model.BookmarksType,
          attributes: [ 'name' ],
        },
        {
          model: ctx.model.BookmarksTag,
          attributes: [ 'name' ],
        },
      ],
      where: { },
      offset,
      limit,
    }
    const target = {
      name,
      subject,
      type: _type,
      tag,
      icon,
      link,
    }
    Object.keys(target).map(item => {
      if (!target[item]) return
      search.where[item] = {
        [Op.or]: {
          [Op.substring]: ctx.request.query[item],
        },
      }
    })
    const result = await ctx.model.BookmarksList.findAll(search)
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
  public async getTypeTag() {
    const { ctx } = this
    const search = {
      attributes: [ 'id', 'name' ],
      include: [
        {
          model: ctx.model.BookmarksTag,
          attributes: ['id', 'name' ],
        },
      ],
    }
    const result = await ctx.model.BookmarksType.findAll(search)
    ctx.body = {
      success: true,
      list: result,
    }
  }
}
