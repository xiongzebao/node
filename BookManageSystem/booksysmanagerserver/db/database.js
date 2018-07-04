var mysql  = require('mysql');  //调用MySQL模块
var config = require("../config.js")

//创建一个connection
var connection = mysql.createConnection({     
  host     : config.host,       //主机
  user     :  config.user,               //MySQL认证用户名
  password : config.password,        //MySQL认证用户密码
  port: config.port,  //端口号
  database:'wxjs'                 
}); 


//创建一个connection
connection.connect(function(err){
    if(err){        
          console.log('[query] - :'+err);
        return;
    }
});  

module.exports = connection;



//关闭connection ,要使用时不能关闭，否则会抛出异常
/*connection.end(function(err){
    if(err){        
        return;
    }
      //console.log('[connection end] succeed!');
});*/