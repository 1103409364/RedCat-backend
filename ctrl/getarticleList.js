const Article = require('../models/Article');

module.exports = (req, res) => {
    // 每页的条数
    const onePage = 4;
    const page = req.query.page;
    Article.countDocuments({})
        .then(result => {
            // 计算总页数
            let totalPage = Math.ceil(result / onePage);
            // find 查找所有，这里可以使用 sort 方法排序 1、asc为升序，-1、desc为降序。分页：跳过几页读几行
            Article.find({}).limit(onePage).skip(onePage * (page - 1))
                .then(articles => {
                    // 带上总页数
                    const data = { success: true, totalPage, data: articles }
                    res.json(data);
                })
                .catch(err => console.log(err));
        })


}