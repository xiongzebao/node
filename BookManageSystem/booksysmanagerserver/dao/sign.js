var express = require('express');
var router = express.Router();
var path = require("path");
const rootPath = path.dirname(require.main.filename);
let {
	RespBaseData,
	Resolve
} = require(rootPath + "/model/CommenModel.js")
let db = require(rootPath + "/db/dbUtils.js")
let utils = require(rootPath + "/public/javascripts/utils")
let dayjs = require("dayjs")
let userDao = require("./user.js")

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
			return Resolve.fail("您今天已签到");
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
    // queryFlag:1查询所有，2，查询最近n天,3,按月份查询格式必须是类似2018-06格式
  async	getSignInfo(object) {
  			//console.log(object)
			if (!utils.contains(object, "userId,queryFlag")) {
				throw new Error("invalid param")
			}
			//查询所有 
			if (object.queryFlag == 1) {
				let sql = `select DATE_FORMAT(signTime,'%Y-%m-%d') as signTime,signState,signComment from sign where  userId  = ${object.userId}`
				let data = await db.query(sql)
				return data;
			}
			//查询最近n天
			if (object.queryFlag == 2) {
				return this.querylastdays(object)
			}
			if (object.queryFlag == 3) {
				return this.queryByMonth(object);
			}
			if(object.queryFlag == 4){


			}
	}

	async queryHasSignedNumber(object){
		let sql = "SELECT  COUNT(*) as number FROM sign WHERE signState =1 and userId="+object.userId;
		let data = await db.query(sql)
		return data[0].number;
	}

	async queryByMonth(object){
			if (!utils.contains(object, "yearmonth")) {
					throw new Error("invalid param")
				}
				let sql = `select DATE_FORMAT(signTime,'%Y-%m-%d') as signTime,signState,signComment 
					 from sign 
					where  userId  = ${object.userId} and date_format(signTime,'%Y-%m')='${object.yearmonth}'`
				//console.log(sql)
				let data = await db.query(sql)
				return data;
	}

	//查询最近几天的签到信息 私有
	async querylastdays(object) {
		if (!utils.contains(object, "lastDays,userId")) {
			return Promise.reject("无效参数 lastDays")
		}
		try {
			let userinfo = await userDao.queryUserInfo({
				userId: object.userId
			});
			let sql = `SELECT DATE_FORMAT(signTime,'%Y-%m-%d') as signTime ,signComment FROM sign WHERE userId=${object.userId} and DATE_SUB(curdate(), INTERVAL ${object.lastDays} DAY) <= DATE(signTime) and DATE(signTime) >= DATE('${userinfo.data.dateTime}')`;
			let data = await db.query(sql)
			return Promise.resolve(data)
		} catch (e) {
			return Promise.reject(e)
		}
	}

}

module.exports = new SignDao();