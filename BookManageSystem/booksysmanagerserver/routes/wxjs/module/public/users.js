var express = require('express');
var router = express.Router();
const rootPath = process.cwd();
let {
	RespBaseData,
	Resolve
} = require(rootPath + "/model/CommenModel.js")
let userDao = require(rootPath + "/dao/user.js")
let utils = require(rootPath + "/public/javascripts/utils")
let resUtils = require(rootPath + "/public/javascripts/ResUtils")

var request = require('request');


router.route('/index').post(function(req, res, next) {
	//console.log(req.session.user);
	if (req.session.user) {
		res.json({
			title: '作者管理'
		});
	} else {
		req.session.originalUrl = req.originalUrl ? req.originalUrl : null; //记录用户的请求路径
		//console.log(req.session.originalUrl);
		res.json({
			title: "跳到登录页面"
		});
	}
});

//用户注册路由
router.route('/completeinfo').post(function(req, res, next) {
	let t = !utils.isEmpty(req.body) ? req.body : req.query;
	userDao.completeInfo(t)
		.then((data) => {
			resUtils.sendData(res, data);
		}).catch(next)
});



//用户登录路由
router.route('/login').post(function(req, res, next) {

	let APPID = "wxe833fd9e56421b4d";
	let SECRET = "c5fef6060db496033891857e1b9d437a";
	let JSCODE = req.body.code;
	let proxy_url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`
	//console.log(proxy_url)
	var options = {
		url: proxy_url,
		method: "GET",
		json: true,
	};
	//返回用户唯一标识和sessionkey
	function callback(error, response, data) {
		if (!error && response.statusCode == 200) {
			console.log(JSON.stringify(data))
			userDao.isUserExsit({
					userId: `'${data.openid}'`
				})
				.then((data) => {
					if (data.success) {
						//用户id不存在
						let resolveData = Resolve.fail("未完善用户信息").code("login:not_complete_userinfo").data({
							openid: response.body.openid
						});
						resUtils.sendData(res, resolveData);
					} else {
						//如果用户存在
						userDao.queryUserInfo({
								userId:`'${response.body.openid}'`
							}).then((data) => {
								resUtils.sendData(res, Resolve.success({fullUserInfo:data.data}));
							})
							.catch(next)
					}
				}).catch(next)
		}
	}
	request(options, callback);
})



module.exports = router;