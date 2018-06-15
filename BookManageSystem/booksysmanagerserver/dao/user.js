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
} = require(commenModelPath)
let db = require(dbUtils)
let utils = require(utilsPath)
let dayjs = require("dayjs")

class UserDao {

	  queryUserInfo(object){
	  	return new Promise((resolve, reject) => {
	  		let sql = `select * from user where userId =${object.userId}`
			db.query(sql)
				.then((data) => {
					//console.log(JSON.stringify(data))
					if(data.length>0){
						resolve(Resolve.success(data[0]))
					}else{
						resolve(Resolve.fail("没有此用户"))	
					}
					
				}).catch((e) => {
					reject(e);
				})
		})
	  }


/*		isUserIdExsit(object) {
		return new Promise((resolve, reject) => {
			let sql = `select * from user where userId = '${object.userId}'`
			db.query(sql) 
				.then((data) => {
					let result = data && data.length > 0 ? Resolve.fail("用户ID已存在") : Resolve.success("用户ID不存在");
					resolve(result)
				}).catch((e) => {
					reject(e);
				})
		})
	}*/

	isUserExsit(object) {
		return new Promise((resolve, reject) => {
			let sql = `select *from user where nickName = '${object.nickName}' or userId =${object.userId}`
			//console.log(sql)
			db.query(sql)
				.then((data) => {
					let result = data && data.length > 0 ? Resolve.fail("用户已存在") : Resolve.success("用户不存在");
					//console.log("用户是否存在")
					//console.log(JSON.stringify(result))
					resolve(result)
				}).catch((e) => {
					reject(e);
				})
		})
	}

	async completeInfo(object) {
		//console.log(` 完善信息:`)
		//console.log(JSON.stringify(object));
		if (utils.isEmpty(object) || !utils.contains(object, "nickName,birthDate,userId")) {
			return 	  Promise.reject("参数异常");
		}
		try {
			let userData = await this.isUserExsit(object);
			if (!userData.success) {
				return Promise.resolve(Resolve.fail("用户已存在"));
			}
			object.dateTime = dayjs().format("YYYY-MM-DD hh:mm:ss");
		  await	 db.insert("user", object)
		  return Promise.resolve(Resolve.success({fullUserIfo:object})) 
		}catch (e){
			return Promise.reject(e);
		}
	}

}

module.exports = new UserDao();