import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564971971790_6043_'
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  }
  config.security = {
    csrf: {
      enable: false,
    },
  }
  // add your egg config in here
  config.multipart = {
    fileExtensions: [
      '.xlsx',
    ],
  }
  config.middleware = [
    // 'cors',
  ]
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    mailer: { // 邮件配置
      service: 'qq',
      port: 465,
      auth: {
        user: '1820184044@qq.com', // 账号
        pass: 'tcnyvlmzhvapfccb', // 授权码,
      },
    },
    mailerTo: 'tianyuan.mao@zebra-c.com', // 默认邮件接收者,可以同时发送多个,以逗号隔开
  }
  // config.mysql = {
  //   client: {
  //     host: 'localhost',
  //     // host: '119.23.58.139',
  //     port: '3306',
  //     user: 'root',
  //     // password: 'root',
  //     password: 'password@#!',
  //     database: 'share',
  //   },
  // }
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: 'password@#!',
    database: 'share',
  }
  // the return config will combines to EggAppConfig
  return {
    ...config as {},
    ...bizConfig,
  }
}
