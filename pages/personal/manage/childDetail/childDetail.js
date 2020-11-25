let child = require('../../../../model/my/child')
Page({
    data: {
        info: [],
        id: ''
    },

    onLoad(opt) {
        this.setData({
            id: opt.id
        })
        this.getChildInfo(opt.id);
    },

    getChildInfo() {
        let self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
          })
        child.childInfo(wx.getStorageSync('token'), self.data.id).then(res => {
            self.setData({
                info: res.data
            })
        })
    }
})