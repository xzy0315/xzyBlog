
var crypto = require('crypto');
console.log(crypto.getHashes());
var s = crypto.createHash('md5')
    .update('我最帅')
    .digest('hex');//加成hex 十六进制 变成数字
console.log(s)