
var connection = require("./database.js")
let createTables = new Array();


 /*
 *userFlag:0 普通用户，1，超级管理员，2，普通管理员
 */
createTables.push(
 `CREATE TABLE IF NOT EXISTS  
  user(
  id int ,
  nickname varchar(255),
  phone varchar(255),
  userFlag int, 
  password varchar(255))`)

createTables.push(
 `CREATE TABLE IF NOT EXISTS  
  company(
  id int,
  userId long,
  name varchar(255))`)


for(i in createTables){
	connection.query(createTables[i],
	   function(err,result){
	    if(err){
	      console.log(err)
	      throw err
	    }
	})
}





require("./dbUtils.js")