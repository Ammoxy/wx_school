var api = require('../../api/index')

var log = {};

// 获取我的孩子列表
log.list = function (token, state) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Children, {
            token: token,
            state: state,
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

log.listFace = function (token, type, state) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Children, {
            token: token,
            type: type,
            state: state,
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

// 获取进出记录
log.inOut = function (token, time, face_id, student_id, school_id, number, page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.UserStudentFaceLogs, {
            token: token,
            time: time,
            face_id: face_id,
            student_id: student_id,
            school_id: school_id,
            number: number,
            page: page,
            limit: limit
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



module.exports = log;