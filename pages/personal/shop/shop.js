// pages/personal/shop/shop.js
var shang = require('../../../model/shang/shang')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    goodsList: [],
    id: '',
    price: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBanner();
    this.getGoods();
  },

  // 轮播图
  getBanner() {
    var self = this;
    wx.showLoading({
      title: '获取数据中',
    })
    shang.bannersShop().then(res => {
      // console.log(res);
      self.setData({
        banners: res.data
      })
      wx.hideLoading()
    })
  },

  // 商品列表
  getGoods() {
    var self = this;
    shang.goods().then(res => {
      console.log('getGoods', res);
      self.setData({
        goodsList: res.data.data
      })
    })
  },

  // 商品详情
  toDetail(e) {
    console.log(e);
    var self = this;
    self.setData({
      id: e.currentTarget.dataset.id,
      price: e.currentTarget.dataset.price
    })
    wx.navigateTo({
      url: './commodity-detail/commodity-detail?id=' + self.data.id + '&price=' + self.data.price,
    })
  },

  // 商家列表
  toMerchant() {
    // wx.showToast({
    //   title: '功能开发中',
    //   icon: 'none'
    // })
   
    wx.navigateTo({
      url: './merchant/merchant',
    })
  },

  // 订单列表
  toOrder() {
    wx.navigateTo({
      url: './order/order',
    })
  },

})