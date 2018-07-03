
//import utils from "./utils"

//let utils=require("@/js/utils.js")


class InterfaceUtils {

	/*	title 	String 	是 	提示的内容 	
	icon 	String 	否 	图标，有效值 "success", "loading", "none" 	
	image 	String 	否 	自定义图标的本地路径，image 的优先级高于 icon 	1.1.0
	duration 	Number 	否 	提示的延迟时间，单位毫秒，默认：1500 	
	mask 	Boolean 	否 	是否显示透明蒙层，防止触摸穿透，默认：false 	
	success 	Function 	否 	接口调用成功的回调函数*/

	getOption(param, defaultOption = {}) {
		let option = {};
		if (typeof(param) == 'string') {
			option.title = param;
		} else if (typeof(param) == 'object') {
			option = param
		} else {
			throw new Error(`${getOption.caller.name} 参数错误，参数只是为 string 或者 object`)
		}
		if (defaultOption && typeof(defaultOption) == 'object') {
			option = { ...defaultOption,
				...option
			}
		}
		return option;
	}

	showToast(param) {
	
	/*	if(utils.isEmpty(param)){
			return;
		}
		if(typeof(param) === "object"&&utils.isEmpty(param.title)){
			return;
		}*/
		let defaultOption = {
			title: '',
			icon: 'none',
			duration: 2000,
			mask: false
		};
		let option = this.getOption(param, defaultOption);
		wx.showToast(option)
	}
	/*
	title 	String 	是 	提示的内容
	mask 	Boolean 	否 	是否显示透明蒙层，防止触摸穿透，默认：false
	success 	Function 	否 	接口调用成功的回调函数
	fail 	Function 	否 	接口调用失败的回调函数
	complete 	Function 	否 	接口调用结束的回调函数（调用成功、失败都会执行）*/
	showLoading(param) {
		let defaultOption = {
			title: '',
			mask: false
		};

		let option
		if (param) {

			option = this.getOption(param, defaultOption);
		} else {
			option = defaultOption
		}
		wx.showLoading(option)
	}


	hideLoading() {
		wx.hideLoading();
	}

	/*	title 	String 	是 	提示的标题
	content 	String 	是 	提示的内容
	showCancel 	Boolean 	否 	是否显示取消按钮，默认为 true
	cancelText 	String 	否 	取消按钮的文字，默认为"取消"，最多 4 个字符
	cancelColor 	HexColor 	否 	取消按钮的文字颜色，默认为"#000000"
	confirmText 	String 	否 	确定按钮的文字，默认为"确定"，最多 4 个字符
	confirmColor 	HexColor 	否 	确定按钮的文字颜色，默认为"#3CC51F"
	success 	Function 	否 	接口调用成功的回调函数
	fail 	Function 	否 	接口调用失败的回调函数
	complete 	Function 	否 	接口调用结束的回调函数（调用成功、失败都会执行）*/

	
}


export default new InterfaceUtils();