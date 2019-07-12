// https://github.com/surmon-china/wonderful-bing-wallpaper#readme
// require
const WonderfulBingWallpaper = require('wonderful-bing-wallpaper');
const Home = require('../models/Home');

// get support resolutions list
const resolutions = WonderfulBingWallpaper.resolutions

const options = {
    // size: 5,
    // day: 5,
    // resolution: '625x351'
}

const params = {
    host: 'cn.bing.com',
}

// instance
const wbw = new WonderfulBingWallpaper(options)

// update default options
wbw.setOptions(options)

// 获取壁纸
module.exports = (req, res) => {
    wbw.getWallpapers(params).then(wallpaperJSON => {
        // console.log('got wallpaperJSON data', wallpaperJSON)
        // console.log('got humanizeWallpapers data - Array', wbw.humanizeWallpapers(wallpaperJSON))
        // console.log('got humanizeWallpapers data - Object', wbw.humanizeWallpapers(wallpaperJSON[0]))
        // Home.updateOne({ bannerImg: { }}, { bannerImg: {} }, function() {});
        // 直接返回给前端
        res.json(wbw.humanizeWallpapers(wallpaperJSON[0]))
    });
};