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
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
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

const User = mongoose.model('users', UserSchema);

// 查重

module.exports = User;

