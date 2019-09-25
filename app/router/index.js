"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { controller, router } = app;
    router.get('/', controller.home.index);
    /**
     * 热力图
     */
    // 热力图-特约店铺-上传
    router.post('/heatMap/store/file/upload', controller.heatMap.store.index.upload);
    // 热力图-特约店铺-生成网页json
    router.get('/heatMap/store/getJSON', controller.heatMap.store.index.getJSON);
    // 热力图-特约店铺--生成文件
    router.get('/heatMap/store/createPath', controller.heatMap.store.index.createPath);
    // 热力图-特约店铺--生成文件并且下载压缩文件
    router.get('/heatMap/store/createPathDown', controller.heatMap.store.index.createPathDown);
    // 热力图-特约店铺-单独压缩下载
    router.get('/heatMap/store/compress', controller.heatMap.store.index.compress);
    // 热力图-特约店铺-下载模版文件
    router.get('/heatMap/store/downTemplateFile', controller.heatMap.store.index.downTemplateFile);
    // 热力图-位置信息-上传
    router.post('/heatMap/position/index/file/upload', controller.heatMap.position.index.upload);
    // 热力图-位置信息-生成网页json
    router.get('/heatMap/position/getJSON', controller.heatMap.position.index.getJSON);
    // 热力图-位置信息--生成文件
    router.get('/heatMap/position/createPath', controller.heatMap.position.index.createPath);
    // 热力图-位置信息-生成文件并且下载压缩文件
    router.get('/heatMap/position/createPathDown', controller.heatMap.position.index.createPathDown);
    // 热力图-位置信息-单独压缩下载
    router.get('/heatMap/position/compress', controller.heatMap.position.index.compress);
    // 热力图-位置信息-下载模版文件
    router.get('/heatMap/position/downTemplateFile', controller.heatMap.position.index.downTemplateFile);
    // 热力图-位置信息-normal-运营演示-上传文件
    router.post('/heatMap/position/normal/file/upload', controller.heatMap.position.normal.upload);
    // 热力图-位置信息-normal-运营演示-生成文件
    router.get('/heatMap/position/normal/createPath', controller.heatMap.position.normal.createPath);
    // 热力图-位置信息-normal-运营演示-单独压缩下载
    router.get('/heatMap/position/normal/compress', controller.heatMap.position.normal.compress);
    // 热力图-位置信息-default-生成网页json
    router.get('/heatMap/position/default/getJSON', controller.heatMap.position.defaultCity.getJSON);
    // 热力图-位置信息-default-运营演示-生成文件
    router.get('/heatMap/position/default/createPath', controller.heatMap.position.defaultCity.createPath);
    // 热力图-位置信息-default-运营演示-单独压缩下载
    router.get('/heatMap/position/default/compress', controller.heatMap.position.defaultCity.compress);
    /**
     * 路线派化
     */
    // 路线派化-上传
    router.post('/path/index/file/upload', controller.path.index.upload);
    // 路线派化-生成网页json
    router.get('/path/getJSON', controller.path.index.getJSON);
    // 路线派化-生成文件
    router.get('/path/createPath', controller.path.index.createPath);
    // 路线派化-压缩并下载文件
    router.get('/path/compress', controller.path.index.compress);
    // 路线派化-生成文件并且下载压缩文件
    router.get('/path/createPathDown', controller.path.index.createPathDown);
    // 路线派化-下载模版文件
    router.get('/path/downTemplateFile', controller.path.index.downTemplateFile);
    /**
     * 邮件发送
     */
    router.get('/share', controller.share.index.index);
    router.get('/api/email/sendEmail', controller.email.index.index);
    router.post('/api/share/add', controller.share.index.shareAdd);
    router.post('/api/share/delete', controller.share.index.shareDelete);
    router.post('/api/share/modify', controller.share.index.shareModify);
    router.get('/api/share/list', controller.share.index.shareList);
    router.get('/api/currentUser', controller.share.index.user);
    router.post('/api/login/account', controller.share.index.account);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsR0FBZ0IsRUFBRSxFQUFFO0lBQ2xDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFBO0lBRWxDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdEM7O09BRUc7SUFDSCxjQUFjO0lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDaEYsb0JBQW9CO0lBQ3BCLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzVFLGlCQUFpQjtJQUNqQixNQUFNLENBQUMsR0FBRyxDQUFDLDJCQUEyQixFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsRix5QkFBeUI7SUFDekIsTUFBTSxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDMUYsa0JBQWtCO0lBQ2xCLE1BQU0sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzlFLGtCQUFrQjtJQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBRTlG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