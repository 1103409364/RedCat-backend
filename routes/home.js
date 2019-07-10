const express = require('express');
const router = express.Router();
const getWallpapers = require('../ctrl/bingWallpaper');

router.get('/bannerImg', getWallpapers);

module.exports = router;
