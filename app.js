const express = require('express');
const bodyParser = require('body-parser'); //使用bodyparser 解析post请求
const passport = require('passport');
const user = require('./routes/user'); 
const home = require('./routes/home'); 
const write = require('./routes/write'); 
const detail = require('./routes/detail'); 
const app = express();
const connect = require('./config/mongoose');

// 链接数据库
connect();
// Passport项目是一个基于Nodejs的认证中间件。Passport目的只是为了“登陆认证”
// 初始化 passport
app.use(passport.initialize());
// 配置 passport
require('./config/passport')(passport);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 
app.use(bodyParser.json());

// 使用路由,请求的时候加前缀,例如 http://localhost:8000/api/users/me
app.use('/api/users', user);
app.use('/api/home', home);
app.use('/api/write', write);
app.use('/api/detail', detail);

// 静态文件
app.use(express.static('public'));

const PORT = parseInt(process.env.PORT, 10) || 8000;
// // 服务器运行在 8000 端口
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});