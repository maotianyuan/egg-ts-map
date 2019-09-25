"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class EmailController extends egg_1.Controller {
    async index(ctx) {
        const { service } = this;
        const { project, url, navigator, content, to } = ctx.query;
        const data = {
            subject: 'Egg异常通知邮件',
            to,
            view: {
                content: content || 'test',
                project,
                url,
                navigator,
            },
        };
        try {
            await service.email.sendEmail({ data });
            ctx.body = {
                code: 200,
                success: true,
                rows: '发送成功',
            };
            ctx.status = 200;
        }
        catch (err) {
            ctx.status = 500;
        }
    }
}
exports.default = EmailController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF5QztBQUV6QyxNQUFxQixlQUFnQixTQUFRLGdCQUFVO0lBQzlDLEtBQUssQ0FBQyxLQUFLLENBQUUsR0FBWTtRQUM5QixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtRQUMxRCxNQUFNLElBQUksR0FBRztZQUNYLE9BQU8sRUFBRSxXQUFXO1lBQ3BCLEVBQUU7WUFDRixJQUFJLEVBQUU7Z0JBQ0osT0FBTyxFQUFFLE9BQU8sSUFBSSxNQUFNO2dCQUMxQixPQUFPO2dCQUNQLEdBQUc7Z0JBQ0gsU0FBUzthQUNWO1NBQ0YsQ0FBQTtRQUNELElBQUk7WUFDRixNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtZQUN2QyxHQUFHLENBQUMsSUFBSSxHQUFHO2dCQUNULElBQUksRUFBRSxHQUFHO2dCQUNULE9BQU8sRUFBRSxJQUFJO2dCQUNiLElBQUksRUFBRSxNQUFNO2FBQ2IsQ0FBQTtZQUNELEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO1NBQ2pCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtTQUNqQjtJQUNILENBQUM7Q0FDRjtBQTFCRCxrQ0EwQkMifQ==