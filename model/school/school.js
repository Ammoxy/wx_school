var api = require('../../api/index')

var school = {}

// 获取学校信息
school.list = function (token, page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Schools, {
            token: token,
            page: page,
            limit: limit
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

// 获取年级
school.grade = function(token, page, limit, school_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Grades, {
            token: token,
            page: page,
            limit, limit,
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

// 获取班级
school.classes = function(token, page, limit, grade_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Classes, {
            token: token,
            page: page,
            limit, limit,
            grade_id: grade_id
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


module.exports = school;