"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const await_stream_ready_1 = require("await-stream-ready");
const stream_wormhole_1 = require("stream-wormhole");
const fs_1 = require("fs");
const path_1 = require("path");
const compressing = require("compressing");
const EXPORT_FOLDER = 'export'; // 导出js html文件名
const EXCEL_FOLDER = 'excel'; // excel存放目录
const DOWN_TEMPLATE_FOLER = 'template'; // 导出js html文件名
class FileService extends egg_1.Service {
    /**
     * 单文件上传
     */
    async uploadFileSingle({ ctx, folderName, type }) {
        const stream = await ctx.getFileStream();
        const fileName = stream.filename;
        const target = path_1.resolve(ctx.app.config.static.dir, folderName, EXCEL_FOLDER, type, fileName); // 示例 path： path/excel/test.xlsx
        this.delFolder(path_1.resolve(ctx.app.config.static.dir, folderName, EXCEL_FOLDER, type), false); // 先删除当前路径下的文件
        const writeStream = fs_1.createWriteStream(target);
        try {
            await await_stream_ready_1.write(stream.pipe(writeStream));
        }
        catch (err) {
            await stream_wormhole_1.default(stream);
            throw err;
        }
    }
    /**
     * 多文件上传
     */
    async uploadFileMultiple({ ctx, folderName, type }) {
        const parts = ctx.multipart();
        let part = null;
        this.delFolder(path_1.resolve(ctx.app.config.static.dir, folderName, EXCEL_FOLDER, type), false); // 先删除当前路径下的文件
        // tslint:disable-next-line: no-conditional-assignment
        while ((part = await parts()) != null) {
            try {
                const target = path_1.resolve(ctx.app.config.static.dir, folderName, EXCEL_FOLDER, type, part.filename); // 示例 path： path/excel/test.xlsx
                const writeStream = fs_1.createWriteStream(target);
                await await_stream_ready_1.write(part.pipe(writeStream));
            }
            catch (err) {
                await stream_wormhole_1.default(part);
                throw err;
            }
        }
    }
    async readTemplateFile({ ctx, folderName, fileName }) {
        ctx.attachment(fileName);
        const filePath = path_1.resolve(ctx.app.config.static.dir, folderName, DOWN_TEMPLATE_FOLER, fileName); // 示例 path： path/template/index.zip
        ctx.set('Content-Type', 'application/octet-stream');
        return await fs_1.createReadStream(filePath);
    }
    /**
     * 读取压缩包
     */
    async _readZipDel({ ctx, fileName, targetZipFile, isDel = false, sourceFolder }) {
        ctx.attachment(fileName);
        ctx.set('Content-Type', 'application/octet-stream');
        return await fs_1.createReadStream(targetZipFile).on('close', () => {
            if (!isDel)
                return;
            fs_1.unlink(targetZipFile, err => {
                if (err)
                    throw err;
                console.log('---------success---delete------zip------');
                this.delFolder(sourceFolder); // 删除源文件
            });
        });
    }
    /**
     * 生成压缩包
     */
    async compressDir({ ctx, folderName, type, isDel }) {
        const sourceFolder = path_1.resolve(ctx.app.config.static.dir, folderName, EXPORT_FOLDER, type);
        const fileName = `${type}.zip`;
        const targetZipFile = path_1.resolve(ctx.app.config.static.dir, folderName, EXPORT_FOLDER, fileName);
        await compressing.zip.compressDir(sourceFolder, targetZipFile);
        console.log('--------compress---ok---------');
        return await this._readZipDel({ ctx, fileName, targetZipFile, isDel, sourceFolder });
    }
    async delFolder(path, isDelFolder = true) {
        let files = [];
        if (fs_1.existsSync(path)) {
            files = fs_1.readdirSync(path);
            files.forEach(file => {
                const curPath = path + '/' + file;
                if (fs_1.statSync(curPath).isDirectory()) {
                    this.delFolder(curPath); // 递归删除文件夹
                }
                else {
                    fs_1.unlinkSync(curPath); // 删除文件
                }
            });
            if (!isDelFolder)
                return;
            fs_1.rmdirSync(path); // 删除目录
        }
    }
}
exports.default = FileService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNkI7QUFDN0IsMkRBQTBDO0FBQzFDLHFEQUE0QztBQUM1QywyQkFBMEg7QUFDMUgsK0JBQThCO0FBQzlCLDJDQUEwQztBQUUxQyxNQUFNLGFBQWEsR0FBVyxRQUFRLENBQUEsQ0FBQyxlQUFlO0FBQ3RELE1BQU0sWUFBWSxHQUFXLE9BQU8sQ0FBQSxDQUFDLFlBQVk7QUFDakQsTUFBTSxtQkFBbUIsR0FBVyxVQUFVLENBQUEsQ0FBQyxlQUFlO0FBRTlELE1BQXFCLFdBQVksU0FBUSxhQUFPO0lBQzlDOztPQUVHO0lBQ0ksS0FBSyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUU7UUFDckQsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUE7UUFDeEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUNoQyxNQUFNLE1BQU0sR0FBRyxjQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQSxDQUFDLGdDQUFnQztRQUM1SCxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUEsQ0FBQyxjQUFjO1FBQ3hHLE1BQU0sV0FBVyxHQUFHLHNCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQzdDLElBQUk7WUFDQSxNQUFNLDBCQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1NBQ3hDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixNQUFNLHlCQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDNUIsTUFBTSxHQUFHLENBQUE7U0FDWjtJQUNILENBQUM7SUFDRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFO1FBQ3ZELE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUM3QixJQUFJLElBQUksR0FBUSxJQUFJLENBQUE7UUFDcEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBLENBQUMsY0FBYztRQUN4RyxzREFBc0Q7UUFDdEQsT0FBTyxDQUFDLElBQUksR0FBRyxNQUFNLEtBQUssRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3JDLElBQUk7Z0JBQ0EsTUFBTSxNQUFNLEdBQUcsY0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUMsZ0NBQWdDO2dCQUNqSSxNQUFNLFdBQVcsR0FBRyxzQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDN0MsTUFBTSwwQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTthQUN0QztZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE1BQU0seUJBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDMUIsTUFBTSxHQUFHLENBQUE7YUFDVjtTQUNGO0lBQ0gsQ0FBQztJQUNNLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFrQjtRQUN6RSxHQUFHLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3hCLE1BQU0sUUFBUSxHQUFXLGNBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLENBQUMsQ0FBQSxDQUFDLG1DQUFtQztRQUMxSSxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFBO1FBQ25ELE9BQU8sTUFBTSxxQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBQ0Q7O09BRUc7SUFDSyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsS0FBSyxHQUFHLEtBQUssRUFBRSxZQUFZLEVBQWE7UUFDaEcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSwwQkFBMEIsQ0FBQyxDQUFBO1FBQ25ELE9BQU8sTUFBTSxxQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUM1RCxJQUFJLENBQUMsS0FBSztnQkFBRSxPQUFNO1lBQ2xCLFdBQU0sQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLEVBQUU7Z0JBQzFCLElBQUksR0FBRztvQkFBRSxNQUFNLEdBQUcsQ0FBQTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO2dCQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFBLENBQUMsUUFBUTtZQUN2QyxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBa0I7UUFDdkUsTUFBTSxZQUFZLEdBQVcsY0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNoRyxNQUFNLFFBQVEsR0FBVyxHQUFHLElBQUksTUFBTSxDQUFBO1FBQ3RDLE1BQU0sYUFBYSxHQUFXLGNBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDckcsTUFBTSxXQUFXLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUE7UUFDOUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1FBQzdDLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUE7SUFDdEYsQ0FBQztJQUNNLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBWSxFQUFFLGNBQXVCLElBQUk7UUFDOUQsSUFBSSxLQUFLLEdBQWEsRUFBRSxDQUFBO1FBQ3hCLElBQUksZUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLEtBQUssR0FBRyxnQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFBO2dCQUNqQyxJQUFJLGFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLFVBQVU7aUJBQ25DO3FCQUFNO29CQUNMLGVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLE9BQU87aUJBQzVCO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsV0FBVztnQkFBRSxPQUFNO1lBQ3hCLGNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDLE9BQU87U0FDeEI7SUFDSCxDQUFDO0NBQ0Y7QUFwRkQsOEJBb0ZDIn0=