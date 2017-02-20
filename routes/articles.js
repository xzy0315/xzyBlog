var express = require('express');
var router = express.Router();

router.get('/add',function(req,res){
   res.render('article/add');
});

router.post('/add',function(req,res){
    res.send('article/add');
});


module.exports = router;
