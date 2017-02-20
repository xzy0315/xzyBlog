var express = require('express');
var router = express.Router();

router.get('/reg',function(req,res){
   res.render('user/reg');
});

router.post('/reg',function(req,res){
    res.send('reg');
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
