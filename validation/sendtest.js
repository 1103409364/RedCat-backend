// 测试能否发送邮件,直接 node 命令运行
let send = require('./email.js');

let user = {
    email: '1103409364@qq.com',
    code: 100 // 验证码
};
// 创建一个邮件对象
let mail = {
    // 发件人
    from: 'rr-blog <q1103409364@126.com>',
    // 主题
    subject: '测试',
    // 收件人
    to: user.email,
    // 接收激活请求的链接
    text: '点击激活: http://test?email=' + user.email + '&code=' + user.code
};

send(mail);