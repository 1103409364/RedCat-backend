const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.account = !isEmpty(data.account) ? data.account : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    // if (!Validator.isEmail(data.account)) {
    //     errors.email = '电子邮件无效';
    // }

    if (Validator.isEmpty(data.account)) {
        errors.account = '账号必填';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = '密码必须有6个字符';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = '密码必填';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}