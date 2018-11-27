const router = require('koa-router')()
const userModel = require('../lib/mysql.js')

router.post('/del',async(ctx, next) =>{
  var id = ctx.request.body.id
  console.log('del id =', id)
  if (id === 1) {
    console.log('参数有误')
    return
  } else {
    await userModel.deleteUserData(id)
      .then(res => {
        console.log('===数据删除成功===')
        ctx.body = {
          code: 0,
          message: "success"
        }
      })
  }

})

module.exports = router