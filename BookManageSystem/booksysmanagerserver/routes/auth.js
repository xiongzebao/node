var express = require('express');
var apiRoutes = express.Router();
apiRoutes.use(function(req, res, next) {
      res.json({ message: 'Welcome to /api' });
  /*  //检查post的信息或者url查询参数或者头信息
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // 解析 token
    if (token) {
        // 确认token
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'token信息错误.' });
            } else {
                // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // 如果没有token，则返回错误
        return res.status(403).send({
            success: false,
            message: '没有提供token！'
        });

    }*/
});

apiRoutes.post('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// 返回所有用户信息
apiRoutes.post('/users', function(req, res) {
      res.json({ message: 'Welcome to /api/users' });
 /* User.find({}, function(err, users) {
    res.json(users);
  });*/
});

apiRoutes.post('/users', function(req, res) {
      res.json({ message: 'Welcome to /api/users' });
 /* User.find({}, function(err, users) {
    res.json(users);
  });*/
});

module.exports = apiRoutes;