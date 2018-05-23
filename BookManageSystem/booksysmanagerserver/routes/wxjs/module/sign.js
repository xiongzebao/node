var express = require('express');
var router = express.Router();
const rootPath = process.cwd();

var commenModelPath = rootPath + "/model/CommenModel.js";
var signPath = rootPath + "/dao/sign.js";
var utilsPath = rootPath + "/public/javascripts/utils"

let {
	RespBaseData
} = require(commenModelPath)
let signDao = require(signPath)
let utils = require(utilsPath)
let resUtils = require(rootPath + "/public/javascripts/resUtils")

router.use(function(req, res, next) {
	next();
})

router.route('/').post(function(req, res, next) {
	next()
});


router.route('/sign').post(function(req, res, next) {
	signDao.sign(req.body)
		.then((data) => {
			resUtils.sendData(res, data);
		})
		.catch(next)

});


let querylast3days = function(req, res, next) {
	signDao.querylast3days()
		.then((data) => {
			resUtils.sendData(res, data);
		})
		.catch(next)

}
router.route('/querylast3days').post(querylast3days).get(querylast3days);


//获取签到信息，包括是否已签到，和最近三天的签到信息
let getSignInfo = function(req, res, next) {
	signDao.getSignInfo()
		.then((data) => {
			resUtils.sendData(res, data);
		})
		.catch(next)

}
router.route('/getsigninfo').post(getSignInfo).get(getSignInfo);


module.exports = router;