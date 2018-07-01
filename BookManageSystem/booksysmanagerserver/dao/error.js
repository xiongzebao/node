var express = require('express');
var router = express.Router();
var path = require("path");
console.log(require.main.filename);
const rootPath = ""+path.dirname(require.main.filename);

var commenModelPath = rootPath + "/model/CommenModel.js";
var dbUtils = rootPath + "/db/dbUtils.js";
var utilsPath = rootPath + "/public/javascripts/utils"

let {
	RespBaseData
} = require(commenModelPath)
let db = require(dbUtils)
let utils = require(utilsPath)
let dayjs = require("dayjs")

class ErrorLog{

	insert(errmsg,errcode,errorType=2){
			let currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
			let object ={
				createTime:currentTime,
				errorCode:errcode,
				errorInfo:errmsg,
				errorType:errorType
			}		 
		return db.insert("error", object);
	}

	async query(table,values){

	   let data=  await	queryByParam(table, values);
	   return Promise.resolve(data);
	}


}


module.exports = new ErrorLog();

