# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+


## 问题参考文档
['mysql' does not exist on type 'Application'](https://github.com/eggjs/egg/issues/2648)
- egg报错:Please set config.keys first
  - npm run tsc

[sequelize](https://sequelize.org/master/manual/querying.html)


[联表查询参考](https://blog.csdn.net/weixin_34370347/article/details/91389028)
[sequelize 文档](https://itbilu.com/nodejs/npm/V1PExztfb.html)

## node
- 初始化表格
```shell
npx sequelize migration:generate --name=init-users
```

## 学习
http://docs.sequelizejs.com/
