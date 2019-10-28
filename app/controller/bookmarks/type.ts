import { Controller } from 'egg'
import { toInt } from '../../lib/utils'
export default class BookMarksTypeController extends Controller {
  public async add() {
    const { ctx } = this
    const { name, subject } = ctx.request.body
    const data = {
      name,
      subject,
    }
    const type = await ctx.model.BookmarksType.create(data)
    ctx.body = { success: true, msg: '新增成功', code: type }
  }
  public async delete() {
    const { ctx } = this
    const { id } = ctx.request.body
    if (!id) { ctx.body = { success: true, msg: '请选择要删除的项' } }
    await ctx.model.BookmarksType.destroy({
      where: {
        id,
      },
    }),
    ctx.body = { success: true, msg: '删除成功' }
  }
  public async modify() {
    const { ctx } = this
    const { id, name, subject } = ctx.request.body
    const data = {
      id,
      name,
      subject,
    }
    if (!id) { ctx.body = { success: true, msg: '请选择要删除的项' } }
    const _id = toInt(id.toString())
    const type = await ctx.model.BookmarksType.findByPk(_id)
    if (!type) {
      ctx.body = { success: false, msg: '不存在' }
      return
    }
    await type.update(data)
    ctx.body = { success: true, msg: '修改成功' }
  }
  public async list() {
    const { ctx } = this
    const Op = this.app.Sequelize.Op
    const { count: total } = await ctx.model.BookmarksType.findAndCountAll()
    const { name = '', subject = '', currentPage = 1, pageSize = 10 }: any = ctx.request.query
    const offset = pageSize * (parseInt(currentPage) - 1)
    let limit = parseInt(pageSize)
    if (offset + pageSize > total) {
      limit = total - offset
    }
    const search = {
      where: { },
      offset,
      limit,
    }
    const target = {
      name,
      subject,
    }
    Object.keys(target).map(item => {
      if (!target[item]) return
      search.where[item] = {
        [Op.or]: {
          [Op.substring]: ctx.request.query[item],
        },
      }
    })
    const result = await ctx.model.BookmarksType.findAll(search)
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
