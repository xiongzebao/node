var express = require('express');
var router = express.Router();
var path = require("path");
const rootPath = path.dirname(require.main.filename);

var commenModelPath = rootPath + "/model/CommenModel.js";
var dbUtils = rootPath + "/db/dbUtils.js";
var utilsPath = rootPath + "/public/javascripts/utils"

let {
	RespBaseData,
	Resolve
} = require(rootPath + "/model/CommenModel.js")
let db = require(dbUtils)
let utils = require(utilsPath)
let resUtils = require(rootPath + "/public/javascripts/ResUtils")

let dayjs = require("dayjs");

router.route('/error').post(function(req, res, next) {
	let currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
	/* if(!utils.contains(req.body,"errorInfo,errorCode,errorType")){
	 	resUtils.sendError(res,"参数错误"+req.body)
	 	return;
	 }*/
	 req.body.createTime = currentTime;
	 db.insert("error",req.body);
});

router.route("/get_error_info").post(function(req, res, next){
	let sql = "select * from error"
	db.query(sql).then(data=>{
		console.log(data)
		resUtils.sendData(res,Resolve.success({list:data}));
	}).catch(next)
	  
 
})




module.exports = router;