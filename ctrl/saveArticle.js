const Article = require('../models/Article');
const ObjectId = require('mongodb').ObjectId;

module.exports = (req, res) => {
    const article = req.body;
    const data = {};
    const author = article.author;
    const articleId = article.id;
    // console.log(req.body);
    // 拦截未激活用户，验证用户是否激活，用户信息应该从 token 中读取
    // 这个接口使用 passport 验证过, 已经解析了token, 所以 req 中可以取得 token 中的用户信息 req.user
    if (req.user.name === author) {
        // 文章id为空的时候, 删除 id 属性, 保存文章
        if (articleId === '') {
            delete article.id;
            Article.saveToDB(article)
                .then((result) => {
                    // result 是新建的 article 对象
                    data.success = true;
                    data.result = result;
                    res.json(data);
                }, err => {
                    data.success = false;
                    data.err = err;
                    res.json(data);
                }).catch(err => {
                    data.success = false;
                    data.err = err;
                    res.json(data);
                });
        } else {
            const _id = ObjectId(articleId);
            Article.updateOne({ _id }, {
                'title': article.title,
                'html': article.html,
                'text': article.text,
                'desc': article.desc,
                'updateDate': Date.now()
            })
                .then(result => {
                    data.success = true;
                    data.result = result;
                    res.json(data);
                })
                .catch(err => {
                    data.success = false;
                    data.err = err;
                    res.json(data);
                })
        }

    } else {
        data.success = false;
        res.json(data);
    }
}