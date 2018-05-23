var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const rootPath = process.cwd();

var commenModelPath = rootPath + "/model/CommenModel.js";
var dbUtils = rootPath + "/db/dbUtils.js";
var utilsPath = rootPath + "/public/javascripts/utils"



let {
	RespBaseData
} = require(commenModelPath)
let db = require(dbUtils)
let utils = require(utilsPath)


router.route('/index').post(function(req, res, next) {
	console.log(req.session.user);
	if (req.session.user) {
		res.json({
			title: '作者管理'
		});
	} else {
		req.session.originalUrl = req.originalUrl ? req.originalUrl : null; //记录用户的请求路径
		console.log(req.session.originalUrl);
		res.json({
			title: "跳到登录页面"
		});
	}
});

//用户注册路由
router.route('/completeinfo').post(function(req, res, next) {
		console.log(req.body);
	if (utils.isEmpty(req.body)||!utils.contains(req.body, ["nickName","birthDate"])) {
		res.status(500)
		res.json(RespBaseData.getInstance().setLogicError("invalid param "))
		return;
	}


	let promise = new Promise(function(resolve, reject) {

		db.query("user", {
			nickName: req.body.nickName
		}, function(error, results, fields) {
			if (results && results.length > 0) {
				reject("用户已存在");
			}
			resolve();
		})
	});

	promise.then(function(data) {
		
		let callback = function(error, results, fields) {
			if (error) {
				console.log(error)
				res.json(RespBaseData.getInstance().setSysError(error));
				return;
			}
			res.json(RespBaseData.getInstance().setMessage("注册成功"));
		}
		//req.body.password = crypto.createHash('md5').update(req.body.password).digest('hex');
		db.insert("user", req.body, callback);

	}, function(err) {
		res.json(RespBaseData.getInstance().setLogicError(err));
	})

});



//用户登录路由
router.route('/login').post(function(req, res, next) {

	db.query("user", req.body, function(error, results, fields) {
		if (results) {
			res.json(results[0]);
		} else {
			next();
		}
	})

})



module.exports = router;