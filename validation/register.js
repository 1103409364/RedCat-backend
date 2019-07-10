const Validator = require('validator');
const isEmpty = require('./is-empty.js');

// 后台表单验证
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = '用户名必须介于2到30个字符之间';
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = '用户名必填';
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = '邮箱无效';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = '邮箱必填';
    }

    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = '密码必须有6个字符';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = '密码必填';
    }

    if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
        errors.password_confirm = '密码必须有6个字符';
    }
    // 判断两次输入的密码是否相同
    if (!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = '密码和确认密码不一致';
    }

    if (Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = '密码必填';
    }

    return {
        errors,
        isValid: isEmpty(errors) // errors 对象为空的时候,输入的就是有效的
    }
}