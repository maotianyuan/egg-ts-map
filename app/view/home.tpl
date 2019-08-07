<html>
  <head>
    <title>Hacker News</title>
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
      </div>
  </body>
</html>