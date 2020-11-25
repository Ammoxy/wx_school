var api = require('../../api/index')

var manage = {};

// 获取在校学生
manage.inSchool = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.url.ClassStudent, {
            token: token
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 获取家长审核列表
manage.auditList = function (token, page) {
    return new Promise((resolve, reject) => {
        api.get(api.url.MyStudents, {
            token: token,
            // state: state,
            page: page
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 是否通过审核
manage.audit = function (token, state, id) {
    return new Promise((resolve, reject) => {
        api.post(api.url.PassUserStudent, {
            token: token,
            state: state,
            id: id
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

module.exports = manage;