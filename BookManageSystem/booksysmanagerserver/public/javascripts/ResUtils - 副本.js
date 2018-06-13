 const rootPath = process.cwd();

 var commenModelPath = rootPath + "/model/CommenModel.js";
 var utilsPath = rootPath + "/public/javascripts/utils"
var errorLogger = require(rootPath+"/dao/error.js")
 let {
 	RespBaseData,
 	Resolve
 } = require(commenModelPath)

var utils = require(utilsPath)

 let resUtils = {
 	sendError: (res, message) => {
 
 		let data = RespBaseData.getInstance().setSysError(message);
 		res.status(500);
 		res.json(data);

 	},

 	sendData: (res, data) => {
 		let resdata = "";

 		//console.log(`data: ${data}`);

 		if(utils.isEmpty(data)){
 			throw new Error("sendData()  the data is Empty");
 		}
 		if (  !(data instanceof Resolve)) {
 			throw new Error("sendData() the message param must  be  Resolve type");
 		}
 		if (data.error === true) {
 			resdata = RespBaseData.getInstance().setLogicError(data.message)
 		} else {

 			resdata = RespBaseData.getInstance().setDatas(data.data);
 			resdata.message = data.message;
 		}
 		res.json(resdata);
 	}

 }

 module.exports = resUtils;