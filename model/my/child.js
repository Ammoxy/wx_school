var api = require('../../api/index')

var child = {}

// 获取我的孩子列表
child.list = function (token, type) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Children, {
            token: token,
            type: type,
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

// 临时出校
child.out = function (token, id) {
    return new Promise((resolve, reject) => {
        api.post(api.url.StudentOut, {
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

// 家庭成员
// child.familyMember = function (token, user_student) {
//     return new Promise((resolve, reject) => {
//         api.post(api.url.Invite, {
//             token: token,
//             user_student: user_student
//         }, function (response) {
//             if (response.msg === 'ok') {
//                 var res = response
//                 resolve(res);
//             } else {
//                 reject(response);
//             }
//         })
//     })
// }
// 家庭成员
child.familyMember = function (token, student_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.FamilyMember, {
            token: token,
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

// 搜索孩子
child.search = function (token, search) {
    return new Promise((resolve, reject) => {
        api.get(api.url.SearchStudents, {
            token: token,
            search: search
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

// 获取孩子信息
child.childInfo = function (token, id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Student, {
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

// 绑定孩子
child.bindChild = function (token, number, remark, cover, face_image, only_in, id) {
    return new Promise((resolve, reject) => {
        api.post(api.url.Child, {
            token: token,
            number: number,
            remark: remark,
            cover: cover,
            face_image: face_image,
            only_in: only_in,
            id: id
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

// 只允许进校
child.only = function(token, id, only_in) {
    return new Promise((resolve, reject) => {
        api.post(api.url.OnlyAccess, {
            token: token,
            id: id,
            only_in: only_in
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

module.exports = child;