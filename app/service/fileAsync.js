"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
// tslint:disable-next-line: no-var-requires
const fs = require('fs').promises;
const path_1 = require("path");
const EXPORT_FOLDER = 'export'; // 导出js html文件名
const EXPORT_JS_VARIABLE = 'EXTRA_DATA'; // 导出js文件的变量名
class FileAsyncService extends egg_1.Service {
    /**
     * 生成js文件
     */
    async writeFilesJS({ data, folderName, type }) {
        await data.map(async (item, index) => {
            const publicDir = this.app.config.static.dir;
            const fileNameJS = path_1.join(publicDir, folderName, EXPORT_FOLDER, type, 'data', `data_${index}.js`);
            const content = `var ${EXPORT_JS_VARIABLE} = ${JSON.stringify(item)}`;
            await fs.mkdir(path_1.join(publicDir, folderName, EXPORT_FOLDER, type, 'data'), { recursive: true });
            await fs.writeFile(fileNameJS, content);
        });
        console.log('---------success---write---js-----------');
    }
    /**
     * 生成html文件
     */
    async writeFilesHTML({ data, folderName, type, templateView }) {
        await data.map(async (item, index) => {
            const publicDir = this.app.config.static.dir;
            const fileNameExcel = item[0].fileName.split('.xlsx')[0];
            const fileNameHtml = path_1.join(publicDir, folderName, EXPORT_FOLDER, type, `${fileNameExcel}_${index}.html`);
            const content = templateView(`data_${index}`);
            await fs.mkdir(path_1.join(publicDir, folderName, EXPORT_FOLDER, type), { recursive: true });
            await fs.writeFile(fileNameHtml, content);
        });
        console.log('---------success---write---html---------');
    }
}
exports.default = FileAsyncService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZUFzeW5jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZUFzeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLDRDQUE0QztBQUM1QyxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFBO0FBQ2pDLCtCQUEyQjtBQUUzQixNQUFNLGFBQWEsR0FBVyxRQUFRLENBQUEsQ0FBQyxlQUFlO0FBQ3RELE1BQU0sa0JBQWtCLEdBQVcsWUFBWSxDQUFBLENBQUMsYUFBYTtBQUU3RCxNQUFxQixnQkFBaUIsU0FBUSxhQUFPO0lBQ25EOztPQUVHO0lBQ0ksS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFrQjtRQUNsRSxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUNuQyxNQUFNLFNBQVMsR0FBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFBO1lBQ2pELE1BQU0sVUFBVSxHQUFXLFdBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQTtZQUN2RyxNQUFNLE9BQU8sR0FBVyxPQUFPLGtCQUFrQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtZQUM3RSxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQzdGLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUE7UUFDekMsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7SUFDekQsQ0FBQztJQUNEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBb0I7UUFDcEYsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbkMsTUFBTSxTQUFTLEdBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQTtZQUNqRCxNQUFNLGFBQWEsR0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNoRSxNQUFNLFlBQVksR0FBVyxXQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEdBQUcsYUFBYSxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUE7WUFDL0csTUFBTSxPQUFPLEdBQVcsWUFBWSxDQUFDLFFBQVEsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNyRCxNQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFDckYsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQTtRQUMzQyxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLENBQUMsQ0FBQTtJQUN6RCxDQUFDO0NBQ0Y7QUE1QkQsbUNBNEJDIn0=