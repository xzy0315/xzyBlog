var express = require('express');
var router = express.Router();
var userModel = require('../model/user')
var validate = require('../middle/index.js');

router.get('/reg',validate.checkNotLogin,function(req,res){
   res.render('user/reg');
});

router.post('/reg',validate.checkNotLogin,function(req,res){

    var user = req.body;
    userModel.create(user,function(err,doc){
        if(err){
            req.flash('error',err);
            res.redirect('back');//返回到上一个页面
        }else{
            req.session.user = doc;//存到user属性
            req.flash('success','注册成功');
            res.redirect('/');//返回到上一个页面
        }
    });

});


router.get('/login',validate.checkNotLogin,function(req,res){
    res.render('user/login');
});

router.post('/login',validate.checkNotLogin,function(req,res){
    res.send('login');
});

router.get('/out',validate.checkLogin,function(req,res){
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;
