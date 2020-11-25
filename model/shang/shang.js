var api = require('../../api/shang');

var shang = {}

// 轮播图
shang.bannersShop = function () {
    return new Promise((resolve, reject) => {
        api.get(api.url.BannersShop, {}, function (response) {
            if (response.msg === 'ok') {
                var res = response;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 商品列表
shang.goods = function () {
    return new Promise((resolve, reject) => {
        api.get(api.url.Goods, {}, function (response) {
            if (response.msg === 'ok') {
                var res = response;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 商品详情
shang.goodDetail = function (id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.GoodDetail, {
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

// 商家列表
shang.merchants = function () {
    return new Promise((resolve, reject) => {
        api.get(api.url.Merchants, {}, function (response) {
            if (response.msg === 'ok') {
                var res = response;
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 商家详情
shang.merchantsDetail = function (id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.MerchantsDetail, {
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

// 孩子
shang.child = function (token, school_id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Students, {
            token: token,
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

// 创建订单
shang.order = function (token, goods_id, student_id, total_money, count) {
    return new Promise((resolve, reject) => {
        api.post(api.url.CreateOrder, {
            token: token,
            goods_id: goods_id,
            student_id: student_id,
            total_money: total_money,
            count: count
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

// 支付
shang.pay = function (token, order_id) {
    return new Promise((resolve, reject) => {
        api.post(api.url.Pay, {
            token: token,
            order_id: order_id
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

// 订单列表
shang.orders = function (token, page, limit) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Oeders, {
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
module.exports = shang;