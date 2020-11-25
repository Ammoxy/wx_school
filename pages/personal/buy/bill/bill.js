let buy = require('../../../../model/my/buy')

Page({
    data: {
        recordList: [],
        school_id: '',
        status: '',
        page: 1,
        isPage: false,
        showFoot: false,
        hasMore: true,
    },

    onLoad: function (options) {
        this.setData({
            school_id: options.school_id,
            status: options.status
        })
    },
    onShow() {
        this.getBill();

    },

    // 获取账单
    getBill(isPage) {
        var self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
        })
        buy.bills(wx.getStorageSync('token'), self.data.page, 20).then(res => {
            if (isPage) {
                // 下一页的数据拼接在原有数据后面
                self.setData({
                    recordList: self.data.recordList.concat(res.data.data)
                })
            } else {
                // 第一页数据直接赋值
                self.setData({
                    recordList: res.data.data
                })
            }
            // 如果返回的数据为空，那么就没有下一页了
            if (res.data.total <= (self.data.page * 20)) {
                self.setData({
                    hasMore: false,
                    showFoot: true
                })
            }
            wx.hideLoading()
        })
    },

    // 重新支付
    resetPay(e) {
        let self = this;
        let order_id = e.currentTarget.dataset.id;
        buy.buyGoods(wx.getStorageSync('token'), order_id).then(res => {
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
                    buy.cancelOrder(wx.getStorageSync('token'), order_id).then(res => {
                        if (res.data > 0) {
                            wx.showToast({
                                icon: "none",
                                title: '订单已取消',
                                success: () => {
                                    setTimeout(() => {
                                        buy.bill(wx.getStorageSync('token'), self.data.school_id, '').then(res => {
                                            self.setData({
                                                recordList: res.data
                                            })
                                        })
                                    }, 3000);
                                }
                            });
                        }
                    })
                }
            })
        })
    },
    scrollToLower(e) {
        if (this.data.hasMore) {
            this.setData({
                page: this.data.page + 1
            })
            this.getBill(true);
        }
    },
})