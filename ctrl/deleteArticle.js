const Article = require('../models/Article');
const ObjectId = require('mongodb').ObjectId;

// 删除前校验身份？
module.exports = (req, res) => {
    const _id = ObjectId(req.body.id);
    const data = {};

    // 找到 id 对应的文章
    Article.deleteOne({ _id })
        .then(result => {
            data.success = true;
            data.deletedCount = result.deletedCount;
            res.json(data);
            console.log(result)
        })
        .catch(err => {
            data.success = false;
            data.err = err;
            res.json(data);
            console.log(err);
        })
}

