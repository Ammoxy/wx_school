Page({
    data: {
        info: [],
    },
    onLoad: function (options) {
        this.setData({
            info: JSON.parse(options.data)
        })
    }
})