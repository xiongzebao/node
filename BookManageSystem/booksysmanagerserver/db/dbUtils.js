var conn = require("./database.js")

class DBOperation{

	constuctor(connection){
		this.conn = connection;
	}
	//查询函数
	query(table,values,queryResult){
		let condition=this.formatCondition("and",values);
		conn.query(' SELECT * FROM ' +table+  ' WHERE ' +condition.sql,  condition.param, queryResult);
	}
	//增添函数
	insert(table,param,queryResult){
		 console.log(param);
		conn.query('INSERT INTO ' +table+ ' SET ?',  param, queryResult);
	}
	//删除函数
	delete(table,values,queryResult){
		let condition=this.formatCondition("and",values);
		conn.query('delete  FROM '+table+' WHERE '+condition.sql, condition.param,queryResult);
	}

	//第一个参数是更新条件对象，第二个是设置值对象
	update(table,conditionValues,setValues,queryResult){
		let condition=this.formatCondition("and",conditionValues);
		let set = this.formatCondition(",",setValues);
		let sql = `update ${table} set ${set.sql} where ${condition.sql}`
		let values = set.param.concat(condition.param);
		conn.query(sql,values,  queryResult);
	}

	/*queryResult(error, results, fields) {
			if (error){
				console.log(error);
				throw error;
			}
			console.log(this.sql);
			console.log(`affectedRows   ${ results.affectedRows }`);
		}*/

	//私有函数
	formatCondition(joint,t){

		let values = {};
		for (let prop in t) {
			values[prop] = t[prop];
		}
		let param = [];
		var sql="";
		for(var key in values){
			if (values.hasOwnProperty(key) && typeof values[key] != "function") {
				sql=sql+key+`=? ${joint} `
				param.push(values[key]);
			}
		}
		let sqlRes = sql.substring(0, sql.lastIndexOf(`${joint} `)); 
		return {sql:sqlRes,param:param}
	}

}
var db = new DBOperation(conn);

module.exports = db;
