var api = require('../../api/index')

var score = {};

// 获取我的孩子列表
score.list = function (token, state) {
    return new Promise((resolve, reject) => {
        api.get(api.url.UserStudent, {
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

// 获取学生成绩
score.results = function (token, number, school_id, student_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.StudentExam, {
            token: token,
            number: number,
            school_id: school_id,
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



module.exports = score;