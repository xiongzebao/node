var express = require('express');
var router = express.Router();
const rootPath = process.cwd();

var commenModelPath = rootPath + "/model/CommenModel.js";
var dbUtils = rootPath + "/db/dbUtils.js";
var utilsPath = rootPath + "/public/javascripts/utils"

let {
	RespBaseData
} = require(commenModelPath)
let db = require(dbUtils)
let utils = require(utilsPath)
let resUtils = require(rootPath + "/public/javascripts/ResUtils")

let dayjs = require("dayjs");

router.route('/error').post(function(req, res, next) {
	//resUtils.sendData(res,"错误信息")
	//console.log(req.body)

	let currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
	/* if(!utils.contains(req.body,"errorInfo,errorCode,errorType")){
	 	resUtils.sendError(res,"参数错误"+req.body)
	 	return;
	 }*/
	 req.body.createTime = currentTime;
	 db.insert("error",req.body);
			 

});




module.exports = router;