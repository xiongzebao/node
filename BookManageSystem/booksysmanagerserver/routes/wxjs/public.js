var express = require('express');
var publicRouter = express.Router();


var errorRouter =  require("./module/error.js");
 
 //public 模块不需要登录授权，任何未登录或者未完善信息游客都可以访问
 publicRouter.use("/error",errorRouter);


module.exports = publicRouter;
