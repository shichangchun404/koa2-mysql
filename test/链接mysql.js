var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'database_test1' 
}); 
 
connection.connect();
 
var  sql = 'SELECT * FROM tbl_students';
//查
connection.query(sql,function (err, result) {
  if(err){
    console.log('[SELECT ERROR] - ',err.message);
    return;
  }
  console.log('--------------------------SELECT----------------------------');
  console.log(result);
  console.log('------------------------------------------------------------\n\n');  
});
 
connection.end();