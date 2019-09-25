"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const xlsx = require("xlsx");
const store_1 = require("../../../view/heatMap/store/store");
const store_amap_1 = require("../../../view/heatMap/store/store-amap");
const PAGE_TAG = 'heatMap';
const TYPE = 'store';
class HeatMapStoreController extends egg_1.Controller {
    async upload(ctx) {
        const { service } = this;
        await service.file.uploadFileMultiple({ ctx, folderName: PAGE_TAG, type: TYPE }); // 文件转存处理
        ctx.body = {
            code: 200,
            success: true,
            rows: '上传成功',
        };
        ctx.status = 200;
    }
    /**
     * 生成文件
     */
    async createPath(ctx) {
        const { service } = this;
        const { type = '' } = ctx.query;
        const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }); // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
        await service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: type === 'amap' ? store_amap_1.getViewAmap : store_1.getView }); // 生成对应html文件
        await service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }); // 生成js文件
        ctx.body = 'success';
        ctx.status = 200;
    }
    /**
     * 生成文件并且下载压缩文件 @TODO 出错
     */
    async createPathDown(ctx) {
        const { service } = this;
        const { type = '' } = ctx.query;
        const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }); // 获取PAGE_TAG文件夹下，所有Excel格式化后数据
        console.log('--------write---html----begin-----');
        await service.fileAsync.writeFilesHTML({ data, folderName: PAGE_TAG, type: TYPE, templateView: type === 'amap' ? store_amap_1.getViewAmap : store_1.getView }); // 生成对应html文件
        console.log('--------write---js----begin-----');
        await service.fileAsync.writeFilesJS({ data, folderName: PAGE_TAG, type: TYPE }); // 生成js文件
        ctx.body = 'test';
        ctx.status = 200;
    }
    /**
     * 压缩文件
     */
    async compress(ctx) {
        const { service } = this;
        const content = await service.file.compressDir({ ctx, folderName: PAGE_TAG, type: TYPE, isDel: true }); // 压缩文件后将文件返回给服务器,并删除目标文件和压缩文件
        ctx.body = content;
        ctx.status = 200;
    }
    /**
     * 生成网页json
     */
    async getJSON(ctx) {
        const { service } = this;
        const data = await service.excel.getExcelsData({ folderName: PAGE_TAG, type: TYPE, handlerFormat: this.formatData }); // 获取PAGE_TAG文件夹下，所有Excel格式化后数据const rows = await this.service.excel.getExcelsData({ folderName: PAGE_TAG, handlerFormat: this.formatData });
        ctx.body = {
            code: 200,
            data,
            success: true,
        };
        ctx.status = 200;
    }
    /**
     * 下载示例模版文件
     */
    async downTemplateFile(ctx) {
        const fileName = '多特约店多客户类型多Sheet.zip';
        const content = await this.service.file.readTemplateFile({ ctx, folderName: PAGE_TAG, fileName });
        ctx.body = content;
        ctx.status = 200;
    }
    formatData({ sheets, sheetsName, fileName }) {
        const [DIANPU, LEVEL] = ['特约店简称', '客户类型'];
        const positions = sheets.map((sheet, index) => {
            if (sheet) {
                console.log(`-----------write sheet-----------${index}`);
                const sheetJSON = xlsx.utils.sheet_to_json(sheet);
                const heatMap = {};
                sheetJSON.forEach(item => {
                    const { lon, lat, [DIANPU]: dianpu, [LEVEL]: level } = item;
                    heatMap[dianpu] = heatMap[dianpu] || {};
                    const arr = heatMap[dianpu][level] = heatMap[dianpu][level] || [];
                    if (lon && lat) {
                        arr.push([lon, lat, 1]);
                    }
                });
                return Object.assign({
                    radius: 20,
                    city: sheetsName[index],
                    fileName,
                    heatMap,
                });
            }
        });
        return positions;
    }
}
exports.default = HeatMapStoreController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUF5QztBQUN6Qyw2QkFBNEI7QUFDNUIsNkRBQTJEO0FBQzNELHVFQUFvRTtBQUVwRSxNQUFNLFFBQVEsR0FBVyxTQUFTLENBQUE7QUFDbEMsTUFBTSxJQUFJLEdBQVcsT0FBTyxDQUFBO0FBQzVCLE1BQXFCLHNCQUF1QixTQUFRLGdCQUFVO0lBQ3JELEtBQUssQ0FBQyxNQUFNLENBQUUsR0FBWTtRQUMvQixNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUMsU0FBUztRQUMxRixHQUFHLENBQUMsSUFBSSxHQUFHO1lBQ1QsSUFBSSxFQUFFLEdBQUc7WUFDVCxPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQTtRQUNELEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO0lBQ2xCLENBQUM7SUFDRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBWTtRQUNsQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ3hCLE1BQU0sRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtRQUMvQixNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQSxDQUFDLCtCQUErQjtRQUNwSixNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsd0JBQVcsQ0FBQyxDQUFDLENBQUMsZUFBTyxFQUFFLENBQUMsQ0FBQSxDQUFDLGFBQWE7UUFDdkosTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUMsU0FBUztRQUMxRixHQUFHLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtRQUNwQixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtJQUNsQixDQUFDO0lBQ0Q7O09BRUc7SUFDSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQVk7UUFDdEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUN4QixNQUFNLEVBQUUsSUFBSSxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUE7UUFDL0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUEsQ0FBQywrQkFBK0I7UUFDcEosT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO1FBQ2pELE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyx3QkFBVyxDQUFDLENBQUMsQ0FBQyxlQUFPLEVBQUUsQ0FBQyxDQUFBLENBQUMsYUFBYTtRQUN2SixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUE7UUFDL0MsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUMsU0FBUztRQUMxRixHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQTtRQUNqQixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtJQUNsQixDQUFDO0lBQ0Q7O09BRUc7SUFDSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQVk7UUFDaEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUN4QixNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQSxDQUFDLDhCQUE4QjtRQUNySSxHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtRQUNsQixHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtJQUNsQixDQUFDO0lBQ0Q7O09BRUc7SUFDSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVk7UUFDL0IsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUN4QixNQUFNLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQSxDQUFDLDZJQUE2STtRQUNsUSxHQUFHLENBQUMsSUFBSSxHQUFHO1lBQ1QsSUFBSSxFQUFFLEdBQUc7WUFDVCxJQUFJO1lBQ0osT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFBO1FBQ0QsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7SUFDbEIsQ0FBQztJQUNEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLGdCQUFnQixDQUFDLEdBQVk7UUFDeEMsTUFBTSxRQUFRLEdBQVcscUJBQXFCLENBQUE7UUFDOUMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDakcsR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7UUFDbEIsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7SUFDbEIsQ0FBQztJQUNPLFVBQVUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFO1FBQ2pELE1BQU0sQ0FBRSxNQUFNLEVBQUUsS0FBSyxDQUFFLEdBQUcsQ0FBRSxPQUFPLEVBQUUsTUFBTSxDQUFFLENBQUE7UUFDN0MsTUFBTSxTQUFTLEdBQTJCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFxQixFQUFFLEtBQXNCLEVBQUUsRUFBRTtZQUNyRyxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO2dCQUN4RCxNQUFNLFNBQVMsR0FBK0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBQzdFLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQTtnQkFDbEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdkIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUE7b0JBQzVELE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO29CQUN2QyxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQTtvQkFDakUsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFO3dCQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBRSxDQUFDLENBQUE7cUJBQzFCO2dCQUNILENBQUMsQ0FBQyxDQUFBO2dCQUNGLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztvQkFDbkIsTUFBTSxFQUFFLEVBQUU7b0JBQ1YsSUFBSSxFQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUM7b0JBQ3ZCLFFBQVE7b0JBQ1IsT0FBTztpQkFDUixDQUFDLENBQUE7YUFDSDtRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0YsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQztDQUNGO0FBN0ZELHlDQTZGQyJ9