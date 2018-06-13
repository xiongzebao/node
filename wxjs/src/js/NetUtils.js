import wepy from 'wepy'
import InterfaceUtils from './InterfaceUtils'
import intercept from './NetGlobalIntercept'



class Request {

	getOption(param, defaultOption = {}) {
		let option = {};
		if (typeof(param) == 'object') {
			option = param
		} else {
			throw new Error(`${getOption.caller.name}  参数错误`)
		}
		if (defaultOption && typeof(defaultOption) == 'object') {
			option = { ...defaultOption,
				...option
			}
		}
		return option;
	}

	getDefaultPostOption() {
		let defaultOption = {
			method: "POST",
			header: {
				'content-type': 'application/json', // 默认值
				'userId':wx.getStorageSync("userId")
			},
			fail: function(msg) {
				console.error(msg);
			},
			complete: function() {
				InterfaceUtils.hideLoading();
			}
		}
		return defaultOption;
	}
	/*
	url 	String 	是 		开发者服务器接口地址 	
	data 	Object/String/ArrayBuffer 	否 		请求的参数 	
	header 	Object 	否 		设置请求的 header，header 中不能设置 Referer。 	
	method 	String 	否 	GET 	（需大写）有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT 	
	dataType 	String 	否 	json 	如果设为json，会尝试对返回的数据做一次 JSON.parse 	
	responseType 	String 	否 	text 	设置响应的数据类型。合法值：text、arraybuffer 	1.7.0
	success 	Function 	否 		收到开发者服务成功返回的回调函数 	
	fail 	Function 	否 		接口调用失败的回调函数 	
	complete 	Function 	否 		接口调用结束的回调函数（调用成功、失败都会执行）*/



	/* 用法：
	  如果只有一个参数，这个参数相当于wx.request(object) 中的object参数
	  如果有多个参数 参数意义如参数名所示

	  成功执行then方法，失败执行catch方法
	*/
	post(url, data, showLoading = false) {
		if (showLoading) {
			InterfaceUtils.showLoading();
		}
		let option = this.getDefaultPostOption();
		if (arguments.length == 1 && typeof(arguments[0]) === "object") {
			option = this.getOption(arguments[0], option)
		} else {
			option.url = /*appConfig.server.host +*/ url;
			option.data = data;
		}
		let that = this;
		let t = function(resolve, reject) {
			option.success = (res) => {
				if(intercept(res)){
					return;
				}
		 
		 		let data = res.data;
				if(data.success==true){
					resolve(data);
				}else{
					reject(data);
				}
				
		}
		option.fail = (res) => {
			console.log(res);
			InterfaceUtils.showToast("请求失败");
		}


		wx.request(option);
	}
	return new Promise(t);
}

}


export default new Request();