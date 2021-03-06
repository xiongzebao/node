import appConfig from './config.js'

let host =  appConfig.server.host;

let api={
  ApiComInfo : host+"/wxjs/public/users/completeinfo",
  ApiSign : host+"/wxjs/auth/sign/sign",
  ApiError : host+"/wxjs/public/error/error",
  ApiLogin:host+"/wxjs/public/users/login",
  ApiQueryAllSignInfo:host+"/wxjs/auth/sign/queryallsigninfo",
  ApiQueryLast3Days:host+"/wxjs/auth/sign/querylast3days",
  ApiSignQuery:host+"/wxjs/auth/sign/query",//
  ApiInfoQueryList:host+"/wxjs/public/info/querylist",//资讯列表
   ApiInfoQueryDetail:host+"/wxjs/public/info/query",//资讯详情

}

export default api;



