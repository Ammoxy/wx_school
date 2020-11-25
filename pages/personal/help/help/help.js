let help = require('../../../../model/my/help')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        helpList: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHelpList();
    },

    getHelpList() {
        let self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
          })
        help.helpList().then(res => {
            self.setData({
                helpList: res.data.data
            })
        })
    },
    openDocument(e) {
        wx.navigateTo({
            url: '../detail/detail?help_id=' + e.currentTarget.dataset.value
        })
    }
})