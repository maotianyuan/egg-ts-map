"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const moment = require("moment");
const nodemailer_1 = require("nodemailer");
class EmailService extends egg_1.Service {
    async sendEmail({ data }) {
        const transporter = nodemailer_1.createTransport(Object.assign({}, this.app.config.mailer));
        const { view, subject, to } = data;
        const dataList = Object.assign({ time: moment().format('YYYY-MM-DD HH:mm:ss') }, view);
        const html = await this.ctx.renderView('email/index.tpl', dataList);
        const mailOptions = {
            from: this.app.config.mailer.auth.user,
            to: to || this.app.config.mailerTo,
            subject,
            html,
        };
        await transporter.sendMail(mailOptions);
    }
}
exports.default = EmailService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbWFpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3QixpQ0FBZ0M7QUFDaEMsMkNBQTRDO0FBRTVDLE1BQXFCLFlBQWEsU0FBUSxhQUFPO0lBQ3hDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUU7UUFDN0IsTUFBTSxXQUFXLEdBQUcsNEJBQWUsbUJBQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFHLENBQUE7UUFDbEUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ2xDLE1BQU0sUUFBUSxtQkFDWixJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQ3pDLElBQUksQ0FDUixDQUFBO1FBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNuRSxNQUFNLFdBQVcsR0FBRztZQUNsQixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJO1lBQ3RDLEVBQUUsRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUTtZQUNsQyxPQUFPO1lBQ1AsSUFBSTtTQUNMLENBQUE7UUFDRCxNQUFNLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDekMsQ0FBQztDQUNGO0FBakJELCtCQWlCQyJ9