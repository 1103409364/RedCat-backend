const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const userCtrl = require('./validation/userCtrl');
const config = require('./db');
const users = require('./routes/user'); 
// 连接本地数据库 rr-blog
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('Can not connect to the database' + err) }  // 错误处理
);

const app = express();

app.use(passport.initialize());
require('./passport')(passport);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json 使用bodyparser 解析post请求体
app.use(bodyParser.json());
// 使用路由,请求的时候加前缀,例如 http://localhost:8000/api/users/me
app.use('/api/users', users);

app.get('/', function(req, res) {
    res.send('hello');
});
// 注册账号
// app.post('/register', userCtrl.doAddUser);

// 静态文件
app.use(express.static('public'));

const PORT = parseInt(process.env.PORT, 10) || 8000;
// 服务器运行在 8000 端口
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});