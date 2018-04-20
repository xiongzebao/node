var express = require('express');
var router = express.Router();
const crypto = require('crypto');

let {RespBaseData}  = require("../model/CommenModel.js")
let db  = require("../db/dbUtils.js")


router.route('/index').post(function(req,res,next){
	console.log(req.session.user);
	if(req.session.user){
		res.json({title:'作者管理'});
	}else{
        req.session.originalUrl = req.originalUrl?req.originalUrl:null;//记录用户的请求路径
        console.log(req.session.originalUrl);
        res.json({title:"跳到登录页面"});
    }
});

//用户注册路由
router.route('/regist').post(function(req,res,next){

	

	let promise  = new Promise(function(resolve, reject) {

			db.query("user",{nickname:req.body.nickname},function(error, results, fields){
			if(results&&results.length>0){
				reject("用户名已存在");
			}
			resolve();
			})

	});

	promise.then(function(data) {

		let  callback = function(error, results, fields){
			if(error){
				res.json(RespBaseData.getInstance().setSysError(error.message));
				return;
			}
			res.json(RespBaseData.getInstance().setMessage("注册成功"));
		}
		req.body.password=crypto.createHash('md5').update(req.body.password).digest('hex');
		db.insert("us", req.body,callback);

	},function(err){
		res.json(RespBaseData.getInstance().setLogicError(err));
	})




});

//用户登录路由
router.route('/login').post(function(req,res,next){

	db.query("user", req.body,function(error, results, fields){
		if(results){
			res.json(results[0]); 
		}else{
			next(); 
		}
	})
    
}).post(function(req,res){

 /*   console.log(req.session.originalUrl);
    //req.session.user = user;//将用户信息写入到session
    if(req.session.originalUrl){
        var redirectUrl = req.session.originalUrl;
        req.session.originalUrl = null;
    }else{//不存在原始请求路径，则将用户重定向到首页路劲
        var redirectUrl = '/index';
    };
    console.log('yes');
    req.session.user = 'zhangsan';
    res.redirect(redirectUrl);*/
    res.json({title:'next登录'});

});



module.exports = router;
