var express = require('express');
var router = express.Router();
const rootPath = process.cwd();
let {
	RespBaseData,
	Resolve
} = require(rootPath + "/model/CommenModel.js")
let signDao = require( rootPath + "/dao/sign.js")
let utils = require(rootPath + "/public/javascripts/utils")
let resUtils = require(rootPath + "/public/javascripts/ResUtils")
let CONSTANT = require(rootPath + "/public/javascripts/constant")

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


//获取所有签到信息
// queryFlag:1查询所有，2，查询最近n天,3,按月份查询,4,查询当天的签到信息
let getSignInfo =   function(req, res, next) {
	let object = req.body;

	if(object.queryFlag==4){
		  let t={};
		 object.queryFlag=2;
		 object.lastDays = 3;
		 signDao.getSignInfo(object)
		.then((data) => {
			 t.list = data;
			return signDao.queryHasSignedNumber(object);
		})
		.then((number)=>{
			console.log(number)
			let couragementTip = CONSTANT.getCouragement(number);
			t.couragementTip = couragementTip;
			console.log(JSON.stringify(t));
			resUtils.sendData(res,Resolve.success(t));
		})
		.catch(next)
		return;
	}

	signDao.getSignInfo(object)
		.then((data) => {
			resUtils.sendData(res,  Resolve.success({list:data}));
		})
		.catch(next)
}
router.route('/query').post(getSignInfo).get(getSignInfo);



module.exports = router;