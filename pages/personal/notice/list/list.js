let notice = require('../../../../model/my/notice')
let app = getApp();
Page({
    data: {
        class_id: '',
        notice_List: null,
        btn_del: false
    },

    onLoad: function (options) {
        this.setData({
            class_id: options.class_id,
            btn_del: options.btn_del,
            student_id: options.studentid
        })
        this.getNoticeList();
    },
    getNoticeList() {
        var self = this;
        if ((app.globalData.userInfo.worker != 2 && self.data.student_id) || (app.globalData.userInfo.worker == 2 && self.data.student_id)) {
            wx.showToast({
                title: '获取数据中',
                icon: 'none'
              })
            // 家长获取班级公告
            notice.familyNotice(wx.getStorageSync('token'), self.data.class_id, self.data.student_id).then(res => {
                self.setData({
                    notice_List: res.data
                })
            })
        } else {
            wx.showToast({
                title: '获取数据中',
                icon: 'none'
              })
            notice.teacherNotice(wx.getStorageSync('token'), self.data.class_id).then(res => {
                self.setData({
                    notice_List: res.data
                });
            }).catch(err => {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    success: function () {
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1,
                            })
                        }, 2000);
                    }
                })
            })
        }
    },

    toDetail(e) {
        console.log(e)
        var self = this;
        wx.navigateTo({
            url: '../detail/detail?title=' + e.currentTarget.dataset.title + '&content=' + e.currentTarget.dataset.content + '&time=' + e.currentTarget.dataset.createtime + '&week=' + e.currentTarget.dataset.week
        });
    },

    del(e) {
        let self = this;
        let id = e.currentTarget.dataset.id;
        wx.showModal({
            title: '删除公告',
            content: '是否删除该公告？',
            cancelText: '取消',
            confirmText: '删除',
            success: function (res) {
                if (res.confirm) {
                    wx.showToast({
                        title: '正在删除',
                        icon: 'none'
                      })
                    notice.delNotice(wx.getStorageSync('token'), id).then(res => {
                        wx.showToast({
                            title: '删除成功',
                            success: function (res) {
                                setTimeout(() => {
                                    self.getNoticeList();
                                }, 2000)
                            }
                        })
                    })
                } else if (res.cancel) {
                    wx.hideToast();
                }
            }
        })
    }

})