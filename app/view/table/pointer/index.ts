

export function getView(FILE_NAME_JS: any) {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" type="text/css" href="https://a.amap.com/jsapi_demos/static/bezier/bezier.css">
      <title id="titlePage"></title>
      <style type="text/css">
      html * {
        padding: 0;
        margin: 0;
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
          height: 800px;
          width: 100%;
      }
      
      #r-result {
          width: 100%;
          padding-bottom: 50px;
      }
      #pageTopTitle{
        font-size:12px;
        
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
        padding:  10px 0 0 0;
      }
      .section__desc {
        font-size: 12px;
        padding:  10px 0 0 0;
      }
      .max {
        margin: 0 10px 0 0 ;
        width: 100px;
      }
      .bezierInp {
        display: none;
      }
      .graph {
        padding: 10px 10px 10px 20px;
      }
      .amap-marker-label{
            border: 0;
            background-color: transparent;
        }
      .info {
        padding: .75rem 1.25rem;
        margin-bottom: 1rem;
        border-radius: .25rem;
        position: fixed;
        top: 1rem;
        background-color: white;
        width: auto;
        min-width: 22rem;
        border-width: 0;
        right: 1rem;
        box-shadow: 0 2px 6px 0 rgba(114, 124, 245, .5);
      }
        .info{
          position: relative;
          top: 0;
          right: 0;
          min-width: 0;
      }
       .custom-content-marker .close-btn {
            position: absolute;
            top: 0px;
            right: -23px;
            width: 20px;
            height: 20px;
            font-size: 12px;
            border-radius: 50%;
            color: #fff;
            text-align: center;
            line-height: 20px;
            box-shadow: -1px 1px 1px rgba(10, 10, 10, .2);
        }
        .brand-row{
          position: relative;
          cursor: pointer;
          padding:  2px 10px;
          }
        .brand-icon{
          width: 10px;
          border-radius: 50%;
          height: 10px;
          content: '';
          float: left;
          display: block;
          margin: 5px 6px 0 0;
        }
      </style>
  </head>
  
  <body>
      <div id="container"></div>
      <div class="graph">
          <h3 id="pageTopTitle"></h3>
          <input class="bezierInp" type="text" id="bezierInp" readonly="readonly" />
           <div id="r-result">
            <button id="showMarkerBtn">显示全部点</button>
            <button id="hideMarkerBtn">隐藏全部点</button>
            <div class="input-wrap" id="inputWrap"></div>
      </div>
      </div>
     
  </body>
  

  <script type="text/javascript" src="http://test.oainsight.zebra-c.com/lib/core/jquery-1.10.2.min.js?_=1517278420871"></script>
  <script type="text/javascript" src="./data/${FILE_NAME_JS}.js"></script>
  <script src="https://webapi.amap.com/maps?v=1.4.15&key=6cedc88e67be9d6a3cb729a3edf90ce2&plugin=AMap.CustomLayer,AMap.ControlBar"></script>
  <script type="text/javascript">

function randomRgbColor() { //随机生成RGB颜色
 var r = Math.floor(Math.random() * 256); //随机生成256以内r值
 var g = Math.floor(Math.random() * 256); //随机生成256以内g值
 var b = Math.floor(Math.random() * 256); //随机生成256以内b值
 return 'rgb('+r+','+g+','+b+')'; //返回rgb(r,g,b)格式颜色
}

var map = '';
var ObjeHandler = {
    init(){
        this.clickPointer = []
        this.markerGroup = []
        this.initBaiduMap()
        this.action()
        this.creatPointer()
        this.gotoPointer(EXTRA_DATA[0].city)
        $("#inputWrap .ipt:eq(0)").trigger('click')
    },
    setTitle(name) {
        document.querySelector("#titlePage").innerText = name
        document.querySelector("#pageTopTitle").innerText = name
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
       $('#showMarkerBtn').on('click', function(){
          _this.showMarker()
      })
      $('#hideMarkerBtn').on('click', function(){
          _this.hideMarker()
      })     
    },
    creatPointer () {
      var btnStr = ''
      let pointer = EXTRA_DATA[0].pointer || []
      this.markerGroup = Object.keys(pointer).map((item ,index)=> {
        const { value = [], icon, brand } = pointer[item]
        const color = randomRgbColor()
        btnStr += '<div class="brand-row"><input type="checkbox" checked value='+index+'/><span class="brand-icon" style="background:'+color+'"></span><span> '+brand+'</span> -  '+value.length+'</div>';

        return this.addPointer(value, color , 32, true)
      })
     $('#inputWrap').append(btnStr);
     this.reActionPointer()
    },
    reActionPointer () {
      var _this = this
      $('#inputWrap').on('click', '.brand-row', function(){
         // const index = $(this).index()
        _this.hideMarkerNoInput()
         _this.clickPointer = []
         // $(this).find('input').prop('checked', true)
         $('#inputWrap .brand-row').each(function(index) {
          if ($(this).find('input').prop('checked')) {            
            _this.clickPointer.push(index)
          }
         })
         
          _this.showMarkerItem(_this.clickPointer)
      })
       
    },
    addPointer(data, icon, size, action) {
      // var myIcon = new BMap.Icon(icon, new BMap.Size(size, size));
      // var myIcon = new AMap.Icon({
      //     size: new AMap.Size(size, size),
      //     image: icon,
      // });
         var markerContent = '' +
        '<div class="custom-content-marker">' +
        '   <div class="close-btn" style="background:'+icon+'"></div>' +
        '</div>';
      
      var pointArray = []
      let markerGroup = []
      for(var i=0;i<data.length;i++){
          var marker = new AMap.Marker({
              position: new AMap.LngLat(data[i][0],data[i][1]),
              // icon: myIcon,
              content: markerContent,
              offset: new AMap.Pixel(-13, -30)
          });

          markerGroup.push(marker)
          map.add([marker]);    //增加点
          action === true && this.markerAction(marker, data[i][2])
      }
      return markerGroup
    },
    gotoPointer (city) {
      map.setCity(city);
    },
    getM1M2 () {
      const data = EXTRA_DATA[0].pointer
      Object.keys(data).map((item,index)=>{
        if (index===0) {
          console.log(data)
          target = data[item].value
        }
       })
      console.log(target)
       return {
        m1lon: target[0][0],
        m1lat: target[0][1],
        m2lon: target[0][0],
        m2lat: target[0][1],
       }
    },
    initBaiduMap () {
      map = new AMap.Map("container", {
        viewMode: '3D',
        pitch: 10,
        resizeEnable: true,
        zoom: 11.5
      });
      map.addControl(new AMap.ControlBar({}));
        
      const pointerM = this.getM1M2()
       

       var m1 = new AMap.Marker({
            map: map,
            draggable:true,
            position: new AMap.LngLat(pointerM.m1lon,pointerM.m1lat)
        });
        var m2 = new AMap.Marker({
            map: map,
            draggable:true,
            position:new AMap.LngLat(pointerM.m2lon,pointerM.m2lat)
        });
        map.setFitView();

        var line,text;
    
       function computeDis(){
        var p1 = m1.getPosition();
        var p2 = m2.getPosition();
        var textPos = p1.divideBy(2).add(p2.divideBy(2));
        var distance = Math.round(p1.distance(p2));
        var path = [p1,p2];
        if(!line){
            line = new AMap.Polyline({
              map:map,
                strokeColor:'#80d8ff',
                isOutline:true,
                outlineColor:'white',
                path:path
            });
        }else{
            line.setPath(path);
        }
        if(!text){
            text = new AMap.Text({
                text:'两点相距'+distance+'米',
                position: textPos,
                map:map,
                style:{'background-color':'#29b6f6',
                'border-color':'#e1f5fe',
                'font-size':'12px'}
            })
        }else{
            text.setText('两点相距'+distance+'米')
            text.setPosition(textPos)
        }
      }
      computeDis();
      m1.on('dragging', computeDis)
      m2.on('dragging', computeDis)
    },
    showMarkerItem(clickPointer){

      clickPointer.map(index=>{
        this.markerGroup[index].map(item => item.show())
      })
    },
    showMarker(){
      this.markerGroup.map((item, index) => {
        this.clickPointer.push(index)
        // item.show()
        item.map(i => i.show())
      })
      $('#inputWrap .brand-row').each(function(index) {
          $(this).find('input').prop("checked",true)
         })
    },
    hideMarkerNoInput () {
      this.markerGroup.map((item, index) => {
        item.map(i => i.hide())
        // item.hide()
      })    
    },
    hideMarker(){
      this.clickPointer = []
      this.markerGroup.map((item, index) => {
        item.map(i => i.hide())
        // item.hide()
      })       
      $('#inputWrap .brand-row').each(function(index) {
          $(this).find('input').prop("checked",false)
         })
      
    },
    markerAction(marker, text) {
      marker.on('mouseover' , function(e){
        marker.setLabel({
          direction: 'top',
          content:"<div class='info'>"+text+"</div>",
        })
      })
       marker.on('mouseout' , function(e){
        marker.setLabel("")
      })
    },
}

$(function(){
  ObjeHandler.init() 
})

</script>  
</html>`
}
