var conn = require("./database.js")
var path = require("path");
var utils = require(path.dirname(require.main.filename) + "/public/javascripts/utils");



class DBOperation {

	constuctor(connection) {
		this.conn = connection;
	}
	//查询函数
	/*
	table:表名
	values：参数对象
	*/
	queryByParam(table, values) {
		return new Promise((resolve, reject) => {
		 
			let condition = this.formatCondition("and", values);
			let queryResult = (error, results, fields) => {
				if (error) {
					reject(error);
				}
				resolve(results)
			}
		 
		   //console.log(condition.sql);
		   //console.log(condition.param);
			conn.query(' SELECT * FROM ' + table + ' WHERE ' + condition.sql, condition.param, queryResult);
		})


	}

		async getTotalSize(table){
		let sql = `select count(*) as count from ${table}`
		let totalSize = await db.query(sql)
		return totalSize[0].count;
	}

	async getTotalPage(table){
		let totalSize = await this.getTotalSize(table);
		console.log(totalSize);
		let pageNumber =Math.ceil(totalSize/10) 
		console.log("pageNumber=="+pageNumber); 
		return pageNumber;
	}

	/*
	 option:{
		table:"",表名
		fields:""字段
		condition:""查询条件
	 }
	*/
	query(sql) {
		return new Promise((resolve, reject) => {
			let queryResult = (error, results, fields) => {
				if (error) {
					reject(error);
				}
				resolve(results)
			}
			conn.query(sql, queryResult);
		})
	}

	//增添函数
	insert(table, param) {
		return new Promise((resolve, reject) => {

			if(typeof(param.userId)!="undefined"){
				var reg = new RegExp("'","g");
				console.log(param.userId);
				var a = param.userId.replace(reg,"");
 				param.userId=a;
			}

			console.log(param);
			conn.query('INSERT INTO ' + table + ' SET ?', param, (error, results, fields) => {
				if (error) {
					reject(error);
				}
				resolve(results)
			});
		})
	}
	//删除函数
	delete(table, values, queryResult) {
		let condition = this.formatCondition("and", values);
		conn.query('delete  FROM ' + table + ' WHERE ' + condition.sql, condition.param, queryResult);
	}

	//第一个参数是更新条件对象，第二个是设置值对象
	update(table, conditionValues, setValues, queryResult) {
		let condition = this.formatCondition("and", conditionValues);
		let set = this.formatCondition(",", setValues);
		let sql = `update ${table} set ${set.sql} where ${condition.sql}`
		let values = set.param.concat(condition.param);
		conn.query(sql, values, queryResult);
	}



	//私有函数
	formatCondition(joint, t) {

		let values = {};
		for (let prop in t) {
			values[prop] = t[prop];
		}
		let param = [];
		var sql = "";
		for (var key in values) {
			if (values.hasOwnProperty(key) && typeof values[key] != "function") {
				sql = sql + key + `=? ${joint} `
				param.push(values[key]);
			}
		}
		let sqlRes = sql.substring(0, sql.lastIndexOf(`${joint} `));
		return {
			sql: sqlRes,
			param: param
		}
	}

}
var db = new DBOperation(conn);

module.exports = db;