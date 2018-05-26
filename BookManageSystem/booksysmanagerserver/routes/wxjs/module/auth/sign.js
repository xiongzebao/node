var express = require('express');
var router = express.Router();
const rootPath = process.cwd();
let {
	RespBaseData,
	Resovle
} = require(rootPath + "/model/CommenModel.js")
let signDao = require( rootPath + "/dao/sign.js")
let utils = require(rootPath + "/public/javascripts/utils")
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
	signDao.querylastdays({lastDays:3})
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
router.route('/querysigninfo').post(getSignInfo).get(getSignInfo);

//获取所有签到信息
let getAllSignInfo = function(req, res, next) {
	 let t=!utils.isEmpty(req.body)?req.body:req.query;
	signDao.getAllSignInfo(t)
		.then((data) => {
			resUtils.sendData(res, data.setData({list:data.data}));
		})
		.catch(next)
}
router.route('/queryallsigninfo').post(getAllSignInfo).get(getAllSignInfo);


module.exports = router;