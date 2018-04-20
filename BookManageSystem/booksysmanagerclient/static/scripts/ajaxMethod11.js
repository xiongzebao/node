 "use strict";

 //前三个参数必传
 //aUrl参数传系统名字和具体路径，用','隔开，例如：aUrl='aftexam,/auth/student/doQueryExam.htm'
 //datatype服务器数据返回数据类型
 //data发送到服务器的数据
 //requestType请求方法
 //callback成功的回调函数
var ajaxMethod={
	//协议根据环境不同手动切换
	protocol:"",
	//域名根据环境不同手动切换
	domain:"",

	system:'',
	path:'',
	url:'',
	uuid:'',
	ticket:'',
	platformType:'',
	// platform:'',
	datatype:'',
	requestType:'',
	init:function(){
		this.paramqs();
		this.judgmentDomain();
		//this.ticket=this.getCookie('ticket');
	},

	// 手机端检测
	isPc:function(){
		var userAgentInfo = navigator.userAgent.toLowerCase();
		var Agents = ["yks_andr","yks_ios"];
		var Pflag = true;
		for (var v = 0; v < Agents.length; v++) {
			if (userAgentInfo.indexOf(Agents[v]) >=0) {
				Pflag = false;
				break;
			}
		}
		return Pflag;
	},
	// 判断域名
	judgmentDomain:function(){
		//var lProtocol=window.location.protocol;
		// if(lProtocol=="https:"){
		// 	this.protocol='https://';
		// 	this.domain='.artstudent.cn';
		// }else {
		// 	this.protocol='http://';
		// 	this.domain='.51bm.net.cn';
		// }
		if(window.location.href.indexOf('artstudent')!=-1){
			this.protocol='https://';
			this.domain='.artstudent.cn';
		}else{
			this.protocol='http://';
			this.domain='.51bm.net.cn';
		}
	},
	// 获取cookie方法
	getCookie:function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			// 隐身模式和非隐身模式下获取的ticket不一样，非隐身模式下的ticket为""sd*****DFGdfgdds""
			if(arr[2].substring(0,1)=='"'){
				var ptit=arr[2].replace(/"/g,'');
				return unescape(ptit);
		};
			return unescape(arr[2]);
		}else{
			return null;
		}
	},

	paramqs:function(){
//        alert('我要执行yksapp')
        
                if(!this.isPc()){
                this.uuid=yksapp.getUUID();
                this.ticket=yksapp_user.getTicket();
                this.platformType = yksapp.getPlatformType();//   TODO  新版本改回来
                // this.platformType = 1;
            }else{
                this.ticket=this.getCookie('ticket');
                this.platformType = 1;
            }
      
		
//        alert('yksapp执行完毕')
	},
	in_array:function(needle, haystack) {
	    for(var d in haystack) {
		    if(haystack[d] == needle) {
		    	return true;
		    }
	    }
	    return false;
    },

    getHlqUrl:function(){
    	return this.protocol+"tpl"+this.domain+"/hlq";
    },
	doAjax:function(aUrl,data,callback,completeFun,datatype,requestType){
        
		this.paramqs();
		this.judgmentDomain();//获取域名和协议
		var that=this;
		var Params=data;
		var paramUrl=aUrl.split(',');
		var asd=arguments;
		this.system=paramUrl[0];
		this.path=paramUrl[1];
		this.url=this.protocol+this.system+this.domain+this.path;
	    // 手机端获取ticket和uuid
		//$.extend(Params,{ticket:this.ticket});
		// if( !that.ticket && !this.isPc()){
		// 	// window.localObj.goLogin();
		// 	yksapp.goPageWithParams("login",null)
		// 	return;
		// }
		// 参数判断
		var dataTyList=['json', 'jsonp', 'xml', 'html', 'text'];
		if(!arguments[3]){
			this.datatype="json";
			this.requestType='POST';
		};
		if(!!arguments[3] && typeof arguments[3]=="function"){
			this.datatype="json";
			this.requestType='POST';
			// if(!this.in_array(arguments[3],dataTyList)){
			// 	throw 'The third parameter should be the data type';
			// }
		};
		if(!arguments[4]){
			this.datatype="json";
			this.requestType='POST';
		};
		if(!!arguments[4]){
			this.requestType='POST';
			if(!this.in_array(arguments[4],dataTyList)){
				throw 'The fouth parameter should be the data type';
			}
		};
		if(!!arguments[5]){
			this.requestType=arguments[5];
			if(!this.in_array(arguments[4],dataTyList)){
				throw 'The fouth parameter should be the data type';
			}
		};
		$.ajax({
			url:this.url,
			type:this.requestType,
			dataType:this.datatype,
			data:{data:JSON.stringify({m:"",p:Params}),ticket:that.ticket},
			timeout:60000,
			beforeSend:function(request){
				
				// 手机端设置请求头
				if(!that.isPc()){
					request.setRequestHeader("udid",that.uuid);
				}
				// pc和移动都设置tkn
				request.setRequestHeader("tkn","yx001");
				request.setRequestHeader("platformType",that.platformType);
	        },
	        success:function(datas){
	        	
	        	var dataq = {};
				if (typeof datas == "string"){
					dataq = JSON.parse(datas);
				} else if (typeof datas == "object") {
					dataq = datas;
				}
	        	callback(dataq);
	        },
	        complete:function(xhr, status){
	        	if(typeof asd[3]=="function"){
		        	completeFun();
	        	}
	        },
	        error:function(xhr, errorType, error){
	        	//alert(error);
	        	//alert(errorType);
	        }
		})
	}
};
ajaxMethod.init();