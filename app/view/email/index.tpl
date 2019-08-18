<html>
<head>
  <title>异常统计</title>
</head>
<body>
  <div class="section__content">
    <div>
        项目名称：异常统计系统
    </div>
    <div>
        报错内容：{{ content }}
    </div>
    <div>
        项目：{{ project }} <a href="{{ url }}" target="_blank">{{ url }}</a>
    </div>
    <div>
        环境：{{ navigator }}
    </div>
    <div>
        发生时间：{{ time }}
    </div>
  </div>
</body>
</html>