var mongoose = require('mongoose');

//var db = mongoose.connect('mongodb://127.0.0.1:27017/xzyMongo');

var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});

var userModel = mongoose.model('user',userSchema);

module.exports = userModel;
