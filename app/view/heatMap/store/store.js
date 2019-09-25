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
          margin: 0 auto;
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
      </style>
  </head>
  <body>
      <h3 id="pageTopTitle"></h3>
      <div id="container">
      </div>
      <div id="r-result">
          <input type="number" id="maxValueJuzhu" placeholder="热力图权重"></input>
          <div class="input-wrap" id="inputWrap"></div>
      </div>
  </body>
  </html>
  <script type="text/javascript">

var map = '';
var heatmapOverlay = '';
var ObjeHandler = {
    init(){
        this.createIpt()
        this.initBaiduMap()
        this.action()
        $("#inputWrap .ipt:eq(0)").trigger('click')
    },
    setTitle(name) {
        document.querySelector("#titlePage").innerText = name
        document.querySelector("#pageTopTitle").innerText = name
    },
    setMapALL () {
        let _arr = []
        EXTRA_DATA.map(item => {
            Object.keys(item.heatMap).map(i => {
                _arr.push(...item.heatMap[i])
            })
        })
        console.log(_arr.length)
        heatmapOverlay.setDataSet({
            data: this.getPointes(_arr),
            max:$('#maxValueJuzhu').val()
        });
    },
    setMapABCD (index, dianpu) {
        var mapDataHeatMap = EXTRA_DATA[index].heatMap[dianpu]
        let _arr = []
        Object.keys(mapDataHeatMap).map(item => {
            _arr.push(...mapDataHeatMap[item])
        })
        heatmapOverlay.setDataSet({
            data: this.getPointes(_arr),
            max:$('#maxValueJuzhu').val()
        });
    },
    setMapABC (index, dianpu) {
        var mapDataHeatMap = EXTRA_DATA[index].heatMap[dianpu]
        let _arr = []
        let isOk = ['A', 'B', 'C']
        Object.keys(mapDataHeatMap).map(item => {
            isOk.includes(item) && _arr.push(...mapDataHeatMap[item])
        })
        heatmapOverlay.setDataSet({
            data: this.getPointes(_arr),
            max:$('#maxValueJuzhu').val()
        });
    },
    setMap (index, dianpu, type) {
        var data = EXTRA_DATA[index].heatMap[dianpu][type]
        heatmapOverlay.setDataSet({
            data: this.getPointes(data),
            max:$('#maxValueJuzhu').val()
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
            var index = $(this).attr('data-index')
            var type = $(this).attr('data-type')
            var dianpu = $(this).attr('data-dianpu')
            var city = $(this).attr('data-city')
            $(this).addClass('active').siblings().removeClass('active')
            var name = $(this).val()
            _this.setTitle(name)
            if (type === 'ABCD') {
                _this.setMapABCD(index, dianpu)
            } else if (type === 'ABC') {
                _this.setMapABC(index, dianpu)
            }else {
                _this.setMap(index, dianpu, type)
            }
            _this.gotoPointer(EXTRA_DATA[index].city)
        })
    },
    createIpt () {
        var btnStr = '';
        var arr = ['A', 'B', 'C', 'D', 'ABC', 'ABCD']
        EXTRA_DATA.map((item,index)=>{
            Object.keys(item.heatMap).map(dianpu => {
                if (Object.keys(item.heatMap[dianpu]).length == 4) {
                    arr.map(number =>{
                        if(number === 'ABCD') {
                            btnStr += '<input class="ipt" data-type="ABCD" data-dianpu="'+dianpu+'" data-index="'+index+'" type="button" value="'+dianpu + ' ABCD 级客户'+'"></input><span class="cell"></span>'
                        } else if(number === 'ABC') {
                            btnStr += '<input class="ipt" data-type="ABC" data-dianpu="'+dianpu+'" data-index="'+index+'" type="button" value="'+dianpu + ' ABC级客户'+'"></input><span class="cell"></span>'
                        } else {
                            btnStr += '<input class="ipt" data-type="'+number+'" data-dianpu="'+dianpu+'" data-index="'+index+'" type="button" value="'+dianpu + ' ' +number+' 级客户'+'"></input><span class="cell"></span>'
                        }
                        })
                    btnStr+= '<br/>'
                } else {
                    Object.keys(item.heatMap[dianpu]).map(number =>{
                        btnStr += '<input class="ipt" data-type="'+number+'" data-dianpu="'+dianpu+'" data-index="'+index+'" type="button" value="'+dianpu + ' ' +number+' 级客户'+'"></input><span class="cell"></span>'
                    })
                    btnStr+= '<br/>'
                }
            })
            btnStr+= '<br/>-----<br/>'
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
      map.enableScrollWheelZoom(); // 允许滚轮缩放
      heatmapOverlay = new BMapLib.HeatmapOverlay({
         "radius": 20,
      });
      map.addOverlay(heatmapOverlay);
      map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLFNBQWdCLE9BQU8sQ0FBQyxZQUFZO0lBRWxDLE9BQU87Ozs7Ozs7OzttREFTMEMsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeU01RCxDQUFBO0FBQ0gsQ0FBQztBQXJORCwwQkFxTkMifQ==