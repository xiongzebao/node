import  InterfaceUtils from './InterfaceUtils.js'
 
class CommenUtils{
	isEmpty(object) {
		if (!object) {
			return true;
		}

		if (object instanceof Array) {
			if (object.length == 0) {
				return true;
			}
		}

		var arr = Object.keys(object);
		if (arr.length == 0) {
			return true;
		}
		return false;
	}
	contains(object, keys) {
		if (this.isEmpty(object) || this.isEmpty(keys)) {
			return false
		}
		if (typeof(keys) === "string") {
			if (!object.hasOwnProperty(keys)) {
				return false
			}
		}

		if (Array.isArray(keys)) {
			for (var i=0 ; i<keys.length;i++) {
				let t = keys[i];
				console.log(t);
				if (!object.hasOwnProperty(keys[i])) {
					return false;
				}
			}
		}
		
		return true;
	}

	//发送错误到服务端
	sendError(e){
		let option = {
			data:e,
			url:api.ApiError,
			method:"post",
			success:function(data){
				console.log(data)
			}
		}
		wx.request(option)
	}

	

	getUserInfo(cb) {
		console.log("getUserInfo")
      // 查看是否授权
      wx.getSetting({
      	success: function(res) {
      		console.log("woooo")
      		if (res.authSetting['scope.userInfo']) {
      			console.log(" fdfdf")
      			wx.getUserInfo({
      				success(res) {
      					cb&&cb(res.userInfo) 
      				}
      			})
      		}else{
      			console.log("请授权登录")
      			InterfaceUtils.showToast("请授权登录")
      		}
      	}
      })
  }

}

export default new CommenUtils();