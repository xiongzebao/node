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

let dayjs = require("dayjs")

class SignDao {


	getNowSign() {
		return new Promise((resolve, reject) => {
			let sql = "select * from sign where to_days(signTime) = to_days(now())" //查询是否有今天的记录
			db.query(sql)
				.then((data) => {
					resolve(Resolve.success(data))
				}).catch((e) => {
					reject(e)
				})
		})
	}


	sign(object) {
		return new Promise((resolve, reject) => {

			if (!utils.contains(object, `nickName,isResign`)) {
				reject("参数错误");
			}

			let sql = "select * from sign where to_days(signTime) = to_days(now())" //查询是否有今天的记录
			db.query(sql)
				.then((data) => {
					if (data && data.length > 0) {
						resolve(Resolve.fail("您今天已签到"));
					} else {

						let currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
						object.signTime = currentTime;
						return db.insert("sign", object)
					}

				}).then((data) => {
					if (data.affectedRows > 0) {
						resolve(Resolve.success("签到成功"));
					}
					reject("签到失败");
				})
				.catch((e) => {
					reject(e);
				})


		});
	}


	getSignInfo() {

		return new Promise((resolve, reject) => {
			let signInfo = {};
			let data = this.getNowSign()
				.then((data) => {
					signInfo.isSign = data.data && data.data.length > 0 ? true : false;
					this.querylast3days().then((data) => {
						signInfo.last3days = data.data;
						let t = Resolve.success(signInfo);
						resolve(t);
					})
				})
				.catch((e) => {
					throw new Error(e);
				})
		})


	}


	querylast3days() {
		return new Promise((resolve, reject) => {
			let sql = "SELECT DATE_FORMAT(signTime,'%Y-%m-%d') as signTime  FROM sign WHERE DATE_SUB(curdate(), INTERVAL 3 DAY) <= DATE(signTime)";
			db.query(sql).then((data) => {
				console.log(data);
				resolve(Resolve.success(data))
			}).catch((e) => {
				reject(e)
			})
		})
	}
}

module.exports = new SignDao();