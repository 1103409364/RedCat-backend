const mongoose = require('mongoose');
const config = require('./db');

// 连接本地数据库 rr-blog
module.exports = function() {
    mongoose.connect(config.DB, { useNewUrlParser: true }).then(
        () => { console.log('Database is connected') },
        err => { console.log('Can not connect to the database' + err) }  // 错误处理
    );
}