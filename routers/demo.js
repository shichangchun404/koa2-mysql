const fs = require('fs')
const router = require('koa-router')()

const main = ctx => {
  //ctx.response.body = fs.createReadStream('../koa2-mysql/views/demo/demo1.html')
}

router.get('/demo',main)

module.exports = router