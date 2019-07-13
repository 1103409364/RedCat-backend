const express = require('express');
const router = express.Router();
const getWallpapers = require('../ctrl/bingWallpaper');
const getArticleList = require('../ctrl/getArticleList');

router.get('/bannerImg', getWallpapers);
router.get('/articleList', getArticleList);

module.exports = router;
