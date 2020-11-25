let visitor = require("../../../../model/my/visitor");

Page({

    data: {
        visitors: null
    },
    onLoad (options) {
        this.getVisitors();
    },
    getVisitors() {
        let self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'

        })
        visitor.list(wx.getStorageSync('token'), 1000).then(res => {
            self.setData({
                visitors: res.data.data
            })
        })
    },

    // 查看访客申请信息
    toDetail(e) {
        wx.navigateTo({
            url: '../detail/detail?id=' + e.currentTarget.dataset.id
          })
    }
    
})