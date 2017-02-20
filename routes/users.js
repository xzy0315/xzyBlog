var express = require('express');
var router = express.Router();
var userModel = require('../model/user')

router.get('/reg',function(req,res){
   res.render('user/reg');
});

router.post('/reg',function(req,res){

    var user = req.body;
    userModel.create(user,function(err,doc){
        if(err){
            res.redirect('back');//返回到上一个页面
        }else{
            res.redirect('/');//返回到上一个页面
        }
    });

});


router.get('/login',function(req,res){
    res.render('user/login');
});

router.post('/login',function(req,res){
    res.send('login');
});

router.get('/out',function(req,res){
    res.render('user/out');
});

module.exports = router;
