let service = require('../../../../model/my/service')

Page({

    data: {
        student_id: '',
        title: '',
        time: '',
        detailList: [],
        state: ''
    },

    onLoad: function (options) {
        console.log(options)
        this.setData({
            student_id: options.student_id
        })
        wx.showToast({
          title: '获取数据中',
          icon: 'none'
        })
        this.getService(options.student_id)
    },

    // 获取服务信息
    getService(val) {
        var self = this;
        service.list(wx.getStorageSync('token'), val).then(res => {
            self.setData({
                detailList: res.data
            });
        })
    },
})