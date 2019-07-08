const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.post('/register', function (req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);
    // 检查输入是否有效
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // 根据 email 在数据库中查找用户,看看是否已经存在
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) {
            return res.status(400).json({
                email: 'Email 已被注册'
            });
        }
        else {
            // 根据 email 查找头像,如果不存在,生成默认头像
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
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;
    // 根据 email 在数据库中查找用户
    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = '用户不存在';
                return res.status(404).json(errors);
            }
            // 和数据库中保存的密文密码进行比对,密码正确生成 token 发给前端.前端自行储存登陆相关信息,后端不储存
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, 'secret', { //secret 私密
                            expiresIn: 3600
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
// 如果用户已登录，并且拥有JWT令牌，则可以访问此路由，否则他将重定向回登录，因为此路由受保护。
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
});

module.exports = router;