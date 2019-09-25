import { EggAppConfig, PowerPartial, EggAppInfo } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> = {}
  config.keys = appInfo.name + '_1564971971790_6043_'
  return config
}
