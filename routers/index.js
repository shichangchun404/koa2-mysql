const router = require('koa-router')();
const userModel = require('../lib/mysql.js');

// 首页
router.get('/', async(ctx, next) => {
  let userList
  await userModel.findUserData()
    .then(async (result) => {
      userList = result
    })
  await ctx.render('index', {
    session: ctx.session,
    userList: userList,
    phoneNum: 18855981958
  })
})

module.exports = router
