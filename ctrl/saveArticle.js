const Article = require('../models/Article');
const User = require('../models/User');

module.exports = (req, res) => {
    const article = req.body;
    const data = {};
    const author = article.author;
    
    // 拦截未激活用户，验证用户是否激活，用户信息应该从 token 中读取？
    User.findOne({ name: author }).then(user => {
        if (user.name === author) {
            // console.log(user.name);
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
                    close.log(err);
                });
        } else {
            data.success = false;
            res.json(data);
        }
    }).catch(err =>{
        close.log(err);
    })


}