<html>

<head>
  <title>地图</title>
  <link rel="stylesheet" href="/public/static/base.css" />
  <link rel="stylesheet" href="/public/static/home.css" />
</head>

<body>
  <div class="section__content">
    <h1 class="section__title">热力图/路线派化自动生成路由</h1>
    <div class="section__main">
      {% for item in routerList %}
      <div class="section__card hvr-float">
        <h2 class="card__title">{{ item.type }}</h2>
        <div class="card__body">
          {% for listItem in item.list %}
          <div class="section__item">
            <a href="{{ listItem.url }}" target="_blank">{{ listItem.title }}</a>
          </div>
          {% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>
    <div>
      <form id="form4">
        <select name="" id="fileType">
          <option value="">文件类别</option>
          <option value="heatMapStoreIndex">热力图-特约店铺</option>
          <option value="heatMapPositionIndex">热力图-位置信息-index</option>
          <option value="heatMapPositionNormal">热力图-位置信息-normal</option>
          <option value="pathIndex">路线派化-index</option>
        </select>
        <div>
          <input type="file" class="file" multiple />
        </div>
        <div>
          <input type="submit" value="上传" />
        </div>
      </form>
    </div>
  </div>
</body>
<script type="text/javascript"
  src="http://test.oainsight.zebra-c.com/lib/core/jquery-1.10.2.min.js?_=1517278420871"></script>
<script>
  $(function () {
    $('form').submit(function (e) {
      const type = $('#fileType').val()
      const url = '/path/index/file/upload'
      if (!type) {
        alert('请选择文件上传类型')
      }
      const typeUrlConfig = {
        'heatMapStoreIndex': '/heatMap/store/file/upload',
        'heatMapPositionIndex': '/heatMap/position/index/file/upload',
        'heatMapPositionNormal': '/heatMap/position/normal/file/upload',
        'pathIndex': '/path/index/file/upload',
      }
      e.preventDefault();
      const formData = new FormData();
      const fileList = $(this).find('.file')[0].files;
      let index = 0;
      for (let key of fileList) {
        formData.append('file' + index, key);
        index++
      }
      $.ajax({
        url: typeUrlConfig[type],
        data: formData,
        method: 'POST',
        contentType: false,
        processData: false,
        success: function (result) {
          console.log(result)
        },
        error: function (responseStr) {
          alert("error", responseStr);
        }
      });
    });
  });
</script>

</html>