// pages/personal/shop/order/order.js
var shang = require('../../../../model/shang/shang')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData: [],
    page: 1,
    isPage: false,
    showFoot: false,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOeder()
  },

  // 获取订单列表
  getOeder(isPage) {
    var self = this;
    wx.showLoading({
      title: '获取数据中',
    })
    shang.orders(wx.getStorageSync('token'), self.data.page, 10).then(res => {
      console.log(res);
      if (isPage) {
        // 下一页的数据拼接在原有数据后面
        self.setData({
          orderData: self.data.orderData.concat(res.data.data)
        })
      } else {
        // 第一页数据直接赋值
        self.setData({
          orderData: res.data.data
        })
      }
      // 如果返回的数据为空，那么就没有下一页了
      if (res.data.total <= (self.data.page * 10)) {
        self.setData({
          hasMore: false,
          showFoot: true
        })
      }
      wx.hideLoading()
    })
  },

  scrollToLower(e) {
    if (this.data.hasMore) {
      this.setData({
        page: this.data.page + 1
      })
      this.getOeder(true);
    }
  },

})