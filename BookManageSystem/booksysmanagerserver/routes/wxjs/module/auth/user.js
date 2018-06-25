var express = require('express');
var router = express.Router();
 var path = require("path");
 const rootPath = path.dirname(require.main.filename);;
let {
	RespBaseData,
	Resolve
} = require(rootPath + "/model/CommenModel.js")
let userDao = require(rootPath + "/dao/user.js")
let utils = require(rootPath + "/public/javascripts/utils")
let resUtils = require(rootPath + "/public/javascripts/ResUtils")


let CONSTANT = require(rootPath + "/public/javascripts/constant")

router.route('/index').post(function(req, res, next) {
let t=!utils.isEmpty(req.body)?req.body:req.query;
});

router.route('/get_all_userinfo').post(function(req, res, next) {
	  userDao.getAllUserInfo().then((data)=>{
	  	console.log(data);
	  	resUtils.sendData(res,data);
	  }).catch(next);
	
});



module.exports = router;