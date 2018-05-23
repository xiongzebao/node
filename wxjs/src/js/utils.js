Array.prototype.contains = function(element) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == element) {
			return true;
		}
	}
	return false;
}
Date.prototype.format = function(fmt) { 
     var o = { 
        "M+" : this.getMonth()+1,                 //月份 
        "d+" : this.getDate(),                    //日 
        "h+" : this.getHours(),                   //小时 
        "m+" : this.getMinutes(),                 //分 
        "s+" : this.getSeconds(),                 //秒 
        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
        "S"  : this.getMilliseconds()             //毫秒 
    }; 
    if(/(y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
    }
     for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
         }
     }
    return fmt; 
}





let utils = {
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
	},

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

}

module.exports = utils;