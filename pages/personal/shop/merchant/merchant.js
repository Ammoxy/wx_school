// pages/personal/shop/merchant/merchant.js
var shang = require('../../../../model/shang/shang')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    merchantList: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMerchantList()
  },

  getMerchantList() {
    var self = this;
    wx.showLoading({
      title: '获取数据中',
    })
    shang.merchants().then(res => {
      self.setData({
        merchantList: res.data.data
      })
      wx.hideLoading()
    })
  },

    // 商家详情
    toDetail(e) {
      console.log(e);
      var self = this;
      self.setData({
        id: e.currentTarget.dataset.id,
      })
      wx.navigateTo({
        url: '../merchant-detail/merchant-detail?id=' + self.data.id,
      })
    },
 
})