var api = require('../../api/index')

var home = {};

// 获取学校列表
home.schools = function(token) {
    return new Promise((resolve, reject) => {
        api.get(api.url.UserSchools, {
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
},

// 获取轮播图
home.banners = function(token, school_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Banners, {
            token: token,
            school_id: school_id
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
},

// 资讯列表
home.documents = function(token, page, school_id, type_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Documents, {
            token: token,
            page: page,
            school_id: school_id,
            type_id: type_id
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
},

home.documentType = function(token, school_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.DocumentTypes, {
            token: token,
            school_id: school_id
        }, function (response) {
            if (response.msg === 'ok') {
                var res = response
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
},

// 资讯详情
home.document = function(id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Document, {
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
},

// 接受邀请
home.invite = function (token, invite) {
    return new Promise((resolve, reject) => {
        api.post(api.url.AcceptInvite, {
            token: token,
            invite: invite
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

module.exports = home;