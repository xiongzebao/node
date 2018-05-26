var express = require('express');
var router = express.Router();
const rootPath = process.cwd();
var express = require('express');
var router = express.Router();
const rootPath = process.cwd();
let {RespBaseData,Resolve} = require( rootPath + "/model/CommenModel.js")
let db = require(rootPath + "/db/dbUtils.js")
let utils = require(rootPath + "/public/javascripts/utils")
let dayjs = require("dayjs")


class UserDao{

	completeInfo(){
		return new Promise((resovle,reject){
			
		})
	}
}

module.exports = new UserDao();
