let home = require('../../../model/home/home')
Page({

    data: {
        type_id: '',
        school_id: '',
        classFication: null,
        information: null,
        num: 0 // 头部导航下标
    },

    onLoad(opt) {
        this.setData({
            type_id: opt.type_id,
            school_id: opt.school_id,
            information: []
        });
        this.getClassFication(opt.school_id);
    },

    // 获取资讯分类
    getClassFication(val) {
        let self = this;
        home.documentType(wx.getStorageSync('token'), val).then(res => {
            let num = 0;
            for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].id == self.data.type_id) {
                    num = i;
                }
            }
            self.setData({
                classFication: res.data.data,
                num: num
            })
            self.getInformation();
        })
    },

    // 通过资讯分类获取资讯
    getInformation() {
        let self = this,
            num = 1;
        if (self.data.information) {
            num = Math.ceil(self.data.information.length / 10) + 1;
            console.log(self.data.information.length)
        }
        home.documents(wx.getStorageSync('token'), num, self.data.school_id, self.data.type_id).then(res => {
            self.setData({
                information: res.data.data
            })
        })
    },
    // 跳转资讯详情
    openDetals: function (e) {
        wx.navigateTo({
            url: '../details/index?details_id=' + e.currentTarget.dataset.id
        })
    },
    // 头部导航
    nav(e) {
        for (let i = 0; i < this.data.classFication.length; i++) {
            this.data.classFication[i].state = false;
        }
        this.data.classFication[e.currentTarget.dataset.index].state = true;
        this.setData({
            classFication: this.data.classFication,
            num: e.currentTarget.dataset.index,
            information: []
        })
        this.getInformation();
    },

    // 分享转发
    onShareAppMessage: function () {
        return {
            title: "图巴诺校园风采",
            // cnontent: this.data.summer_theme,
            imageUrl: "http://babihu2018-1256705913.cos.ap-guangzhou.myqcloud.com/bbh/2018/153544844868129.jpg"
        }
    }
})