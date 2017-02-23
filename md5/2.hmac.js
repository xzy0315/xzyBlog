
var crypto = require('crypto');

var x = crypto.createHmac('md5','salt')
        .update('hello').digest('hex');

console.log(x);