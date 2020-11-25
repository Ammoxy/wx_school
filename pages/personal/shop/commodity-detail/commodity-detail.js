var WxParse = require('../../../../wxParse/wxParse.js');
let details_id;
var shang = require('../../../../model/shang/shang')
var price;
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        details: [],
        banners: [],
        count: 1,
        student_id: '',
        childList: [],
        child: '',
        good_id: '',
        total_money: '',
    },

    onLoad(options) {
        console.log(options);
        details_id = options.id;
        this.getDetails();
        this.getChild();
    },

    // 获取资讯详情
    getDetails() {
        var self = this;
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            mask: true,
            duration: 10000
        })
        shang.goodDetail(details_id).then(res => {
            console.log(res)
            wx.hideToast({});
            WxParse.wxParse('article', 'html', res.data.detail, self, 2);
            price = res.data.reduced_price
            self.setData({
                details: res.data,
                banners: res.data.imgs,
                good_id: res.data.id,
                total_money: res.data.reduced_price
            })
        })
    },

    // 获取我的孩子
    getChild() {
        let self = this;
        shang.child(wx.getStorageSync('token'), app.globalData.school_id).then(res => {
            console.log(res)
            self.setData({
                childList: res.data,
                student_id: res.data[0].id,
                child: res.data[0].name
            })
        })
    },

    // 选中孩子
    childChange(e) {
        this.setData({
            student_id: this.data.childList[e.detail.value].id,
            child: this.data.childList[e.detail.value].name
        });
    },

    // 减少
    decrease() {
        var self = this;
        if (self.data.count > 1) {
            self.setData({
                count: self.data.count - 1,
                total_money: price * (self.data.count - 1)
            })
        } else {
            wx.showToast({
              title: '数量不能少于1',
              icon: 'none'
            })
        }
      
        console.log(self.data.total_money);
        
    },

    // 增加
    increase() {
        var self = this;
        self.setData({
            count: self.data.count + 1,
            total_money: price * (self.data.count + 1)
        })
        console.log(self.data.total_money);

    },

    // 生成订单支付
    pay() {
        let self = this;
        wx.showToast({
          title: '正在创建订单',
        })
        if (self.data.student_id) {
            shang.order(wx.getStorageSync('token'), self.data.good_id, self.data.student_id, self.data.total_money, self.data.count).then(res => {
                
                let order_id = res.data.id;
                if (order_id > 0) {
                    shang.pay(wx.getStorageSync('token'), order_id).then(res => {
                        console.log(res.data)
                        wx.requestPayment({
                            timeStamp: res.data.timeStamp,
                            nonceStr: res.data.nonceStr,
                            package: res.data.package,
                            signType: 'MD5',
                            paySign: res.data.paySign,
                            success(res) {
                                wx.showToast({
                                    icon: "none",
                                    title: '购买成功'
                                });
                                setTimeout(function () {
                                    wx.switchTab({
                                        url: '/pages/personal/index/index',
                                    })
                                }, 1500)
                            },
                            fail() {
                                // buy.cancelOrder(wx.getStorageSync('token'), order_id).then(res => {
                                //     if (res.data > 0) {
                                //         wx.showToast({
                                //             icon: "none",
                                //             title: '订单已取消'
                                //         });
                                //     }
                                // })
                            }
                        })
                    })
                }
                wx.hideLoading()
            })
        } else {
            wx.showToast({
              title: '请选择学生',
              icon: 'none'
            })
        }

    },
})