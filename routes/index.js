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

router.post('/search', function(req, res, next) {
    //第二个参数对象最后会合并到res.locals对象上，并渲染模板
    //先配置参数，然后再执行查询
      console.log(req.body.searchInfo);
    if(!req.body.searchInfo){
        return res.redirect('back');
    }
    var r = new RegExp(req.body.searchInfo);
    articleModel.find({title:r}).populate('user').exec(function(err,articles){
        if(err){
            req.flash('error','没有查询到响应结果');
            res.redirect('back');
        }else{
            if(articles.length != 0){
                req.flash('success','查询成功');
                articles.forEach(function(article){
                    article.content = markdown.toHTML(article.content);
                });
                res.render('index',{articles:articles,user: req.session.user});
            }else{
                req.flash('error','没有查询到响应结果');
                res.redirect('/');
            }
        }
    });

});

router.get('/search', function(req, res, next) {
    //第二个参数对象最后会合并到res.locals对象上，并渲染模板
    //先配置参数，然后再执行查询
     res.redirect('/');

});

module.exports = router;
