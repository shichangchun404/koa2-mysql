const router = require('koa-router')();
const userModel = require('../lib/mysql.js');
// const md5 = require('md5')
// const moment = require('moment');
// const fs = require('fs')

// 注册
router.get('/add', async(ctx, next) => {
  await ctx.render('add', {
    session: ctx.session,
  })
})

router.post('/add', async(ctx, next) => {
  console.log('====ctx body =',ctx.request.body)
  let name = ctx.request.body.name
  let age = ctx.request.body.age
  let city = ctx.request.body.city
  if (name === ''|| age === ''|| city === '') {
    console.log('===参数有误===',ctx.request.body)
    return
  } else {
    await userModel.insertUserData(name,age,city)
      .then(res =>{
        console.log('===数据插入成功===')
        ctx.body = {
          code: 0,
          message: "success"
        }
      })
  }
})

module.exports = router
