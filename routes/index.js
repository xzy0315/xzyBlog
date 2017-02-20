var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //第二个参数对象最后会合并到res.locals对象上，并渲染模板
  res.render('index', { user: req.session.user});
});

module.exports = router;
