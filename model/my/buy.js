var api = require('../../api/index')

var buy = {};

// 获取我的孩子列表
buy.list = function (token, mode) {
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

// 获取商品列表
buy.goods = function (token, school) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Products, {
            token: token,
            school: school
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

// 生成订单
buy.order = function (token, school_id, user_id, product_id, student_id, price) {
    return new Promise((resolve, reject) => {
        api.post(api.url.ProductOrder, {
            token: token,
            school_id: school_id,
            user_id: user_id,
            product_id: product_id,
            student_id: student_id,
            price: price
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

// 获取购买账单
buy.bills = function (token, page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Orders, {
            token: token,
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
buy.bill = function (token, school_id, status, page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Orders, {
            token: token,
            school_id: school_id,
            status: status,
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

// 购买商品
buy.buyGoods = function (token, order_id) {
    return new Promise((resolve, reject) => {
        api.post(api.url.BuyProduct, {
            token: token,
            order_id: order_id
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

// 取消订单
buy.cancelOrder = function (token, order_id) {
    return new Promise((resolve, reject) => {
        api.post(api.url.PayCancel, {
            token: token,
            order_id: order_id
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


module.exports = buy;