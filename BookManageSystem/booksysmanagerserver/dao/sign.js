var express = require('express');
var router = express.Router();
const rootPath = process.cwd();
let {
	RespBaseData,
	Resolve
} = require(rootPath + "/model/CommenModel.js")
let db = require(rootPath + "/db/dbUtils.js")
let utils = require(rootPath + "/public/javascripts/utils")
let dayjs = require("dayjs")

class SignDao {

	//签到
	async sign(object) {
			if (!utils.contains(object, `nickName,isResign`)) {
				return Promise.reject("参数错误");
			}
			//查询是否有今天的记录
			let sql = `select * from sign where  userId=${object.userId} and to_days(signTime) = to_days(now())` 
			let data = await db.query(sql)
			if (data && data.length > 0) {
				return  Resolve.fail("您今天已签到");
			}
			let currentTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
			object.signTime = currentTime;
			let insertResult = await db.insert("sign", object)
			if (insertResult.affectedRows > 0) {
			       return Resolve.success("签到成功");
			}
			return Promise.reject(Resolve.fail("签到失败"));
	}

	//查询用户所有签到信息
	getAllSignInfo(object) {
		return new Promise((resolve, reject) => {
			if (!utils.contains(object, "userId")) {
				throw new Error("invalid param")
			}
			let sql = `select * from sign where  userId  = ${object.userId}` //查询是否有今天的记录
			db.query(sql)
				.then((data) => {
					resolve(Resolve.success(data))
				}).catch((e) => {
					reject(e)
				})
		})
	}

	//查询今天是否已签到和最近3天的签到记录
	getSignInfo() {
		return new Promise((resolve, reject) => {
			let signInfo = {};
			let data = this.getNowSign()
				.then((data) => {
					signInfo.isSign = data.data && data.data.length > 0 ? true : false;
					this.querylastdays({
						lastDays: 3
					})
				})
				.then((data) => {
					signInfo.last3days = data.data;
					resolve(Resolve.success(signInfo));
				})
				.catch((e) => {
					throw new Error(e);
				})
		})
	}

	//查询最近几天的签到信息
	querylastdays(object) {
		return new Promise((resolve, reject) => {
			if (!utils.contains(object, "lastDays")) {
				reject("无效参数 lastDays")
			}

			let sql = `SELECT DATE_FORMAT(signTime,'%Y-%m-%d') as signTime  FROM sign WHERE DATE_SUB(curdate(), INTERVAL ${object.lastDays} DAY) <= DATE(signTime)`;
			db.query(sql).then((data) => {
				resolve(Resolve.success(data))
			}).catch((e) => {
				reject(e)
			})
		})
	}

	//查询今天的签到记录
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



}

module.exports = new SignDao();