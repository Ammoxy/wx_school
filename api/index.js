const tools = require("../utils/tools.js");
const url = require("./url.js");
const app = getApp();
const baseUrl = require("./baseUrl.js");

// function api() {
//   var api = __wxConfig.envVersion;
//   switch (api) {
//     case 'develop': // 开发服
//       // return 'http://192.168.0.111/FaceCore/public/api';
//       return 'https://api.fengniaotuangou.cn/api';
//       break;
//     case 'trial': // 体验服
//       return 'https://api.fengniaotuangou.cn/api';
//       break;
//     default: // 正式服
//       return 'https://api.fengniaotuangou.cn/api';
//   }
// }

var header = {
  'Accept': 'application/json',
  'content-type': 'application/x-www-form-urlencoded'
  // 'Authorization': null,
  // 'token': ''
}

// header.token = wx.getStorageSync('token')

function queryData(data) {
  var str = '';
  for (var i in data) {
    str += i + "=" + data[i] + '&';
  }
  if (str) {
    str = '?' + str;
    str = str.substr(0, str.length - 1);
  }
  return str;
}

function get(url, data, cb) {
  wx.request({
    url: baseUrl.host + url + queryData(data),
    method: 'get',
    header: header,
    success: function (res) {
      switch (res.statusCode) {
        case 200:
          wx.hideToast();
          tools.isFunction(cb) && cb(res.data);
          break;
        case 401:
          wx.showToast({
            icon: "none",
            title: '请重新登录'
          });
          wx.removeStorageSync('token');
          app.globalData.userInfo = null;

          wx.navigateTo({
            url: '/pages/login/index?scp=1',
          });
          break;
        case 429:
          wx.showToast({
            icon: "none",
            title: res.data.msg
          });
          break;
        default:
          wx.hideToast();
          wx.showToast({
            icon: "none",
            title: res.data.msg
          });
          tools.isFunction(cb) && cb(res.data);

      }
    },
    fail(res) {
      wx.showModal({
        showCancel: false,
        content: res.msg
      })
    }
  })
}


function post(url, data, cb) {
  wx.request({
    url: baseUrl.host + url,
    method: 'post',
    data: data,
    header: header,
    success: function (res) {
      switch (res.statusCode) {
        case 200:
          wx.hideToast();

          tools.isFunction(cb) && cb(res.data);
          break;
        case 401:
          wx.showToast({
            icon: "none",
            title: '请重新登录'
          });
          wx.removeStorageSync('token');
          app.globalData.userInfo = null;
          wx.navigateTo({
            url: '/pages/login/index?scp=1',
          });
          break;
        case 429:
          wx.showToast({
            icon: "none",
            title: res.data.msg
          });
          break;
        default:
          wx.hideToast();
          wx.showToast({
            icon: "none",
            title: res.data.msg
          });
          tools.isFunction(cb) && cb(res.data);
      }
    },
    fail(res) {
      wx.showModal({
        showCancel: false,
        content: res.msg
      })
    }
  });
}

function del(url, data, cb) {
  wx.request({
    url: baseUrl.host + url + queryData(data),
    method: 'delete',
    header: header,
    success: function (res) {
      switch (res.statusCode) {
        case 200:
          wx.hideToast();

          tools.isFunction(cb) && cb(res.data);
          break;
        case 401:
          wx.showToast({
            icon: "none",
            title: '请重新登录'
          });
          wx.removeStorageSync('token');
          app.globalData.userInfo = null;
          wx.navigateTo({
            url: '/pages/login/index?scp=1',
          });
          break;
        case 429:
          wx.showToast({
            icon: "none",
            title: res.data.msg
          });
          break;
        default:
          wx.hideToast();

          wx.showToast({
            icon: "none",
            title: res.data.msg
          });
          tools.isFunction(cb) && cb(res.data);

      }
    },
    fail(res) {
      wx.showModal({
        showCancel: false,
        content: res.msg
      })
    }
  })
}

// 导出
module.exports = {
  url: url,
  baseUrl: baseUrl,

  get: get,
  post: post,
  del: del
}