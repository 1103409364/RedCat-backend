const express = require('express');
const router = express.Router();
const getArticleDetail = require('../ctrl/getArticleDetail');
// 详情页接口
router.get('/article', getArticleDetail);

module.exports = router;
