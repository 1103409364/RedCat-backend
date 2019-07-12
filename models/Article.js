const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    html: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    // 发布日期
    date: { 
        type: Date,
        default: Date.now()
    },
    // 修改日期
    updateDate: { 
        type: Date,
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
        'author': article.author
    });
    // 返回一个 promise 对象
    return at.save();
}

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;

