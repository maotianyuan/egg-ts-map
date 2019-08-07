import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564971971790_6043'
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
    whitelist: [
      '.xlsx',
    ],
  }
  config.middleware = []

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  }

  // the return config will combines to EggAppConfig
  return {
    ...config as {},
    ...bizConfig,
  }
}
