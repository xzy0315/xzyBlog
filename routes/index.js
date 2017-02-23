var express = require('express');
var articleModel = require('../model/article');
var router = express.Router();
var markdown = require('markdown').markdown;

/* GET home page. */
router.get('/', function(req, res, next) {
  //第二个参数对象最后会合并到res.locals对象上，并渲染模板
  //先配置参数，然后再执行查询
  articleModel.find().populate('user').exec(function(err,articles){
      if(err){
          req.flash('error',err);
          res.redirect('/');
      }else{

          articles.forEach(function(article){
              article.content = markdown.toHTML(article.content);
          });

          res.render('index',{articles:articles,user: req.session.user});
      }
  });

});

module.exports = router;
