"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getView(FILE_NAME_JS) {
    return `<!DOCTYPE html>
  <html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
      <script type="text/javascript" src="http://test.oainsight.zebra-c.com/lib/core/jquery-1.10.2.min.js?_=1517278420871"></script>
      <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=c9VzBGjpGifxq4HPKdyXHWxErdqpcI74"></script>
      <script type="text/javascript" src="http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>
      <title id="titlePage"></title>
      <script type="text/javascript" src="./data/${FILE_NAME_JS}.js"></script>
      <style type="text/css">
      ul,
      li {
          list-style: none;
          margin: 0;
          padding: 0;
          float: left;
      }
      html {
          height: 100%
      }
      body {
          height: 100%;
          margin: 0px;
          padding: 0 20px;
          font-family: "微软雅黑";
      }
      .cell {
          padding:0 6px;
      }
      #container {
          height: 550px;
          width: 94%;
      }
      #r-result {
          width: 100%;
          padding-bottom: 50px;
      }
      #pageTopTitle{
          position: fixed;
          left:10px;
          right:10px;
          z-index: 1;
          color:#666;
          font-size:20px;
      }
      .ipt {
          outline: none;
      }
      .ipt.active {
          background-color: #1296db;
          color: #fff;
          border-radius: 4px;
          font-size: 12px;
      }
      .input-wrap{
        margin:  6px 0 ;
      }
      .section__split {
        padding:  0 10px;
      }
      .section__desc {
        font-size: 12px;
        padding-left: 10px;
      }
      .max {
        margin: 0 10px 0 0 ;
        width: 150px;
      }
      </style>
  </head>
  <body>
      <h3 id="pageTopTitle"></h3>
      <div id="container">
      </div>
      <div id="r-result">
           <button id="showHeatMapBtn">显示热力图</button>
          <button id="hideHeatMapBtn">关闭热力图</button>
          <div class="input-wrap" id="inputWrap"></div>
      </div>
  </body>
  </html>
  <script type="text/javascript">

var map = '';
var heatmapOverlay = '';
var ObjeHandler = {
    init(){
        this.markerGroup = []
        this.createIpt()
        this.initBaiduMap()
        this.action()
        $("#inputWrap .ipt:eq(0)").trigger('click')
    },
    setTitle(name) {
        document.querySelector("#titlePage").innerText = name
        document.querySelector("#pageTopTitle").innerText = name
    },
    setMap (type, value) {
       var heatMapData = EXTRA_DATA[0]
       var max = value || heatMapData.max[type]
        heatmapOverlay.setDataSet({
            data: this.getPointes(heatMapData.heatMap[type]),
            max
        });
    },
    getPointes (heatData) {
        var points = []
        for (var i = 0, len = heatData.length; i < len; i++) {
            var temp = heatData[i];
            var obj = {
                lng: temp[0],
                lat: temp[1],
                count: temp[2],
            }
            points.push(obj);
        }
        return points
    },
    action () {
      var _this = this
      $("#inputWrap").on('click', '.ipt', function() {
          var type = $(this).attr('data-type')
          var city = $(this).attr('data-city')
          var value = $(this).prev('.max').val()
          $(this).addClass('active').siblings().removeClass('active')
          var name = $(this).val()
          _this.setTitle(name)
          _this.setMap(type, value)
          _this.gotoPointer(city)
      })
      $('#hideHeatMapBtn').on('click', function(){
          _this.hideHeatMap()
      })
      $('#showHeatMapBtn').on('click', function(){
          _this.showHeatMap()
      })
    },
    createIpt () {
        var btnStr = '', maxStr = '';
        var heatMapData = EXTRA_DATA[0]
        var max = heatMapData.max
        Object.keys(heatMapData.heatMap).map(item => {
          btnStr += '          <input class="max" type="number" placeholder="'+item+'热力图权重 默认'+max[item]+'"></input><input class="ipt" data-type="'+item+'" data-city="'+item+'" type="button" value="'+item+'"></input><span class="section__desc">'+item + '最大值：' + '<b>'+ max[item] + '</b>'+'</span></br>'
        })
        $('#inputWrap').append(btnStr);
    },
    gotoPointer (city) {
      map.centerAndZoom(city, 12.4);
    },
    initBaiduMap () {
      var pointer = {
        lng: '114.51516',
        lat: '36.620836'
      }
      map = new BMap.Map("container"); // 创建地图实例
      var point = new BMap.Point(pointer.lng,pointer.lat); //初始化北京地图，设置中心点坐标和地图级别
      map.centerAndZoom(point, 12.4);
      // this.gotoPointer('北京', 12.4)
      map.enableScrollWheelZoom(); // 允许滚轮缩放
      heatmapOverlay = new BMapLib.HeatmapOverlay({
         "radius": 20,
      });
      map.addOverlay(heatmapOverlay);
      map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));
      heatmapOverlay.show();
    },
    hideHeatMap () {
        heatmapOverlay.hide();
    },
    showHeatMap () {
        heatmapOverlay.show();
    }
}

$(function(){
   ObjeHandler.init()
})
  </script>
  `;
}
exports.getView = getView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1iYWlkdS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHQtYmFpZHUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFnQixPQUFPLENBQUMsWUFBWTtJQUVsQyxPQUFPOzs7Ozs7Ozs7bURBUzBDLFlBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEs1RCxDQUFBO0FBQ0gsQ0FBQztBQXRMRCwwQkFzTEMifQ==