const Article = require('../models/Article');
// const isEmpty = require('../validation/is-empty');

module.exports = (req, res) => {
    // 每页的条数
    const onePage = 4;
    const page = req.query.page;
    // 获取查询字符串
    const searchStr = req.query.search;
    // console.log(isEmpty(search))
    // 不用管查询字符串是不是空
    const searchReg = new RegExp(searchStr, 'gi');
    // 从 title 或者正文中查找, 使用正则进行模糊查询
    const searchObj = { $or: [{ title: searchReg }, { text: searchReg }] };

    Article.countDocuments(searchObj)
        .then(result => {
            // 计算总页数
            let totalPage = Math.ceil(result / onePage);
            // find 查找所有，这里可以使用 sort 方法排序 1、asc为升序，-1、desc为降序。
            // 分页：跳过几页读几行
            Article.find(searchObj).limit(onePage).skip(onePage * (page - 1))
                .then(results => {
                    // 筛选需要的数据，减少数据量，列表页不需要正文详情
                    const articles = results.map(item => {
                        return {
                            title: item.title,
                            desc: item.desc,
                            date: item.date,
                            updateDate: item.updateDate,
                            author: item.author,
                            _id: item._id
                        };
                    });

                    // 带上总页数
                    const data = { success: true, totalPage, articles };
                    res.json({ data });
                })
                .catch(err => {
                    console.log(err);
                    const data = { success: false, err };
                    res.json({ data });
                });
        });
};

