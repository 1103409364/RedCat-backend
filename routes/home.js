const express = require('express');
const router = express.Router();
const getWallpapers = require('../ctrl/bingWallpaper');
const getarticleList = require('../ctrl/getarticleList');

router.get('/bannerImg', getWallpapers);
router.get('/articleList', getarticleList);

module.exports = router;
