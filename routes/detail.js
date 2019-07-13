const express = require('express');
const router = express.Router();
const getArticleDetail = require('../ctrl/getArticleDetail');

router.get('/article', getArticleDetail);

module.exports = router;
