import appConfig from './config.js'

let host =  appConfig.server.host;

let api={
  ApiComInfo : host+"/wxjs/auth/users/completeinfo",
  ApiSign : host+"/wxjs/auth/sign/sign",
  ApiError : host+"/wxjs/public/error/error"
}

export default api;



