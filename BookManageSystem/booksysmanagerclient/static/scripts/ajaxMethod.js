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
		var lProtocol=window.location.protocol;
		if(lProtocol=="https:"){
			this.protocol='https://';
			this.domain='.artstudent.cn';
		}else {
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
    iosAjax:function(aUrl,data,callback,completeFun,datatype,requestType,errorFun){
        var that=this;
        this.paramqs();
		this.judgmentDomain();//获取域名和协议
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
		// var inner_style="position:fixed;top:50%;left:50%;margin-left:-.5rem;margin-top:-.5rem;border-width:2px;border-style:solid;border-color:#5DC596;width:1rem;height:1rem;border-radius:50%;border-bottom-color:transparent;border-top-color:transparent;"
		// var loadIngA="<div class='loremlorem' style='z-index:10000;position:fixed;top:0;bottom:0;right:0;left:0;background:rgba(0,0,0,.2)'></div><div class='lorem-inner' style="+inner_style+"></div>";
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
		if(!!arguments[6]){
			this.datatype=arguments[4];
			this.requestType=arguments[5];
		}
		var checkLogin=true;
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
	        	// $(".loremlorem").remove();
	        	// $(".lorem-inner").remove();
	        	var dataq = {};
				if (typeof datas == "string"){
					dataq = JSON.parse(datas);
				} else if (typeof datas == "object") {
					dataq = datas;
				}
				// 用户的ticket已失效或者没有登录
				if(!datas.success && datas.code=='011'){
					// yksapp.goPageWithParams("login", null);
					// return;
					checkLogin=false;
				}
	        	callback(dataq);
	        },
	        complete:function(xhr, status){
	        	//用户切换账号后ticket在APP里面没有立即清除，但是，
	        	//此时的ticket已经是无效的ticket，关闭webPage并跳转到原生登录界面
	        	//接口是否身份验证判断
	        	var  identity=new RegExp("m/auth");
	        	if(!identity.test(that.url)){
	        		
	        	}else{
	        		if(!checkLogin && !that.isPc()){
		        		yksapp.closeWebPage(); 
		        		yksapp.goPageWithParams("login", null);
		        		return;
		        	}
	        	}
	        	if(typeof asd[3]=="function"){
		        	completeFun();
	        	}
	        },
	        error:function(xhr, errorType, error){
	        	if(typeof asd[6]=="function"){
	        		errorFun();
	        	}
	        }
		})
    },
	doAjax:function(aUrl,data,callback,completeFun,datatype,requestType,errorFun){
		 var that=this;
         if(this.isPc()){
             this.iosAjax(aUrl,data,callback,completeFun,datatype,requestType,errorFun);
         }else{
             var timer=setInterval(function(){
                  if((window.yksapp)&&(window.yksapp_user)){
                         /* 清除定时器*/
                      timer && clearInterval(timer);
                      that.iosAjax(aUrl,data,callback,completeFun,datatype,requestType,errorFun);
                  }
             },100)
         }
       
//        this.paramqs();
//		this.judgmentDomain();//获取域名和协议
//		var Params=data;
//		var paramUrl=aUrl.split(',');
//		var asd=arguments;
//		this.system=paramUrl[0];
//		this.path=paramUrl[1];
//		this.url=this.protocol+this.system+this.domain+this.path;
//	    // 手机端获取ticket和uuid
//		//$.extend(Params,{ticket:this.ticket});
//		// if( !that.ticket && !this.isPc()){
//		// 	// window.localObj.goLogin();
//		// 	yksapp.goPageWithParams("login",null)
//		// 	return;
//		// }
//		// 参数判断
//		var dataTyList=['json', 'jsonp', 'xml', 'html', 'text'];
//		if(!arguments[3]){
//			this.datatype="json";
//			this.requestType='POST';
//		};
//		if(!!arguments[3] && typeof arguments[3]=="function"){
//			this.datatype="json";
//			this.requestType='POST';
//			// if(!this.in_array(arguments[3],dataTyList)){
//			// 	throw 'The third parameter should be the data type';
//			// }
//		};
//		if(!arguments[4]){
//			this.datatype="json";
//			this.requestType='POST';
//		};
//		if(!!arguments[4]){
//			this.requestType='POST';
//			if(!this.in_array(arguments[4],dataTyList)){
//				throw 'The fouth parameter should be the data type';
//			}
//		};
//		if(!!arguments[5]){
//			this.requestType=arguments[5];
//			if(!this.in_array(arguments[4],dataTyList)){
//				throw 'The fouth parameter should be the data type';
//			}
//		};
//		$.ajax({
//			url:this.url,
//			type:this.requestType,
//			dataType:this.datatype,
//			data:{data:JSON.stringify({m:"",p:Params}),ticket:that.ticket},
//			timeout:60000,
//			beforeSend:function(request){
//				
//				// 手机端设置请求头
//				if(!that.isPc()){
//					request.setRequestHeader("udid",that.uuid);
//				}
//				// pc和移动都设置tkn
//				request.setRequestHeader("tkn","yx001");
//				request.setRequestHeader("platformType",that.platformType);
//	        },
//	        success:function(datas){
//	        	
//	        	var dataq = {};
//				if (typeof datas == "string"){
//					dataq = JSON.parse(datas);
//				} else if (typeof datas == "object") {
//					dataq = datas;
//				}
//	        	callback(dataq);
//	        },
//	        complete:function(xhr, status){
//	        	if(typeof asd[3]=="function"){
//		        	completeFun();
//	        	}
//	        },
//	        error:function(xhr, errorType, error){
//	        	alert("请求超时");
//	        }
//		})
	}
};
$(function(){
    ajaxMethod.init();
})