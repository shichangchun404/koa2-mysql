var mysql = require('mysql');
var config = require('../config/default.js')

// 创建数据库会话 一个事件就有一个从开始到结束的过程，数据库会话操作执行完后，就需要关闭掉，以免占用连接资源。
// const connection = mysql.createConnection({
//   host: config.database.HOST,
//   user: config.database.USERNAME,
//   password: config.database.PASSWORD,
//   database: config.database.DATABASE
// })

// 通过建立了数据库的连接池，以便后面的操作都可以使用到
// 一般情况下操作数据库是很复杂的读写过程，不只是一个会话，
// 如果直接用会话操作，就需要每次会话都要配置连接参数。所以这时候就需要连接池管理会话。
var pool  = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
});


// 再创建了一个函数query，通过返回promise的方式以便可以方便用.then()来获取
// 数据库返回的数据通关一个函数写了一个_sql的sql语句。最后调用query函数把sql语句传进去

let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

// 查找用户
let findUserData = function() {
  let _sql = 'select * from tbl_students'
  return query(_sql)
}

// 插入用户
let insertUserData = function(name,age,city) {
  let _sql = `insert into tbl_students (name, age, city) values ('${name}',${age},'${city}')`
  console.log('===sql=', _sql)
  return query(_sql)
}

// 删除用户
let deleteUserData = function(id) {
  let _sql = `delete from tbl_students where id=${id}`
  console.log('===sql=', _sql)
  return query(_sql)
}
// 其它数据库操作方法 to do...

module.exports = {
  findUserData,
  insertUserData,
  deleteUserData
}