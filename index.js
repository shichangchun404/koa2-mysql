const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const bodyParser = require('koa-bodyparser')
const ejs = require('ejs')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')
const router = require('koa-router')
const views = require('koa-views')
const staticCache = require('koa-static-cache')
const config = require('./config/default.js')
const app = new Koa()

//session存储配置
const sessionMysqlConfig = {
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  host: config.database.HOST,
}

//配置session中间件
app.use(session({
  key: 'USER_SID',
  store: new MysqlStore(sessionMysqlConfig)
}))

// 缓存
// app.use(staticCache(path.join(__dirname, './public'), { dynamic: true }, {
//   maxAge: 365 * 24 * 60 * 60
// }))
// app.use(staticCache(path.join(__dirname, './images'), { dynamic: true }, {
//   maxAge: 365 * 24 * 60 * 60
// }))

//配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}))
app.use(bodyParser({
  formLimit: '1mb'
}))

//  路由
// app.use(require('./routers/index.js').routes())
// app.use(require('./routers/add.js').routes())
// app.use(require('./routers/del.js').routes())
// app.use(require('./routers/demo.js').routes())

const main = ctx => {
  console.log(ctx.request)
  ctx.response.type = 'html'
  ctx.response.body = fs.createReadStream('./views/demo/demo1.html')
}
app.use(main)


app.listen(config.port)

console.log(`the server is running http://localhost:${config.port}/ `)