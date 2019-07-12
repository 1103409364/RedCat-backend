const Article = require('../models/Article');

module.exports = (req, res) => {
    // find 不传参数就是查找所有
    Article.find()
        .then(articles => {
            const data = {success: true, data: articles}
            // console.log(articles)
            res.json(data);
        })
    
}