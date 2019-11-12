import { Controller } from 'egg'
import { toInt } from '../../lib/utils'
export default class BookMarksTagController extends Controller {
  public async add() {
    const { ctx } = this
    const { name, subject, type } = ctx.request.body
    const data = {
      name,
      subject,
      type,
    }
    const tag = await ctx.model.BookmarksTag.create(data)
    ctx.body = { success: true, msg: '新增成功', code: tag }
  }
  public async delete() {
    const { ctx } = this
    const { id } = ctx.request.body
    if (!id) { ctx.body = { success: true, msg: '请选择要删除的项' } }
    await ctx.model.BookmarksTag.destroy({
      where: {
        id,
      },
    }),
    ctx.body = { success: true, msg: '删除成功' }
  }
  public async modify() {
    const { ctx } = this
    const { id, name, subject, type } = ctx.request.body
    const data = {
      id,
      name,
      subject,
      type,
    }
    if (!id) { ctx.body = { success: true, msg: '请选择要删除的项' } }
    const _id = toInt(id.toString())
    const tag = await ctx.model.BookmarksTag.findByPk(_id)
    if (!tag) {
      ctx.body = { success: false, msg: '不存在' }
      return
    }
    await tag.update(data)
    ctx.body = { success: true, msg: '修改成功' }
  }
  public async list() {
    const { ctx } = this
    const Op = this.app.Sequelize.Op
    const { name = '', subject = '', type = '', currentPage = 1, pageSize = 10 }: any = ctx.request.query
    let search = {
      attributes: [ 'id', 'name', 'subject' ],
      include: {
        model: ctx.model.BookmarksType,
        attributes: [ 'name' ],
      },
      where: { },
    }
    const target = {
      name,
      subject,
      type,
    }
    Object.keys(target).map(item => {
      if (!target[item]) return
      if (item === 'type') {
        search.where[item] = {
          [Op.or]: {
            [Op.eq]: target.type,
          },
        }
        return
      }
      search.where[item] = {
        [Op.or]: {
          [Op.substring]: ctx.request.query[item],
        },
      }
    })
    const { count: total } = await ctx.model.BookmarksTag.findAndCountAll(search)
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
    const result = await ctx.model.BookmarksTag.findAll(search)
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
