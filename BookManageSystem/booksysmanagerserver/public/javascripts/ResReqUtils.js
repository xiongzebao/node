 var path = require("path");
 const rootPath = path.dirname(require.main.filename);

 var commenModelPath = rootPath + "/model/CommenModel.js";
var utilsPath = rootPath + "/public/javascripts/utils"

let {
	RespBaseData
} = require(commenModelPath)
let utils = {
	  sendError:(res,e)=>{

	  	if(e.logic){
	  		let data=RespBaseData.getInstance().setLogicError(e.message);
	  		if(e.code){
	  			data.code(e.code);
	  		}
	  		res.json(data);
	  	}else{
	  		let data=RespBaseData.getInstance().setSysError(e.message);
	  		if(e.code){
	  			data.code(e.code);
	  		}
	  		res.json(data);
	  	}

	  }

}

module.exports = utils;