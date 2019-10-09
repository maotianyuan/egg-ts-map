import { Service } from 'egg'

const TABLE_NAME = 'share_list'

export interface ListItemDataType {
  id?: number
  name?: string
  labels?: string
  link?: string
  cover?: string
  status?: number
  subject?: string
}

export default class ShareService extends Service {
  public async insert(data: ListItemDataType) {
    await this.app.mysql.insert(TABLE_NAME, data)
  }
  public async delete(id: number) {
    await this.app.mysql.delete(TABLE_NAME, {
      id,
    })
  }
  public async updated(data: ListItemDataType) {
    const result = await this.app.mysql.update(TABLE_NAME, data)
    return result.affectedRows === 1
  }
  public async readAll() {
    const result = await this.app.mysql.select(TABLE_NAME)
    return JSON.parse(JSON.stringify(result))
  }
}
