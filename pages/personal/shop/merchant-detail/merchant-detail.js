var WxParse = require('../../../../wxParse/wxParse.js');
let details_id;
var shang = require('../../../../model/shang/shang')

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
        // this.getChild();
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
        shang.merchantsDetail(details_id).then(res => {
            console.log(res)
            wx.hideToast({});
            WxParse.wxParse('article', 'html', res.data.detail, self, 2);
            self.setData({
                details: res.data,
                banners: res.data.imgs,
                good_id: res.data.id,
                total_money: res.data.reduced_price
            })
        })
    },


})