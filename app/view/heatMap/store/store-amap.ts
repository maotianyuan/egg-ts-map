export function getViewAmap(FILE_NAME_JS) {

  return `<!DOCTYPE html>
  <html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" type="text/css" href="https://a.amap.com/jsapi_demos/static/bezier/bezier.css">
      <title id="titlePage"></title>
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
          padding: 0px;
          font-family: "微软雅黑";
      }
      .cell {
          padding:0 6px;
      }
      #container {
          height: 550px;
          width: 98%;
      }
      #r-result {
          width: 100%;
          padding-bottom: 50px;
      }
      #pageTopTitle{
          position: fixed;
          left:70px;
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
  <script type="text/javascript" src="http://test.oainsight.zebra-c.com/lib/core/jquery-1.10.2.min.js?_=1517278420871"></script>
  <script type="text/javascript" src="./data/${FILE_NAME_JS}.js"></script>
  <script src="https://webapi.amap.com/maps?v=1.4.15&key=6cedc88e67be9d6a3cb729a3edf90ce2&plugin=AMap.CustomLayer,AMap.ControlBar,AMap.Heatmap,AMap.ToolBar"></script>
  <script type="text/javascript">
var map = '';
var heatmapOverlay = '';
var heatmapOpts = {}

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
            _this.gotoPointer(city)
        })
    },
    createIpt () {
       var btnStr = '';
        var arr = ['A', 'B', 'C', 'D', 'ABC', 'ABCD']
        EXTRA_DATA.map((item,index)=>{
            Object.keys(item.heatMap).map(dianpu => {
              let city = item.city
                if (Object.keys(item.heatMap[dianpu]).length == 4) {
                    arr.map(number =>{
                        if(number === 'ABCD') {
                            btnStr += '<input class="ipt" data-city="'+city+'" data-type="ABCD" data-dianpu="'+dianpu+'" data-index="'+index+'" type="button" value="'+dianpu + ' ABCD 级客户'+'"></input><span class="cell"></span>'
                        } else if(number === 'ABC') {
                            btnStr += '<input class="ipt" data-city="'+city+'" data-type="ABC" data-dianpu="'+dianpu+'" data-index="'+index+'" type="button" value="'+dianpu + ' ABC级客户'+'"></input><span class="cell"></span>'
                        } else {
                            btnStr += '<input class="ipt" data-city="'+city+'" data-type="'+number+'" data-dianpu="'+dianpu+'" data-index="'+index+'" type="button" value="'+dianpu + ' ' +number+' 级客户'+'"></input><span class="cell"></span>'
                        }
                        })
                    btnStr+= '<br/>'
                } else {
                    Object.keys(item.heatMap[dianpu]).map(number =>{
                        btnStr += '<input class="ipt" data-city="'+city+'" data-type="'+number+'" data-dianpu="'+dianpu+'" data-index="'+index+'" type="button" value="'+dianpu + ' ' +number+' 级客户'+'"></input><span class="cell"></span>'
                    })
                    btnStr+= '<br/>'
                }
            })
            btnStr+= '<br/>-----<br/>'
        })
        $('#inputWrap').append(btnStr);
    },
    gotoPointer(city) {
      map.setCity(city);
    },
    initBaiduMap () {
      map = new AMap.Map("container", {
        resizeEnable: true,
        center: [116.418261, 39.921984],
        zoom: 11.5
      });
      var toolBar = new AMap.ToolBar({
        visible: true
      })
      map.addControl(toolBar);
      heatmapOpts = {
        radius: 25, //给定半径
        opacity: [0, 0.8]
      };
      //初始化heatmap对象
      heatmapOverlay = new AMap.Heatmap(map, heatmapOpts);
    },
}

$(function(){
  ObjeHandler.init()
})

</script>
  </html>`;
}
