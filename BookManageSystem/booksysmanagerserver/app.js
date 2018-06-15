var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var cors = require('cors');
var session = require('express-session')
var config = require("./config.js")
require("./db")
var errorLogger = require("./dao/error.js")

var app = express();
process.env.NODE_ENV = 'development';
//process.env.NODE_ENV = 'product';
app.use(logger('dev')); // 使用 morgan 将请求日志输出到控制台
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var whitelist = config.originList;
var corsOptions = {
  origin: function(origin, callback) {
    //console.log(whitelist);
    //console.log(origin);
    /* let ret= whitelist.indexOf(origin)
     if (ret !== -1) {
       callback(null, true)
     } else {
       callback(new Error('Not   allowed  by CORS'))
     }*/

    callback(null, true)
  }
}
app.use(cors(corsOptions));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true
  }
}))

/* app.get('/', function(req, res) {
   // res.send('JWT 授权访问的API路径 http://localhost:'   + '/api');
   });*/
//业务相关




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //console.log("9999")
  req.body.userId = req.get("userId");
  /*var err = new Error('Not Found');
  err.status = 404;
  res.status(err.status || 500);
  res.json({
    "error": err
  })
  next(err);*/
  next()
});

// error handler
app.use(function(err, req, res, next) {
    if(err instanceof Resolve){
      //console.log("---system error----")
      resUtils.sendData(res,err);
      return;
    }
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  //console.log(err||err.stack);
  let errmsg = err.stack||err;
  errorLogger.insert(errmsg,err.status,2)
    resUtils.sendError(res,errmsg);
});

//wxjs根路由
var wxjsRootRouter = require('./routes/wxjs/index');
let resUtils = require("./public/javascripts/ResUtils");
var path = require("path");
const rootPath = path.dirname(require.main.www);
let {RespBaseData,Resolve} = require( rootPath + "/model/CommenModel.js")
 
app.use("/wxjs",wxjsRootRouter)


module.exports = app;