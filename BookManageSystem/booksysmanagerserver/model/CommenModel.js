class RespBaseData {
	constructor(message) {
		this.success = true;

		this.message = "";
		if (typeof(message) != "undefined" && message.length != 0) {
			this.message = message;
		}
		this.code = 200;
		this.cache = true; //默认要缓存
		this.ticket = ""; //登录接口用
		this.datas = {};
	}

	setDatas(data) {
		this.datas = data;
		this.success = true;
		return this;
	}

	setCode(code){
		this.code = code;
	}

	/*
			设置成功返回的消息
	 	*/
	setMessage(message) {
		this.message = message;
		this.code = 200;
		this.success = true;
		return this;
	}


	/*
	message：逻辑错误消息，客户端用以显示的提示信息，此时code设置为250
	注：此参数只传逻辑错误消息
	*/
	setLogicError(message = "操作失败") {
		this.message = message;
		this.code = 250;
		this.success = false;
		return this;
	}

	/*
	debugInfo:服务端系统错误信息，这个只有在开发环境返回给客户端，
	用以调试，生产环境不会返回客户端此字段，此时code设置为500
	注：此参数只传系统错误消息
	*/
	setSysError(debugInfo = "系统错误") {
		var env = process.env.NODE_ENV || 'development'
		if (env === 'development') {
			this.message = 'server erro::' + debugInfo;
		}
		this.code = 500;
		this.success = false;
		return this;
	}

	static getInstance(message) {

		return new RespBaseData(message);
	}
}

class Resolve {
	constructor() {
		this.success = true;
		this.error = false;
		this.message = ""
	 
	}
	setData(data){
		this.data = data;
		return this;
	}

	data(data){
		this.data = data;
		return this;
	}

	 code(code){
		this.code = code;
		return this;
	}

	static success(data) {
		let t = new Resolve();
		if (typeof(data) === "string") {
			t.message = data;
		} else {
			t.data = data;
		}
		t.error = false;
		t.success = true;
		return t;
	}

	static fail(data) {
		let t = new Resolve();
		if (typeof(data) === "string") {
			t.message = data;
		}
		t.error = true;
		t.success= false;

		return t;

	}

	
}

exports.RespBaseData = RespBaseData;
exports.Resolve = Resolve;