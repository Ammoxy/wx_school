let manage = require('../../../../model/my/manage')
const app = getApp()
Page({
  data: {
    childrenList: []
  },
  onLoad: function (options) {
  },

  onShow: function () {
    this.getChildrenList();

  },
  // 获取学生在校列表
  getChildrenList: function () {
    let self = this;
    wx.showToast({
      icon: 'loading',
      title: '加载中',
    })
    manage.inSchool(wx.getStorageSync('token')).then(res => {
      self.setData({
        childrenList: res.data
      })
    })
  }

})