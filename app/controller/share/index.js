"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class HomeController extends egg_1.Controller {
    async index() {
        await this.ctx.render('share/index.tpl');
    }
    async user() {
        this.ctx.body = { "name": "Zebra", "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png", "userid": "00000001", "email": "antdesign@alipay.com", "signature": "海纳百川，有容乃大", "title": "交互专家", "group": "蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED", "tags": [{ "key": "0", "label": "很有想法的" }, { "key": "1", "label": "专注设计" }, { "key": "2", "label": "辣~" }, { "key": "3", "label": "大长腿" }, { "key": "4", "label": "川妹子" }, { "key": "5", "label": "海纳百川" }], "notifyCount": 12, "unreadCount": 11, "country": "China", "geographic": { "province": { "label": "浙江省", "key": "330000" }, "city": { "label": "杭州市", "key": "330100" } }, "address": "西湖区工专路 77 号", "phone": "0752-268888888" };
    }
    async account() {
        this.ctx.body = {
            currentAuthority: 'user',
            status: 'ok',
            type: 'account',
        };
    }
    async shareAdd() {
        const { service, ctx } = this;
        const { cover } = ctx.request.body;
        ctx.body = { success: true, msg: '新增成功' };
        const data = Object.assign(Object.assign({}, ctx.request.body), { cover: cover || 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png' });
        await service.share.insert(data);
        ctx.body = { success: true, msg: '新增成功' };
    }
    async shareDelete() {
        const { service, ctx } = this;
        const { id } = ctx.request.body;
        if (!id) {
            ctx.body = { success: true, msg: '请选择要删除的项' };
        }
        await service.share.delete(id);
        ctx.body = { success: true, msg: '删除成功' };
    }
    async shareModify() {
        const { service, ctx } = this;
        const { cover } = ctx.request.body;
        const data = Object.assign(Object.assign({}, ctx.request.body), { cover: cover || 'https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png' });
        const success = await service.share.updated(data);
        ctx.body = { success, msg: success ? '修改成功' : '修改失败' };
    }
    async shareList() {
        const { service, ctx } = this;
        const result = await service.share.readAll();
        ctx.body = { success: true, list: result };
    }
}
exports.default = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUFnQztBQUVoQyxNQUFxQixjQUFlLFNBQVEsZ0JBQVU7SUFDN0MsS0FBSyxDQUFDLEtBQUs7UUFDaEIsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFDTSxLQUFLLENBQUMsSUFBSTtRQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsZ0ZBQWdGLEVBQUMsUUFBUSxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsRUFBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxFQUFDLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsQ0FBQyxFQUFDLGFBQWEsRUFBQyxFQUFFLEVBQUMsYUFBYSxFQUFDLEVBQUUsRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFlBQVksRUFBQyxFQUFDLFVBQVUsRUFBQyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFD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