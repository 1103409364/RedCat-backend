const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const config = require('../config/secretKey.js');
const User = require('../models/User');

// 路由里的接口要通过 /api/users/'接口' 来访问

router.post('/register', (req, res) => {
    // 查表单内容
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    // 先检查 Email 和 name 是否已经被占用
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email 已被注册'
            });
        } else {
            User.findOne({
                name: req.body.name
            }).then(user => {
                if (user) {
                    return res.status(400).json({
                        name: '用户名已被占用'
                    });
                } else {
                    // gravatar 用于提供在全球范围内使用的头像服务.根据 email 查找头像,如果不存在,生成默认头像
                    const avatar = gravatar.url(req.body.email, {
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    });
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        avatar
                    });
                    // 对密码进行加密
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) console.error('There was an error', err);
                        else {
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) console.error('There was an error', err);
                                else {
                                    newUser.password = hash;
                                    newUser
                                        .save()
                                        .then(user => {
                                            res.json(user)
                                        });
                                }
                            });
                        }
                    });
                }
            })
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // 账号可能是邮箱或者用户名
    const account = req.body.account;
    const password = req.body.password;
    // 根据 Email 或 name 查找用户
    User.findOne({ $or: [{ email: account }, { name: account }] })
        .then(user => {
            if (!user) {
                errors.account = '用户不存在';
                return res.status(404).json(errors);
            }
            // 和数据库中保存的密文密码进行比对,密码正确生成 token 发给前端.前端自行储存登陆相关信息,服务器不存
            // 服务器只存一个密钥
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar,
                            islive: user.islive
                        }
                        //默认使用 HS256 加密算法.第二个参数是密钥,可以自己设置一个字符串. RSA 算法中才会涉及到公钥/私钥对的概念
                        // 签名的 header 部分由模块自动设置?
                        jwt.sign(payload, config.secretKey, {
                            expiresIn: 36000  //过期时间，单位秒
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        errors.password = '密码错误';
                        return res.status(400).json(errors);
                    }
                });
        });
});

// router.post('/refresh', passport.authenticate('jwt', { session: false }), (req, res) => {
//     const payload = {
//         id: req.user._id,
//         name: req.user.name,
//         avatar: req.user.avatar,
//         islive: req.user.islive
//     };
//     console.log(req.user)
//     jwt.sign(payload, config.secretKey, {
//         expiresIn: 10  //过期时间，单位秒
//     }, (err, token) => {
//         if (err) console.error('There is some error in token', err);
//         else {
//             res.json({
//                 success: true,
//                 token: `Bearer ${token}`
//             });
//         }
//     });
// });

// 如果用户已登录，并且拥有JWT令牌，则可以访问此路由，因为此路由受保护。未登陆返回 Unauthorized
// 使用passport-jwt验证 token,通过验证就调用回调函数
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    // passport 解析 token 之后可以取得 token 中的用户信息 user
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

// 登陆后,发送激活邮件的接口
const send = require('../validation/email.js');
router.get('/confirmation', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        code: parseInt(Math.random() * 10000),
        indate: Date.now() + 30 * 60 * 1000
    }

    // 创建一个邮件对象
    const mail = {
        // 发件人
        from: 'rr-blog <q1103409364@126.com>',
        // 主题
        subject: '账号激活',
        // 收件人
        to: user.email,
        // 邮件内容，HTML格式
        //接收激活请求的链接, 激活端口根据当前服务器运行端口确定
        text: '点击激活: http://localhost:8000/api/users/checkCode?email=' + user.email + '&code=' + user.code
    };
    // 更新数据库的 验证码, 过期时间
    User.updateOne({ email: user.email }, { code: user.code, indate: user.indate }, function (err) {
        if (err) {
            console.log(err);
            res.json({
                success: false
            });
            return;
        }
        send(mail); //测试注意必须要真实邮箱,假邮箱收不到邮件

        res.json({
            success: true,
            mail
        })
    });
});


// 邮件激活,点击验证接口
router.get('/checkCode', function (req, res) {
    var useremail = req.query.email;
    var code = parseInt(req.query.code);
    // console.log(useremail, code);
    User.findOne({
        email: useremail
    }).then(
        user => {
            // console.log(user)
            if (user.code === code && (user.indate - Date.now()) > 0) {
                User.updateOne({ email: useremail }, { islive: true }, function (err) {
                    if (err) {
                        res.send('<p>服务器错误</p>');
                        return;
                    }
                    res.send('<p>激活成功，请重新<a href="http://localhost:3000/login">登陆</a></p>');
                });
            } else {
                res.send('<p>激活链接已失效,请重新发送激活邮件！</p>');
            }
        }
    )
})

module.exports = router;