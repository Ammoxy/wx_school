let child = require('../../../../model/my/child')
let name;

Page({
    data: {
        searchList: null
    },
    searchName(e) {
        name = e.detail.value
    },
    // 搜索
    search(e) {
        let self = this;
        wx.showToast({
            title: '正在搜索',
            icon: 'loading',
            duration: 3000
        })
        child.search(wx.getStorageSync('token'), name).then(res => {
            self.setData({
                searchList: res.data.data
            })
        })
    },

    toChildInfo(e) {
        console.log( e.currentTarget.dataset.id)
        wx.navigateTo({
          url: '../detail/detail?id=' + e.currentTarget.dataset.id
        })
    }
})