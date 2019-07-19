const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: { // 头像地址
        type: String
    },
    date: { // 注册日期
        type: Date,
        default: Date.now()
    },
    code: { // 激活码,用来邮件激活账号,随机生成一个
        type: Number,
        default: parseInt(Math.random() * 10000, 10)
    },
    indate: { // 激活码过期时间,默认 30 分钟
        type: Number,
        default: Date.now() + 30 * 60 * 1000
    },
    islive: { // Email 是否已激活
        type: Boolean,
        default: false
    }
});

// 静态方法,将上传的数据保存到数据库
// userSchema.statics.saveToDB = (userInfo) => {
//     const us = new User({
//         'name': userInfo.account,
//         'password': userInfo.password,
//     });

//     us.save();
// }

const User = mongoose.model('User', UserSchema);

module.exports = User;

