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
   res.render('article/add',{article:{}});
});

router.post('/add',upload.single('img'),function(req,res){

    var article = req.body;
    if(article._id){

        var updateSet = {title:article.title,content:article.content};
        if(req.file){
            updateSet.img = '/images/'+req.file.filename;
        }

        articleModel.update({_id:article._id},{$set:updateSet},function(err,article){
            if(err){
                req.flash('error','修改失败');
                res.redirect('back');
            }else{
                req.flash('success','修改成功');
                res.redirect('/');
            }
        });

    }else{
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
    }

});

router.get('/detail/:_id',function(req,res){

    articleModel.findById(req.params._id,function(err,article){

        res.render('article/detail',{article:article});

    });

});

router.get('/delete/:_id',function(req,res){

    articleModel.remove({_id:req.params._id},function(err,result){

        if(err){
            req.flash('error','删除失败');
            res.redirect('back');
        }else{
            req.flash('success','删除成功');
            res.redirect('/');
        }

    });

});


router.get('/update/:_id',function(req,res){

    articleModel.findById(req.params._id,function(err,article){

        res.render('article/add',{article:article});

    });

});

module.exports = router;
