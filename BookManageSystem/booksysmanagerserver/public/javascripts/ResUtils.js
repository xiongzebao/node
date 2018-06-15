 var path = require("path");
 const rootPath = path.dirname(require.main.filename);

 var commenModelPath = rootPath + "/model/CommenModel.js";
 var utilsPath = rootPath + "/public/javascripts/utils"
 var errorLogger = require(rootPath + "/dao/error.js")
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
 		if (utils.isEmpty(data)) {
 			throw new Error("sendData()'s param is Empty");
 		}
 		if (!(data instanceof Resolve)) {
 			throw new Error("sendData() the param must  be  Resolve type");
 		}
 		if (data.error === true) {
 			resdata = RespBaseData.getInstance().setLogicError(data.message)
 			if(!utils.isEmpty(data.code)){
 				resdata.code = data.code;
 			}
 			resdata.datas = data.data;
 		} else {
 			resdata = RespBaseData.getInstance().setDatas(data.data);
 			resdata.message = data.message;

 		}
 		res.json(resdata);
 	}

 }

 module.exports = resUtils;