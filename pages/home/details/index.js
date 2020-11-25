
var details = require('../../../model/home/home')
var WxParse = require('../../../wxParse/wxParse.js');
let details_id;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        details: []
    },

    onLoad(options) {
        details_id = options.details_id;
        this.getDetails();
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
        details.document(details_id).then(res => {
            console.log(res)
            wx.hideToast({});
            WxParse.wxParse('article', 'html', res.data.detail, self, 2);
            self.setData({
                details: res.data
            })
        })
    }
})