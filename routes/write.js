const express = require('express');
const router = express.Router();
const passport = require('passport');
const saveArticle = require('../ctrl/saveArticle');

// 保存文章的接口，先验证登陆状态
router.post('/post', passport.authenticate('jwt', { session: false }), saveArticle);

module.exports = router;
