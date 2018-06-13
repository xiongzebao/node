var express = require('express');
var router = express.Router();

/*
wxjs路由唯一入口

wxjs 项目路由入口就两个一个是需要授权的，一个是公开的
公开的所有用户都可以访问，授权的必须要登录或者完善信息等条件限制
*/
var authRouter  =require('./auth.js')
var publicRouter = require('./public.js')

router.use('/auth',authRouter)
router.use('/public',publicRouter)

router.use((req,res,next)=>{
	//console.log("roototootototototo")
	next();
})

 
module.exports = router;
