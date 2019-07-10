const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    bannerImg: {
        type: Object,
        required: true
    },
    articleList: [{
        id: Number,
        author: Number,
        title: String,
        desc: String
    }]
});

// 静态方法,将上传的数据保存到数据库
// HomeSchema.statics.saveToDB = (homeInfo) => {
//     const us = new Home({
//         'bannerImg': homeInfo
//     });

//     us.save();
// }

const Home = mongoose.model('Home', HomeSchema);

module.exports = Home;

