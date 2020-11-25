var api = require('../api/index');

var global = {}

// 获取学校信息
global.switch = function (version) {
    return new Promise((resolve, reject) => {
        api.get(api.url.Configs, {
            version: version
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

module.exports = global;