import { Controller, Context } from 'egg'
import { resolve } from 'path'
import { createWriteStream, createReadStream } from 'fs'
import { pathExists } from 'fs-extra'
// tslint:disable-next-line: no-var-requires
const fs = require('fs').promises
import { write } from 'await-stream-ready'
import sendToWormhole from 'stream-wormhole'

const TEMP_DIR = 'temp'
const PUBLIC_DIR = 'file'

export default class FileController extends Controller {
  public async partUpload(ctx: Context) {
    const { filename = '', chunkName = '', start = 0 } = ctx.params
    const filePath = resolve(ctx.app.config.static.dir as string, TEMP_DIR, filename)
    const existFile = await pathExists(filePath)
    if (!existFile) {
      try {
        await fs.mkdir(filePath)
      } catch (err) {
        console.log(err)
      }
    }
    const stream = await ctx.getFileStream()
    const target = resolve(filePath, chunkName)
    const writeStream = createWriteStream(target, { start: ~~start, flags: 'a' })
    try {
        await write(stream.pipe(writeStream))
    } catch (err) {
        await sendToWormhole(stream)
        throw err
    }
    ctx.body = {
      code: 200,
      success: true,
    }
    ctx.status = 200
  }
  public async getUploadedList(ctx: Context) {
    const { filename } = ctx.request.body
    const filePath = resolve(ctx.app.config.static.dir as string, PUBLIC_DIR, filename)
    const existFile = await pathExists(filePath)
    if (existFile) {
      ctx.body = {
        code: 200,
        needUpload: false,
      }
      return
    }
    const tempFilePath = resolve(ctx.app.config.static.dir as string, TEMP_DIR, filename)
    let uploadedList: any[] = []
    const existTemporaryFile = await pathExists(tempFilePath)
    if (existTemporaryFile) {
      uploadedList = await fs.readdir(tempFilePath)
      uploadedList = await Promise.all(uploadedList.map(async (filename: string) => {
          const stat = await fs.stat(resolve(tempFilePath, filename))
          return {
              filename,
              size: stat.size,
          }
      }))
    }
    ctx.body = {
      code: 200,
      needUpload: true,
      uploadedList,
    }
  }
  public async upload(ctx: Context) {
    const { filename } = ctx.request.body
    await mergeChunks(filename, ctx)
    ctx.body = {
      code: 200,
      success: true,
    }
    ctx.status = 200
  }
}
const pipeStream = (filePath: string, writeStream) => new Promise(resolve => {
  const readStream = createReadStream(filePath)
  readStream.on('end', async () => {
      await fs.unlink(filePath)
      resolve()
  })
  readStream.pipe(writeStream)
})

const SIZE = 1024 * 1024 * 10

const mergeChunks = async (filename: string, ctx) => {
  const filePath = resolve(ctx.app.config.static.dir as string, PUBLIC_DIR, filename)
  const chunksDir = resolve(ctx.app.config.static.dir as string, TEMP_DIR, filename)
  const chunkFiles = await fs.readdir(chunksDir)
  chunkFiles.sort((a, b) => Number(a.split('-')[1]) - Number(b.split('-')[1]))
  await Promise.all(
    chunkFiles.map((chunkFile, index) => pipeStream(
        resolve(chunksDir, chunkFile),
        createWriteStream(filePath, {
            start: index * SIZE,
        }),
    )),
  )
  await fs.rmdir(chunksDir)
}
