var express = require('express');
var router = express.Router();
var userModel = require('../model/user')
var validate = require('../middle/index.js');
var crypto = require('crypto');

router.get('/reg',validate.checkNotLogin,function(req,res){
   res.render('user/reg');
});

router.post('/reg',validate.checkNotLogin,function(req,res){

    var user = req.body;
    user.password = md5(user.password);
    console.log(user);
    user.avatar = 'https://secure.gravatar.com/avatar/'+md5(user.email);
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

    var user = req.body;
    user.password = md5(user.password);
    console.log(user);
    userModel.findOne(user,function(error,user){
        if(error || user == null){
            req.flash('error','登陆出错');
            res.redirect('back');
        }else{
            req.session.user = user;//存到user属性
            req.flash('success','登陆成功');
            res.redirect('/');
        }
    });

});

router.get('/out',validate.checkLogin,function(req,res){
    req.session.user = null;
    res.redirect('/');
});

module.exports = router;


function md5(str){
    return crypto.createHash('md5')
        .update(str)
        .digest('hex');
}