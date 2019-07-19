const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    // mark 之后的 html 文本
    html: {
        type: String,
        required: true
    },
    // 原文
    text: {
        type: String,
        required: true
    },
    // 文章简介
    desc: {
        type: String,
        required: true
    },
    // 发布日期，保存时间戳，数字形式，在前端进行格式化
    date: {
        type: Number,
        default: Date.now()
    },
    // 修改日期
    updateDate: {
        type: Number,
        default: Date.now()
    },
    // 作者
    author: {
        type: String,
    }
});

// 静态方法,将上传的数据保存到数据库
ArticleSchema.statics.saveToDB = (article) => {
    const at = new Article({
        'title': article.title,
        'html': article.html,
        'text': article.text,
        'desc': article.desc,
        'author': article.author
    });
    // 返回一个 promise 对象
    return at.save();
};

ArticleSchema.statics.updateArticle = (newArticle) => {
    this.find({ '_id': newArticle })
        .then(article => {
            // this.update
        });
    // const at = new Article({
    //     'title': article.title,
    //     'html': article.html,
    //     'text': article.text,
    //     'desc': article.desc,
    //     'author': article.author
    // });
    // 返回一个 promise 对象
    // return at.save();
};

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;

