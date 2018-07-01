var express = require('express');
var router = express.Router();

/*
wxjs路由唯一入口

wxjs 项目路由入口就两个一个是需要授权的，一个是公开的
公开的所有用户都可以访问，授权的必须要登录或者完善信息等条件限制
*/
var authRouter  =require('./auth.js')
var publicRouter = require('./public.js')

router.use((req,res,next)=>{

	  //统一往body中加用户id
    let t= {};
    Object.assign(t,req.body);
    req.body =  t;

    if(req.body.userId!=null&&req.body.userId!="undefined"){
    	req.body.userId = `'${req.body.userId}'`
    }
 
    console.log(req.body);
	next();
})


router.use('/auth',authRouter)
router.use('/public',publicRouter)


 
module.exports = router;
