export * from './sheet'

export interface ZipConfig {
  ctx: any
  fileName: string, // 压缩后目录名称
  targetZipFile: string // 压缩后文件放置文件目录
  sourceFolder: string // 源文件需要压缩的文件
  isDel?: boolean // 压缩后是否删除
}
export interface CompressConfig {
  ctx: any
  folderName: string // 模块文件
  type: string // 模块文件类型
  isDel?: boolean
}
export interface TemplateConfig {
  ctx: any
  folderName: string // 模块文件
  fileName: string // 压缩后目录名称
}

export interface CreateJSConfig {
  data: any[] // 多个Excel以数组形式存放data中
  folderName: string // 模块文件
  type: string // 模块文件类型
}

export interface CreateHTMLConfig {
  data: any[] // 多个Excel以数组形式存放data中
  folderName: string // 模块文件
  type: string // 模块文件类型
  templateView: any // html模版回调方法
}
