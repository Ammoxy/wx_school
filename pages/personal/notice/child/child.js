let notice = require('../../../../model/my/notice')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        notice_childList: null
    },
    onLoad: function (options) {
        this.getChild();
    },
    // 获取我的孩子
    getChild() {
        wx.showToast({
          title: '获取数据中',
          icon: 'none'
        })
        let self = this;
        notice.list(wx.getStorageSync('token'), 2).then(res => {
            console.log(res)
            self.setData({
                notice_childList: res.data
            })
        })
    },

    // 去公告列表
    toNotice(e) {
        let self = this;
        // 家长获取班级公告
        notice.familyNotice(wx.getStorageSync('token'), e.currentTarget.dataset.classid, e.currentTarget.dataset.studentid).then(res => {
            self.setData({
                notice_List: res.data
            });
            wx.navigateTo({
                url: '../list/list?class_id=' + e.currentTarget.dataset.classid + '&studentid=' + e.currentTarget.dataset.studentid,
            })
        })
    }
})