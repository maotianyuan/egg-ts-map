"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
// tslint:disable-next-line: no-var-requires
const fs = require('fs').promises;
const path_1 = require("path");
const xlsx = require("xlsx");
const EXCEL_FOLER = 'excel'; // 存放Excel文件名
const isAllowFileSuffix = ['xlsx']; // Excel后缀名，目前仅支持xlsx
class ExcelService extends egg_1.Service {
    /**
     * 获取文件夹下所有Excel数据
     * @param {*} handlerFormat 格式化Excel数据
     */
    async getExcelsData({ folderName, type, handlerFormat }) {
        const publicDir = this.app.config.static.dir;
        const filePath = path_1.join(publicDir, folderName, EXCEL_FOLER, type); // public/path/excel/index
        const filesExcel = await this._getExcels({ filePath });
        const positions = filesExcel.map((item) => {
            return handlerFormat(item);
        });
        return positions;
    }
    async _getExcels({ filePath }) {
        const files = await fs.readdir(filePath);
        const filesExcel = files.reduce((acc, crr) => {
            return isAllowFileSuffix.includes(crr.split('.').slice(-1).toString())
                ? acc.concat(this._getExcelSheets({ filePath, file: crr })) : acc;
        }, []);
        return filesExcel;
    }
    _getExcelSheets({ filePath, file }) {
        const fileDir = path_1.join(filePath, file);
        const workbook = xlsx.readFile(fileDir);
        const sheetsName = [];
        const sheets = workbook.SheetNames.map((name) => {
            sheetsName.push(name);
            return workbook.Sheets[name];
        });
        return {
            sheets,
            sheetsName,
            fileName: file,
        };
    }
}
exports.default = ExcelService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGNlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUM3Qiw0Q0FBNEM7QUFDNUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQTtBQUNqQywrQkFBMkI7QUFDM0IsNkJBQTRCO0FBQzVCLE1BQU0sV0FBVyxHQUFXLE9BQU8sQ0FBQSxDQUFDLGFBQWE7QUFDakQsTUFBTSxpQkFBaUIsR0FBYSxDQUFFLE1BQU0sQ0FBRSxDQUFBLENBQUMscUJBQXFCO0FBRXBFLE1BQXFCLFlBQWEsU0FBUSxhQUFPO0lBQy9DOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRTtRQUM1RCxNQUFNLFNBQVMsR0FBUSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ2pELE1BQU0sUUFBUSxHQUFHLFdBQUksQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDLDBCQUEwQjtRQUMxRixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ3RELE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUM3QyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QixDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sU0FBUyxDQUFBO0lBQ2xCLENBQUM7SUFFTyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFO1FBQ25DLE1BQU0sS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN4QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1lBQzNDLE9BQU8saUJBQWlCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFBO1FBQ3JFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUNOLE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7SUFFTyxlQUFlLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLFdBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDcEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUN2QyxNQUFNLFVBQVUsR0FBYSxFQUFFLENBQUE7UUFDL0IsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtZQUNuRCxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3JCLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM5QixDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU87WUFDTCxNQUFNO1lBQ04sVUFBVTtZQUNWLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQTtJQUNILENBQUM7Q0FFRjtBQXZDRCwrQkF1Q0MifQ==