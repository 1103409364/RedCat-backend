const Home = require('../models/Home');
const Article = require('../models/Article');

module.exports = (req, res) => {
    const article = req.body;
    const data = {};

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
        });
}