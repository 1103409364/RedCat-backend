const express = require('express');
const router = express.Router();
const passport = require('passport');
const getArticleDetail = require('../ctrl/getArticleDetail');
const deleteArticle = require('../ctrl/deleteArticle');
// 详情页接口
router.get('/article', getArticleDetail);
// 删除文章的接口，先验证登陆状态
router.delete('/delete', passport.authenticate('jwt', { session: false }), deleteArticle);

module.exports = router;
