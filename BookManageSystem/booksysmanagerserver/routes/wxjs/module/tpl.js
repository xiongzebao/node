var express = require('express');
var router = express.Router();
 const rootPath = path.dirname(require.main.www);;
let {
	RespBaseData,
	Resovle
} = require(rootPath + "/model/CommenModel.js")
let signDao = require(rootPath + "/dao/sign.js")
let utils = require(rootPath + "/public/javascripts/utils")
let resUtils = require(rootPath + "/public/javascripts/resUtils")

router.route('/index').post(function(req, res, next) {
let t=!utils.isEmpty(req.body)?req.body:req.query;
});



module.exports = router;