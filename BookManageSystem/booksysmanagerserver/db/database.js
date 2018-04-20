var mysql  = require('mysql');  //调用MySQL模块
var config = require("../config.js")


//创建一个connection
var connection = mysql.createConnection({     
  host     : config.host,       //主机
  user     :  config.user,               //MySQL认证用户名
  password : config.password,        //MySQL认证用户密码
  port: config.port,  //端口号
  database:'bookmanager'                 
}); 


//创建一个connection
connection.connect(function(err){
    if(err){        
          console.log('[query] - :'+err);
        return;
    }
});  

module.exports = connection;


/*
//执行SQL语句
connection.query('SELECT *from foods ', function(err, rows, fields) { 
     if (err) {
             console.log('[query] - :'+err);
        return;
     }
     console.log('The solution is: ', rows[0]);  
});  
//关闭connection
connection.end(function(err){
    if(err){        
        return;
    }
      console.log('[connection end] succeed!');
});*/