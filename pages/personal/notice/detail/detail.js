// pages/personal/class-management/notice/notice-detail/notice-detail.js
Page({
    data: {
        title: '',
        content: '',
        time: '',
        week: ''
    },
    onLoad: function (options) {
        console.log(options)
        this.setData({
            title: options.title,
            content: options.content,
            time: options.time,
            week: options.week
        })
    }
})