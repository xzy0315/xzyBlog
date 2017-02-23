var express = require('express');
var path = require('path');
//处理收藏夹图标
var favicon = require('serve-favicon');
//写日志的
var logger = require('morgan');
//解析cookier的   req.cookie方法用来设置cookie    req。cookies
var cookieParser = require('cookie-parser');
//解析请求体 req.body
var bodyParser = require('body-parser');
//根据请求的路径不同，进行不同的处理
var index = require('./routes/index');
var users = require('./routes/users');
var articles = require('./routes/articles');
//添加 req.session
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);

var flash = require('connect-flash');

var app = express();

// 设置模板文件的存放路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'html');
//设置一下对于html格式的文件，渲染的时候委托ejs的渲染
app.engine('html',require('ejs').renderFile);
//启动是连接数据库
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/xzyMongo');
app.use(session({
    secret:'xzyBlog',
    resave:false,
    saveUninitialized:true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(flash());//依赖session

// uncomment after placing your favicon in /public
//需要把收藏夹的图标文件放在public下面。就可以去下下面的注释
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//静态文件服务中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req,res,next){
   //res.locals 才是真正的渲染模板对象
   res.locals.user = req.session.user;
   res.locals.success = req.flash('success').toString();
   res.locals.error = req.flash('error').toString();
   next();
});


app.use('/', index);
app.use('/users', users);
app.use('/articles', articles);

// catch 404 and forward to error handler
//捕获404的错误并且转发到错误处理中间件去
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
//开发环境的错误处理，将打印出错的调用堆栈
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err+err.message : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
