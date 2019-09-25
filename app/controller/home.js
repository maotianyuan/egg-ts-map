"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class HomeController extends egg_1.Controller {
    async index() {
        const results = await this.app.mysql.get('share_list', { id: 1 });
        console.log(JSON.parse(JSON.stringify(results)));
        const dataList = {
            routerList: [
                {
                    type: '热力图',
                    list: [
                        { title: '热力图-特约店铺-生成网页json', url: '/heatMap/store/getJSON' },
                        { title: '热力图-特约店铺-生成文件', url: '/heatMap/store/createPath' },
                        { title: '热力图-特约店铺-压缩下载', url: '/heatMap/store/compress' },
                        // { title: '～热力图-特约店铺-生成文件并且下载压缩文件', url: '/heatMap/store/createPathDown' },
                        { title: '热力图-特约店铺-下载模版文件', url: '/heatMap/store/downTemplateFile' },
                        { title: '-----------------------', url: '/' },
                        { title: '热力图-位置信息-生成网页json', url: '/heatMap/position/getJSON' },
                        { title: '热力图-位置信息-生成文件', url: '/heatMap/position/createPath' },
                        { title: '热力图-位置信息-压缩下载', url: '/heatMap/position/compress' },
                        { title: '热力图-位置信息-下载模版文件', url: '/heatMap/position/downTemplateFile' },
                        { title: '-----------------------', url: '/' },
                        { title: '热力图-位置信息-normal-运营演示-生成文件', url: '/heatMap/position/normal/createPath' },
                        { title: '热力图-位置信息-normal-运营演示-单独压缩下载', url: '/heatMap/position/normal/compress' },
                    ],
                },
                {
                    type: '路线派化',
                    list: [
                        { title: '路线派化-生成网页json', url: '/path/getJSON' },
                        { title: '路线派化-生成文件', url: '/path/createPath' },
                        { title: '路线派化-压缩下载', url: '/path/compress' },
                        // { title: '～路线派化-生成文件并且下载压缩文件', url: '/path/createPathDown' },
                        { title: '路线派化-下载模版文件', url: '/path/downTemplateFile' },
                    ],
                },
                {
                    type: '邮件',
                    list: [
                        { title: '发送邮件', url: '/email/sendEmail' },
                    ],
                },
            ],
        };
        await this.ctx.render('home.tpl', dataList);
    }
}
exports.default = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBZ0M7QUFFaEMsTUFBcUIsY0FBZSxTQUFRLGdCQUFVO0lBQzdDLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNoRCxNQUFNLFFBQVEsR0FBRztZQUNmLFVBQVUsRUFBRTtnQkFDVjtvQkFDRSxJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUU7d0JBQ0osRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLHdCQUF3QixFQUFFO3dCQUM3RCxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLDJCQUEyQixFQUFFO3dCQUM1RCxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLHlCQUF5QixFQUFFO3dCQUMxRCw2RUFBNkU7d0JBQzdFLEVBQUUsS0FBSyxFQUFFLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxpQ0FBaUMsRUFBRTt3QkFDcEUsRUFBRSxLQUFLLEVBQUUseUJBQXlCLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTt3QkFDOUMsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLDJCQUEyQixFQUFFO3dCQUNoRSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLDhCQUE4QixFQUFFO3dCQUMvRCxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsR0FBRyxFQUFFLDRCQUE0QixFQUFFO3dCQUM3RCxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxHQUFHLEVBQUUsb0NBQW9DLEVBQUU7d0JBQ3ZFLEVBQUUsS0FBSyxFQUFFLHlCQUF5QixFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7d0JBQzlDLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixFQUFFLEdBQUcsRUFBRSxxQ0FBcUMsRUFBRTt3QkFDbEYsRUFBRSxLQUFLLEVBQUUsNkJBQTZCLEVBQUUsR0FBRyxFQUFFLG1DQUFtQyxFQUFFO3FCQUNuRjtpQkFDRjtnQkFDRDtvQkFDRSxJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLEVBQUU7d0JBQ0osRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLEdBQUcsRUFBRSxlQUFlLEVBQUU7d0JBQ2hELEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLEVBQUU7d0JBQy9DLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUU7d0JBQzdDLGdFQUFnRTt3QkFDaEUsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSx3QkFBd0IsRUFBRTtxQkFDeEQ7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFO3dCQUNKLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsa0JBQWtCLEVBQUU7cUJBQzNDO2lCQUNGO2FBQ0Y7U0FDRixDQUFBO1FBQ0QsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFDN0MsQ0FBQztDQUNGO0FBNUNELGlDQTRDQyJ9