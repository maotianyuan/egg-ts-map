export function getView(FILE_NAME_JS) {

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
          <button id="showMarkerBtn">显示点</button>
          <button id="hideMarkerBtn">隐藏点</button>
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
        this.creatPointer()
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
       $('#showMarkerBtn').on('click', function(){
          _this.showMarker()
      })
      $('#hideMarkerBtn').on('click', function(){
          _this.hideMarker()
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
        var city = heatMapData.city
        var max = heatMapData.max
        Object.keys(heatMapData.heatMap).map(item => {
          btnStr += '\
          <input class="max" type="number" placeholder="'+item+'热力图权重 默认'+max[item]+'"></input><input class="ipt" data-type="'+item+'" data-city="'+city+'" type="button" value="'+city+' - '+item+'"></input><span class="section__desc">'+item + '最大值：' + '<b>'+ max[item] + '</b>'+'</span></br>'
        })
        $('#inputWrap').append(btnStr);
    },
    creatPointer () {
      let pointerA = EXTRA_DATA[1]
      let pointerB = EXTRA_DATA[2] || []
      let big = this.addPointer(pointerA.pointer || [], pointerA.icon, 32, true)
      let small = this.addPointer(pointerB.pointer || [], pointerB.icon, 16)
      this.markerGroup = [...big, ...small]
    },
    addPointer(data, icon, size, action) {
      var myIcon = new BMap.Icon(icon, new BMap.Size(size, size));
      var pointArray = []
      let markerGroup = []
      for(var i=0;i<data.length;i++){
          var marker = new BMap.Marker(new BMap.Point(data[i][0], data[i][1]), {icon: myIcon}); // 创建点
          markerGroup.push(marker)
          map.addOverlay(marker);    //增加点
          action === true && this.markerAction(marker, data[i][2])
      }
      return markerGroup
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
    showMarker(){
      this.markerGroup.map(item => {
        item.show()
      })
    },
    hideMarker(){
      this.markerGroup.map(item => {
        item.hide()
      })
    },
    markerAction(marker, text) {
        marker.addEventListener("mouseover",function(e){
            var label = new BMap.Label(text,{offset:new BMap.Size(15,-35)});//为标注设置一个标签
            label.setStyle({
                width: "180px",
                color: '#fff',
                background: '#000',
                opacity: '.8',
                border: '1px solid "#000"',
                borderRadius: "5px",
                textAlign: "center",
                height: "26px",
                lineHeight: "26px"
            });
            marker.setLabel(label);
        });
        marker.addEventListener("mouseout",function(e){
            var label = this.getLabel();
            label.setContent("");//设置标签内容为空
            label.setStyle({border:"none",width:"0px",padding:"0px"});//设置标签边框宽度为0
        });
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
  `
}
