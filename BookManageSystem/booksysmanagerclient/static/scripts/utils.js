

var utils={

 setKeyValue:function(key,value){
  var strdata = JSON.stringify(value);
  if(typeof(window.yksapp)!="undefined"){
    window.yksapp.setKeyValue(key, strdata);
  }else{
    window.localStorage.setItem(key,strdata);
  }
},

getValueByKey:function(key){
  var strdata="";
  if(typeof(window.yksapp)!="undefined"){
   strdata= window.yksapp.getValueByKey(key);
 }else{
  strdata = window.localStorage.getItem(key);
}
return JSON.parse(strdata);
},

isEmptyObject:function(obj){
 for(var key in obj){
   return false;
 }
 return true;
},

addImagePrint:function(content){

  var tt= content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {

    var m=  match.replace(capture,capture+'?x-oss-process=image/resize,w_1024/watermark,image_d2F0ZXJtYXJrLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxwXzYwL2JyaWdodCwwL2NvbnRyYXN0LDA,t_100,g_se,y_10,x_5,bucket_art-stu');

    return m;
  });

  return tt;
},

compressImage:function(content,width){
  var tt= content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, function (match,capture) {
    var m=  match.replace(capture,capture+'?x-oss-process=image/resize,w_'+width);

    return m;
  });  
  return tt;
},

IsPC:function() {
 var userAgentInfo = navigator.userAgent;
 var Agents = ["Android", "iPhone",
 "SymbianOS", "Windows Phone",
 "iPad", "iPod"];
 var flag = true;
 for (var v = 0; v < Agents.length; v++) {
  if (userAgentInfo.indexOf(Agents[v]) > 0) {
   flag = false;
   break;
 }
}
return flag;
},

   // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口

   weixinshareConfig:function(signatureMap,title,desc,imgUrl){

    wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId:signatureMap.appId, // 必填，公众号的唯一标识
          timestamp: signatureMap.timestamp, // 必填，生成签名的时间戳
          nonceStr: signatureMap.nonceStr, // 必填，生成签名的随机串
          signature: signatureMap.signature,// 必填，签名，见附录1
          jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });


    wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              //  alert(JSON.stringify(res));
            }
          });

    var _this = this;
    wx.ready(function (){
                //imgUrl对应的分享图标目前只支持32k以下图片，而且不支持png图片
                wx.onMenuShareTimeline({
                    title:title, // 分享标题
                    desc:desc, // 分享描述
                    link: window.location.href,
                    imgUrl: imgUrl, // 分享图标
                    trigger: function (res) {
                       //alert("点击分享：" +JSON.stringify(res));
                     },
                     success: function () { 
                     // console.log("分享成功");
                     // 用户确认分享后执行的回调函数
                      //alert("朋友圈 回调成功"); 
                    },
                    cancel: function () { 
                     // 用户取消分享后执行的回调函数
                      //  alert("朋友圈 取消回调");
                    },
                    fail:function(res){
                   //  alert('分享失败');
                    // alert(JSON.stringify(res));
                  }

                });

          //       // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
          wx.onMenuShareAppMessage({
                    title:title, // 分享标题
                    desc:desc, // 分享描述
                    link: window.location.href,
                    imgUrl:imgUrl, // 分享图标
                    type:'link',
                    trigger: function (res) {
                      //  alert("点击分享ShareAppMessage：" +JSON.stringify(res));
                       // console.log(JSON.stringify(res));
                     },
                     success: function () { 
                     // 用户确认分享后执行的回调函数
                     //  alert("ShareApp 回调成功"); 
                     //  console.log("ShareApp 回调成功" );
                   },
                   cancel: function ( ) { 
                        // 用户取消分享后执行的回调函数
                       //  alert("ShareApp 取消回调");
                       //  console.log("ShareApp 取消回调");

                     },
                     fail:function(res){
                    //  console.log(JSON.stringify(res));
                  //   alert('分享失败');
                    // alert(JSON.stringify(res));
                  }

                });


          wx.error(function(res){
                  //  console.log(res);
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
                 //   alert('配置失败');
                 //   console.log(JSON.stringify(res));
                   // alert(JSON.stringify(res));
                 });
        });
  },

  weixinshare:function(title,desc,imgUrl){
    var url="hulaquan,/api/m/base/share/v3/shareSign.htm";
    var p = {"url": location.href.split('#')[0]};
    var _this = this;
    ajaxMethod.doAjax(url,p,function(data){
      _this.weixinshareConfig(data.datas.signatureMap,title,desc,imgUrl);

    });
  }

}






class Request {

  constructor(){
   this.config={
    type:"post",
    dataType:"json",
  }
  this.rootUrl="http://localhost:4000";
}

addConfigParam(header){
  this.config = {...header,...this.config}
}

request(url,data){
 this.config.url=this.rootUrl+url;
 this.config.data=data;
 this.doRequest(this.config);
}

beforeSend(beforeSend){
  this.beforeSend = beforeSend;
  return this;
}
error(err){
  this.error=err;
  return this;
}

success(success){
  this.success = success;
  return this;
}

complete(complete){
  this.complete=complete;
  return this;
}

doRequest(config,callback){
 let _this = this;
 $.ajax({
  ...config,
  timeout: 5000,
  context: $('body'),
  beforeSend: function(xhr, settings){
    if(_this.beforeSend){
      _this.beforeSend(settings);
    }
  },
  success: function(data){

    //服务端只会在开发环境返回此字段，生产环境不会返回此字段
    if(data&&data.debugInfo){
      console.log(data);
      alert(data.debugInfo);
      return;
    }

    if(_this.success){
     _this.success(data);
   }
 },
 error: function(xhr, type){
  if(_this.error){
   _this.error(type);
 }
},
complete:function(xhr, status){
  if(_this.complete){
   _this.complete(status);
 }
}
})

}

/*
config；以键值对的形式设置请求配置信息，
*/
static instance(config){
 let request = new Request();
 if(config){
   request.addConfigParam(config);
 }
 return  request;
}


}








