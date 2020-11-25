var api = require('../../api/index')

var visitor = {};

// 获取该校的所有工作者
visitor.workers = function (page, limit, school_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Workers, {
            page: page,
            limit: limit,
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
}

// 提交访客
visitor.audit = function(token, href, name, phone, reason, worker_id, school_id, date) {
    return new Promise((resolve, reject) => {
        api.post(api.url.Visitor, {
            token: token,
            href: href,
            name: name,
            phone: phone,
            reason: reason,
            worker_id: worker_id,
            school_id: school_id,
            date: date
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

// 获取申请记录
visitor.record = function(token) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Visitor, {
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

// 获取所有访客
visitor.list = function(token, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Visitors, {
            token: token,
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

// 获取单个访客信息
visitor.one= function(token, id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.SchoolVisitors, {
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

visitor.toAudit = function(token, id, state) {
    return new Promise((resolve, reject) => {
        api.post(api.url.CheckVisitor, {
            token: token,
            id: id,
            state: state
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

module.exports = visitor;