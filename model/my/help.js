var api = require('../../api/index')

var help = {};

// 获取帮助文档列表
help.helpList = function () {
    return new Promise((resolve, reject) => {
        api.get(api.url.HelpDocs, {}, function (response) {
            if (response.msg === 'ok') {
                var res = response
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}

// 查看帮助文档详情
help.detailHelp = function (id) {
    return new Promise((resolve, reject) => {
        api.get(api.url.HelpDoc, {
            id: id
        }, function(response) {
            if (response.msg === 'ok') {
                var res = response
                resolve(res);
            } else {
                reject(response);
            }
        })
    })
}


module.exports = help;