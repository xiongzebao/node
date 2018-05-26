var express = require('express');
var router = express.Router();
const rootPath = process.cwd();

var commenModelPath = rootPath + "/model/CommenModel.js";
var dbUtils = rootPath + "/db/dbUtils.js";
var utilsPath = rootPath + "/public/javascripts/utils"

let {
	RespBaseData,
	Resolve
} = require(commenModelPath)
let db = require(dbUtils)
let utils = require(utilsPath)


class UserDao {


		isUserIdExsit(object) {
		return new Promise((resolve, reject) => {
			let sql = `select *from user where userId = '${object.userId}'`
			db.query(sql)
				.then((data) => {
					let result = data && data.length > 0 ? Resolve.fail("用户ID已存在") : Resolve.success("用户ID不存在");
					resolve(result)
				}).catch((e) => {
					reject(e);
				})
		})
	}

	isUserExsit(object) {
		return new Promise((resolve, reject) => {
			let sql = `select *from user where nickName = '${object.nickName}'`
			db.query(sql)
				.then((data) => {
					let result = data && data.length > 0 ? Resolve.fail("用户已存在") : Resolve.success("用户不存在");
					console.log("用户是否存在")
					console.log(JSON.stringify(result))
					resolve(result)
				}).catch((e) => {
					reject(e);
				})
		})
	}

	completeInfo(object) {
		return new Promise((resolve, reject) => {

			console.log(` 完善信息:`)
			console.log(JSON.stringify(object));

			if (utils.isEmpty(object) || !utils.contains(object, "nickName,birthDate,userId")) {
				return;
			}
			this.isUserExsit(object)
				.then((data) => {
					if (!data.success) {
						resolve(Resolve.fail("用户已存在"));
						return; 
					}
					return db.insert("user", object);
				})
				.then((e) => {
						console.log("注册成功424234")
						resolve(Resolve.success("注册成功"))
				})
				.catch((e) => {
					reject(e)
				})
		})
	}
}

module.exports = new UserDao();