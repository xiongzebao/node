var express = require('express');
var router = express.Router();
const rootPath = process.cwd();

var commenModelPath = rootPath + "/model/CommenModel.js";
var dbUtils = rootPath + "/db/dbUtils.js";
var utilsPath = rootPath + "/public/javascripts/utils"

let {
	RespBaseData
} = require(commenModelPath)
let db = require(dbUtils)
let utils = require(utilsPath)


router.route('/index').post(function(req, res, next) {

});






module.exports = router;