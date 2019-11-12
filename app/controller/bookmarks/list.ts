import { Controller, Context } from 'egg'
import { toInt } from '../../lib/utils'
import * as xlsx from 'xlsx'
import * as moment from 'moment'
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
    const { name = '', subject = '', type = [], icon = '', link = '', currentPage = 1, pageSize = 10 }: any = ctx.request.body
    const [ _type = '', tag = '' ] = type
    let search = {
      order: [
        [ 'createdAt', 'DESC' ],
      ],
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
      where: {},
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
      if (item === 'type') {
        search.where[item] = {
          [Op.or]: {
            [Op.eq]: _type,
          },
        }
        return
      }
      if (item === 'tag') {
        search.where[item] = {
          [Op.or]: {
            [Op.eq]: tag,
          },
        }
        return
      }
      search.where[item] = {
        [Op.or]: {
          [Op.substring]: ctx.request.body[item],
        },
      }
    })
    const { count: total } = await ctx.model.BookmarksList.findAndCountAll(search)
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
          attributes: [ 'id', 'name' ],
        },
      ],
    }
    const result = await ctx.model.BookmarksType.findAll(search)
    ctx.body = {
      success: true,
      list: result,
    }
  }
  public async exportExcel(ctx: Context) {
    const ws_name = '技能小屋'
    const wb = xlsx.utils.book_new()
    const ws_data = await ctx.model.BookmarksList.findAll({
      attributes: [
        [ 'name', '标题' ],
        [ 'subject', '简介' ],
        [ 'link', '链接' ],
      ],
    })
    const data = JSON.parse(JSON.stringify(ws_data))
    const header = {
      header: [ '标题', '简介', '链接' ],
    }
    const ws = xlsx.utils.json_to_sheet(data, header)
    xlsx.utils.book_append_sheet(wb, ws, ws_name)
    // xlsx.writeFile(wb, '技能列表.xlsx', {
    //   type: 'buffer',
    //   bookType: 'xlsx',
    // })
    ctx.set('Content-Disposition', `attachment; filename="download-${moment().format('L')}.xlsx";`)
    ctx.body = xlsx.write(wb, {
      type: 'buffer',
      bookType: 'xlsx',
    })
    ctx.status = 200
  }
}
