var express = require('express');
var publicRouter = express.Router();

var usersRouter =  require("./module/public/users.js");
var errorRouter =  require("./module/public/error.js");
 
 //public 模块不需要登录授权，任何未登录或者未完善信息游客都可以访问
 publicRouter.use("/error",errorRouter);
 publicRouter.use("/users",usersRouter);

module.exports = publicRouter;
