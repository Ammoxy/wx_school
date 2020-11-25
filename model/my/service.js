var api = require('../../api/index')

var service = {}

// 获取服务信息
service.list = function (token, student_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.UserServes, {
            token: token,
            student_id: student_id
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 查看用户是否可以购买服务
service.ban = function (token, school_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.ForbiddenProducts, {
            token: token,
            school_id: school_id
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

module.exports = service;