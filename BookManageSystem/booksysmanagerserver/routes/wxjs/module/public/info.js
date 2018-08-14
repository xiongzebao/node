var express = require('express');
var router = express.Router();
var path = require("path");
const rootPath = path.dirname(require.main.filename);;
let {
	RespBaseData,
	Resolve,
     Page
} = require(rootPath + "/model/CommenModel.js")
let infoDao = require(rootPath + "/dao/info.js")
let utils = require(rootPath + "/public/javascripts/utils")
let resUtils = require(rootPath + "/public/javascripts/resUtils")
let db = require(rootPath + "/db/dbUtils.js")

router.route('/index').post(function(req, res, next) {
     let t=!utils.isEmpty(req.body)?req.body:req.query;

});


//查询资讯详情
router.route('/query').post(function(req, res, next) {
	let param = req.body;
	console.log(param);

     infoDao.query(param).then((data)=>{
     	console.log(data);
     	if(utils.isEmpty(data)){
     		resUtils.sendData(res,Resolve.fail("资讯不存在"));
     		return;
     	}
       resUtils.sendData(res,Resolve.success({obj:data[0]}));
  }).catch((e)=>{
    next(e);
});	 
});

//查询资讯列表
router.route('/querylist').post(function(req, res, next) {
     console.log(req.body.curPage)
     if(typeof(req.body.curPage)== "undefined"){

          infoDao.queryList().then((data)=>{
               console.log(data);
               resUtils.sendData(res,Resolve.success({list:data}));
          }).catch((e)=>{
               next(e);
          });  
     }else{
         infoDao.queryList(req.body).then(async (data)=>{
          console.log(data);
          var page  = new Page();
          page.dataList = data;
          page.curPage = req.body.curPage;
       
          page.totalPage = await db.getTotalPage("info");
          page.totalSize = await db.getTotalSize("info");
          if(page.curPage<page.totalPage){
               page.nextPage=true;
          }else{
               page.nextPage=false;
          }
          resUtils.sendData(res,Resolve.success({"page":page}));
     }).catch((e)=>{
          next(e);
     });  
}




});



router.route('/insert').post(function(req, res, next) {
	let param = req.body;
   infoDao.insert(param).then((data)=>{
      resUtils.sendData(res,Resolve.success("添加成功"));
 }).catch((e)=>{
  next(e);
});
});




module.exports = router;