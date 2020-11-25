var api = require('../../api/index')

var notice = {};

// 获取孩子的公告
notice.list = function (token, mode) {
    return new Promise((resolve, reject) => {
        api.get(api.url.UserStudent, {
            token: token,
            mode: mode
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

// 发布公告
notice.save = function (token, notice_title, notice_content) {
    return new Promise((resolve, reject) => {
        api.post(api.url.ClassNotice, {
            token: token,
            notice_title: notice_title,
            notice_content: notice_content
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

// 家长获取班级公告
notice.familyNotice = function (token, class_id, student_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.ClassNotice, {
            token: token,
            class_id: class_id,
            student_id: student_id
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

// 教师获取班级公告
notice.teacherNotice = function (token, class_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.ClassNoticeTeacher, {
            token: token,
            class_id: class_id
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

// 删除班级公告
notice.delNotice = function (token, id) {
    return new Promise((resolve, reject) => {
        api.del(api.url.ClassNotice, {
            token: token,
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



module.exports = notice;