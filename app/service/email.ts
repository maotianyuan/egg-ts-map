import { Service } from 'egg'
import * as moment from 'moment'
import { createTransport } from 'nodemailer'

export default class EmailService extends Service {
  public async sendEmail({ data }) {
    const transporter = createTransport({ ...this.app.config.mailer })
    const { view, subject, to } = data
    const dataList = {
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      ...view,
    }
    const html = await this.ctx.renderView('email/index.tpl', dataList)
    const mailOptions = {
      from: this.app.config.mailer.auth.user,
      to: to || this.app.config.mailerTo,
      subject,
      html,
    }
    await transporter.sendMail(mailOptions)
  }
}
