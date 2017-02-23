var mongoose = require('mongoose');

//var db = mongoose.connect('mongodb://127.0.0.1:27017/xzyMongo');

var articleSchema = new mongoose.Schema({
    title:String,
    content:String,
    img:String,
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},//类型是主键类型，引用是user
    createAt:{type:Date,default:Date.now}
});

var articleModel = mongoose.model('article',articleSchema);

module.exports = articleModel;