import InterfaceUtils from './InterfaceUtils'

function intercept(res) {
	let data = res.data;
	//如果服务端发生500错误
	if (data.code == 500) {
		//如果是线上
		if (true) {
			let error = data.message;
			console.log(`error ${error}`)
			let option = {
				title: error,
				duration: 10000,
				mask: false
			}
			InterfaceUtils.showToast(option)
		} else {
			InterfaceUtils.showToast("系统繁忙")
		}
		return true;
	}
	//用户未完善信息时统一跳转到完善用户信息页面
	if (data.success == false && data.code == "login:not_complete_userinfo") {
		wx.setStorageSync("openid", data.datas.openid);

		wx.navigateTo({
			url: '../index/completeUserInfo'
		})
		return true;
	}
	return false;
}


export default intercept;