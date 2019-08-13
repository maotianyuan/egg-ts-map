export function getView(FILE_NAME_JS: any) {

  return `<!doctype html>
  <html lang="zh-CN">
  <head>
    <!-- <base href="//webapi.amap.com/ui/1.0/ui/misc/PathSimplifier/examples/" /> -->
    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <title>路径派化</title>
    <style>
      html,
      body,
      #container {
        width: 80%;
        margin: 0 auto;
        height: 600px;
      }
      .seciton__select {
        position: fixed;
        left: 6px;
        width: 100px;
        top: 6px;
      }
      .seciton__list {
        position: fixed;
        left: 6px;
        width: 300px;
        height: 600px;
        overflow-x: scroll;
        overflow-y: scroll;
        top: 40px;
        border: 1px solid #ddd;
        padding: 10px 0 6px 0 ;
      }
      .subtitle {
        font-size: 13px;
        margin : 0 2px;
        white-space: nowrap;
      }
      .title {
        font-size: 16px;
        margin: 0 6px;
      }
    </style>
  </head>
  <body>
    <select class="seciton__select" id="selectName">
      <option value="all">全部</option>
    </select>
    <div class="seciton__list" id="pathList">
    </div>
    <div id="container"></div>
    <script type="text/javascript"
      src="http://test.oainsight.zebra-c.com/lib/core/jquery-1.10.2.min.js?_=1517278420871"></script>
    <script
      src="https://webapi.amap.com/maps?v=1.4.15&key=6cedc88e67be9d6a3cb729a3edf90ce2&plugin=AMap.CustomLayer,AMap.ControlBar,AMap.Heatmap,AMap.ToolBar"></script>
    <!-- UI组件库 1.0 -->
    <script src="https://webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
    <script src="./data/${FILE_NAME_JS}.js"></script>
    <script type="text/javascript">
    var GLOBAL_DATA = EXTRA_DATA[0].pathMap
      var colors = [
        "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
        "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
        "#651067", "#329262", "#5574a6", "#3b3eac"
      ];
      var PagePath = {
        init() {
          this.initMap()
          this.setName()
          this.action()
        },
        getPathData(type) {
          let data = []
          if (type === 'all') {
            data =  GLOBAL_DATA
          } else {
            data = {
              [type] : GLOBAL_DATA[type]
            }
          }
          let tempArr = []
          Object.keys(data).map(item => {
            tempArr.push({
              name: item,
              path: data[item]
            })
          })
          return tempArr
        },
        setName() {
          let str = []
          Object.keys(GLOBAL_DATA).map(item => {
            str.push('<option value="'+item+'">'+item+'</option>')
          })
          $('#selectName').append(str.join(''))
        },
        action () {
          let _this = this
          $('#selectName').on('change', function(){
            let index = $(this).val()
            let data = _this.getPathData(index);
            _this.setPathData(window.pathSimplifierIns, data)
          })
        },
        setPathList (data) {
          var str = []
          data.map(({name, path})=>{
            str.push('<h2 class="title">'+name+'</h2>')
            path.map((item)=>{
              let [ lon , lat, city = '-', time, positon ] = item
              str.push('<p class="subtitle" title="'+lon+','+lat+'">'+city+'-'+time+'-('+positon+')</p>')
            })
          })
          $('#pathList').html(str.join(''))
        },
        setPathData(obj, data) {
          this.setPathList(data)
          obj.setData(data);
          data && data.map((_, index) => {
            let navg = obj.createPathNavigator(index, {
              loop: true, //循环播放
              speed: 1000000, //巡航速度，单位千米/小时
              pathNavigatorStyle: {
                pathLinePassedStyle: {
                  lineWidth: 6,
                  strokeStyle: 'black',
                  dirArrowStyle: {
                    stepSpace: 15,
                    strokeStyle: 'red'
                  }
                }
              }
            })
            navg.start()
          })
        },
        initMap() {
          var _this = this
          var toolBar = new AMap.ToolBar({
            visible: true
          })
          var map = new AMap.Map('container', {
            zoom: 4
          });
          map.addControl(toolBar);
          AMapUI.load(['ui/misc/PathSimplifier', 'lib/$'], function (PathSimplifier, $) {
            var pathSimplifierIns = new PathSimplifier({
              zIndex: 100,
              map: map, //所属的地图实例
              getPath: function (pathData, pathIndex) {
                return pathData.path;
              },
              getHoverTitle: function (pathData, pathIndex, pointIndex) {
                if (pointIndex >= 0) {
                  let position = pathData.path[pointIndex][2] || '-'
                  return pathData.name + '，点：' + pointIndex + '/' + pathData.path.length + position;
                }
                return pathData.name + '，点数量' + pathData.path.length;
              },
              renderOptions: {
                pathLineStyle: {
                  dirArrowStyle: true
                },
                renderAllPointsIfNumberBelow: 100, //绘制路线节点，如不需要可设置为-1
                getPathStyle: function (pathItem, zoom) {
                  var color = colors[pathItem.pathIndex % colors.length],
                    lineWidth = Math.round(4 * Math.pow(1.1, zoom - 3));
                  return {
                    pathLineStyle: {
                      strokeStyle: color,
                      lineWidth: lineWidth
                    },
                    pathLineSelectedStyle: {
                      lineWidth: lineWidth + 2
                    },
                    pathNavigatorStyle: {
                      fillStyle: color
                    }
                  };
                }
              }
            });
            window.pathSimplifierIns = pathSimplifierIns;
            _this.setPathData(pathSimplifierIns, _this.getPathData('all'))
          });
        }
      }
      $(function () {
        PagePath.init()
      })
    </script>
  </body>
  </html>`
}
