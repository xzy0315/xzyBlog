
exports.checkLogin = function(req,res,next){
    if(req.session.user){
        next();
    }else{
        req.flash('error','未登录');
        res.redirect('/users/reg');
    }
}

exports.checkNotLogin = function(req,res,next){
    if(req.session.user){
        req.flash('error','已登录');
        res.redirect('/');
    }else{
        next();
    }
}