let user = require('../../../model/my/info');
let service = require('../../../model/my/service');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    memberTime: null,
    class_id: '',
    showBuy: false,
    childList: [], // 服务列表
    notice_childList: null,
    serviceList: null,
    school_id: '',
    showFace: false,
    showShop: false,
    is_shop: '',
    is_only: '',
    scl_id: ''
  },
  onLoad: function () {
    let self = this;
    self.setData({
      scl_id: app.globalData.school_id
    })
    wx.showToast({
      title: '获取数据中',
      icon: 'none'
    })
    if (wx.getStorageSync('token')) {
      self.getSchool();
      self.getChild();
    }
    if (wx.getStorageSync('open_face') == 'open') {
      self.setData({
        showFace: true
      });
    }
    console.log(111, app.globalData.is_only);

    if (app.globalData.is_shop == 1) {
      self.setData({
        showShop: true
      })
    } else if (app.globalData.is_shop == 2) {
      this.setData({
        showShop: false
      })
    }

  },
  onShow() {
    let self = this;
    self.getNoticeChild();
    self.getServiceInfo();
    self.getPersonalInfo(); // 页面刷新获取个人信息
    if (wx.getStorageSync('open_face') == 'open') {
      this.setData({
        showFace: true
      });
    }
    console.log(111, app.globalData.is_shop);

    if (app.globalData.is_shop == 1) {
      this.setData({
        showShop: true
      })
    } else if (app.globalData.is_shop == 2) {
      this.setData({
        showShop: false
      })
    }
  },

  // 获取个人信息
  getPersonalInfo() {
    var self = this;
    user.info(wx.getStorageSync('token')).then(res => {
      console.log(res)
      app.globalData.userInfo = res.data;
      self.setData({
        userInfo: res.data,
        class_id: res.data.class_id
      })
    })
  },

  getUserInfo(e) {
    var self = this,
      u_info = e.detail.userInfo;
    wx.login({
      success(res) {
        var code = res.code;
        if (code) {
          wx.getUserInfo({
            success: (res) => {
              user.login(code, res.iv, res.encryptedData).then(response => {
                console.log(response)
                wx.setStorage({
                  data: response.data.token,
                  key: 'token',
                })
                app.globalData.userInfo = response.data.user
                self.setData({
                  userInfo: response.data.user
                });
                wx.reLaunch({
                  url: '/pages/home/index/index'
                })
                // self.getSchool();
                // self.getChild();
                // self.getNoticeChild();
                // self.getServiceInfo();
                // self.getPersonalInfo(); // 页面刷新获取个人信息
              })
            }
          })
        }
      }
    });
  },
  // 获取我的孩子列表
  getChild() {
    var self = this;
    user.list(wx.getStorageSync('token'), 2).then(res => {
      self.setData({
        childList: res.data
      })
    })
  },
  // 选择孩子
  childrenChange(e) {
    var self = this;
    wx.navigateTo({
      url: '../service/detail/detail?student_id=' + self.data.childList[e.detail.value].id
    })
  },
  // 获取购买得服务信息
  getServiceInfo() {
    var self = this;
    service.list(wx.getStorageSync('token'), '').then(res => {
      self.setData({
        serviceList: res.data
      })
    })
  },

  // 获取学校
  getSchool() {
    var self = this;
    user.school(wx.getStorageSync('token')).then(res => {
      console.log(1, res);

      res.data.forEach(item => {
        if (item.mode == 2) {
          self.setData({
            showBuy: true
          })
        }
      })
    })
  },
  // 获取绑定的孩子
  getNoticeChild() {
    var self = this;
    user.noticeChild(wx.getStorageSync('token')).then(res => {
      self.setData({
        notice_childList: res.data
      })
    })
  },
  // 跳转个人信息页
  toInfomation() {
    let self = this;
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../infomation/infomation'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转设置只允许进校
  toOnly() {
    let self = this;
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../intoSchool/intoSchool?user_id=' + self.data.userInfo.user_id
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转孩子页
  toChild() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '../children/index/index'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转购买服务
  toBuy() {
    if (wx.getStorageSync('token')) {
      service.ban(wx.getStorageSync('token'), this.data.school_id).then(res => {
        if (res.data == 2) {
          wx.navigateTo({
            url: '../buy/buy?user_id=' + this.data.userInfo.user_id
          })
        } else {
          wx.showToast({
            title: '您已被禁用购买服务功能',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转我的设备
  toDevice() {
    if (wx.getStorageSync('token')) {
      wx.showToast({
        title: '暂不开放',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转班级管理
  toManage() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/manage/list/list?class_id=' + this.data.class_id,
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转班级公告
  toNotice() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/notice/child/child',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  // 跳转帮助文档
  toHelp() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/help/help/help',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转访客申请
  toVisitorAudit() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/visitor/visitor/visitor',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  // 跳转访客管理
  toVisitorManage() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/visitor/list/list',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转学习辅导
  toCoach() {
    if (wx.getStorageSync('token')) {
      wx.showToast({
        title: '该功能正在开发中',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转成绩查询
  toScore() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/score/score/score',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  // 跳转商城
  toShop() {
    if (wx.getStorageSync('token')) {
      wx.navigateTo({
        url: '/pages/personal/shop/shop?school_id=' + this.data.scl_id,
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
})