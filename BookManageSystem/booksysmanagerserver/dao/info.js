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

class InfoDao {

	//查询
	async query(object) {
		if (!utils.contains(object, `id`)) {
			return Promise.reject("参数错误");
		}
		let data = await db.queryByParam("info",object)
		return data;
	}
	//查询
	async queryList(object) {
			let start=0;
			 let sql = `SELECT id,title,subTitle,picUrl,createOnStr,publishOnStr,isPublish FROM info `
			if(object&&object.curPage){
				start = (object.curPage-1)*10
				sql +=` limit ${start},10`
			}
			let data = await db.query(sql)
		return data;
	}






 	async insert(object) {
		 try{
		 	 let data =  await db.insert("info",object);
		 	  return Promise.resolve(data);
		 }catch(e){
		 	return Promise.reject(e);
		 }
		
	 
	}


  

}

module.exports = new InfoDao();