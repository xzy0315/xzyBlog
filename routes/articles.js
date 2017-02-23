var express = require('express');
var articleModel = require('../model/article');
var router = express.Router();
var multer = require('multer');
//指定文件元素的存储方式
var storage = multer.diskStorage({
    //保存的目标路径
    destination: function (req, file, cb) {
        cb(null, '../public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+'.'+file.mimetype.split('/')[1]);
    }
})

var upload = multer({ storage: storage })

router.get('/add',function(req,res){
   res.render('article/add');
});

router.post('/add',upload.single('img'),function(req,res){

    var article = req.body;
    if(req.file){
        console.log(req.file)
        article.img = '/images/'+req.file.filename;
    }
    var user = req.session.user;
    article.user = user;//保存的是个对象，但存进数据库中的是id字符串
    articleModel.create(article,function(err,article){
       if(err){
         req.flash('error','发表文章失败');
         return res.redirect('back');
       }else{
           req.flash('success','发表文章成功');
           return res.redirect('/');
       }
    });

});


module.exports = router;
