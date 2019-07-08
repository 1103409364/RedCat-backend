// const crypto = require("crypto"); //用来加密密码
// const User = require("../models/User.js");

// exports.doAddUser = (req, res) => {
//     // console.log(req.body)
//     const userInfo = {};
//     const sha256Pwd = crypto.createHash("sha256").update(req.body.password).digest("hex");
//     userInfo.account = req.body.account;
//     userInfo.password = sha256Pwd;
//     User.saveToDB(userInfo);
// 	res.send({ 'success': true});
// }