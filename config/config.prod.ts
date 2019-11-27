import { EggAppConfig, PowerPartial, EggAppInfo } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {}
  config.keys = appInfo.name + '_1564971971790_6043_'
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    password: '****',
    database: 'share',
  }
  return config
}
