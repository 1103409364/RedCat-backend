const Article = require('../models/Article');
const ObjectId = require('mongodb').ObjectId;

// 删除前校验身份？
module.exports = (req, res) => {
    const _id = ObjectId(req.body.id);
    const data = {};
    // 这个接口使用 passport 验证, 所以 req 中可以取得 token 中的用户信息 req.user
    // 比对当前登陆的用户名和作者的名字是否相同, 如果不相同就返回失败
    // console.log(req.user)
    const userName = req.user.name;
    // 找到 id 对应的文章
    Article.findOne({ _id })
        .then(article => {
            if (userName === article.author) {
                Article.deleteOne({ _id })
                    .then(result => {
                        data.success = true;
                        data.deletedCount = result.deletedCount;
                        res.json(data);
                        console.log(result);
                    })
                    .catch(err => {
                        data.success = false;
                        data.err = err;
                        res.json(data);
                        console.log(err);
                    });
            } else {
                data.success = false;
                res.json(data);
            }
        })
        .catch(err => {
            data.success = false;
            data.err = err;
            res.json(data);
            console.log(err);
        });
};

