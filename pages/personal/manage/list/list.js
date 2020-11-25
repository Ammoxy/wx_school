Page({

    data: {
        class_id: '',
        showFace: false
    },
    onLoad(opt) {
       this.setData({
           class_id: opt.class_id
       })
       if (wx.getStorageSync('open_face') == 'open') {
        this.setData({
          showFace: true
        });
      }
    },

    // 跳转在校信息
    toInSchool() {
        wx.navigateTo({
            url: '../inSchool/inSchool',
        })
    },

    // 跳转家长审核
    toAudition: function () {
        wx.navigateTo({
            url: '../audit/audit'
        })
    },

    // 跳转发布公告
    toNotice() {
        var self = this;
        wx.navigateTo({
            url: '/pages/personal/notice/issue/issue'
        })
    },

    // 跳转公告管理
    toManageNotice() {
        var self = this;
        wx.navigateTo({
            url: '/pages/personal/notice/list/list?class_id=' + self.data.class_id + '&btn_del=' + 'true' 
        })
    }
})