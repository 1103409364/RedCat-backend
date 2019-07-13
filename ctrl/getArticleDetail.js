const Article = require('../models/Article');
const ObjectId = require('mongodb').ObjectId;

module.exports = (req, res) => {
    const _id = ObjectId(req.query.id);
    // 找到 id 对应的文章
    Article.findOne({ _id })
        .then(articles => {
            const data = { success: true, data: articles }
            res.json(data);
        })
}