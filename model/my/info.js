var api = require('../../api/index')

var user = {}

// 手机号登录
user.login = function(code, iv, encryptedData) {
    return new Promise((resolve, reject) => {
        api.post(api.url.Login, {
            code: code,
            iv: iv,
            encryptedData: encryptedData
        }, function(response) {
            if(response.msg === 'ok') {
                var res = response
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 普通家长注册
user.register = function (token, name, sex, phone, id_card, address, school_id, worker, class_id, href) {
    return new Promise((resolve, reject) => {
        api.post(api.url.UserInfo, {
            token: token,
            name: name,
            sex: sex,
            phone: phone,
            id_card: id_card,
            address: address,
            school_id: school_id,
            worker: worker,
            class_id: class_id,
            href: href
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

// 教职工注册
user.workerRegister = function (token, name, sex, phone, id_card, address) {
    return new Promise((resolve, reject) => {
        api.post(api.url.UserInfo, {
            token: token,
            name: name,
            sex: sex,
            phone: phone,
            id_card: id_card,
            address: address
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


// 获取个人信息
user.info = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.url.UserInfo, {
            token: token
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

user.list = function (token, mode) {
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

user.school = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.url.UserSchools, {
            token: token
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

// 绑定孩子的用户可看班级公告
user.noticeChild = function (token) {
    return new Promise((resolve, reject) => {
        api.get(api.url.UserStudent, {
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

module.exports = user;