var home = require('../../../model/home/home')
var app = getApp()
Page({

    data: {
        banner: [], // 轮播图
        classFication: [], // 资讯分类
        information: null, // 资讯列表

        schoolList: [], // 学校列表
        is_school: '',
        school: '',

        num: 0 // 要显示的资讯
    },
    onLoad(opt) {
        // this.getSchools();
        this.acceptInvite(opt.invite);
    },
    onShow() {
        this.setData({
            num: this.data.num,
            information: null
        })
        this.getSchools();

    },
    // 邀请注册
    acceptInvite(val) {
        if (val) {
            wx.showModal({
                title: "提示",
                content: "是否接受邀请",
                success(res) {
                    if (res.confirm) {
                        if (wx.getStorageSync('token')) {
                            home.invite(wx.getStorageSync('token'), val).then(res => {
                                wx.showToast({
                                    title: '已接受,可在我的孩子列表查看',
                                    icon: 'none',
                                    duration: 1000
                                })
                            })
                        } else {
                            wx.showToast({
                                title: '您还未登录注册小程序，请先进入个人中心进行登录注册再进行邀请功能',
                                icon: 'none',
                                duration: 3000
                            })
                        }
                    }
                }
            })
        }
    },

    // 选择资讯类型
    nav(e) {
        console.log(e.currentTarget.dataset)
        this.setData({
            num: e.currentTarget.dataset.index
        });
        if (!wx.getStorageSync('token')) {
            this.getDocuments(null, e.currentTarget.dataset.id);
        } else {
            wx.showToast({
                title: '获取数据中',
                icon: 'none'
            })
            home.schools(wx.getStorageSync('token')).then(res => {
                if (res.data.length > 0) {
                    this.getDocuments(res.data[0].id, e.currentTarget.dataset.id);
                }
            })
        }
    },

    // 获取学校列表
    getSchools() {
        var self = this;
        if (wx.getStorageSync('token')) {
            wx.showToast({
                title: '获取数据中',
                icon: 'none'
            })
            home.schools(wx.getStorageSync('token')).then(res => {
                app.globalData.school_id = res.data[0].id
                app.globalData.is_shop = res.data[0].is_shop
                self.setData({
                    schoolList: res.data,
                    school: res.data[0].name,
                })
                if (res.data.length > 0) {
                    self.getBanner(res.data[0].id);
                    self.getDocumentType(res.data[0].id);
                }
            })
        } else {
            self.getBanner();
            // 根据资讯类型获取资讯
            self.setData({
                information: null
            })
            self.getDocumentType();
        }
    },

    schoolChange(e) {
        console.log(e);
        
        this.setData({
            is_school: e.detail.value,
            school: '',
            information: null
        });
        this.getBanner(this.data.schoolList[e.detail.value].id);
        this.getDocumentType(this.data.schoolList[e.detail.value].id);
        app.globalData.school_id = this.data.schoolList[e.detail.value].id
        app.globalData.is_shop = this.data.schoolList[e.detail.value].is_shop
    },

    // 轮播图
    getBanner(val) {
        var self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
        })
        home.banners(wx.getStorageSync('token'), val).then(res => {
            self.setData({
                banner: res.data.data
            })
            console.log(res.data.data.length)
        })
    },

    // 资讯分类
    getDocumentType(school_id) {
        var self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
        })
        home.documentType(wx.getStorageSync('token'), school_id).then(res => {
            self.setData({
                classFication: res.data.data
            })
            if (res.data.data.length > 0) {
                self.getDocuments(school_id, self.data.classFication[0].id);
            }
        })
    },

    // 资讯列表
    getDocuments(school_id, type_id) {
        var self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
        })
        home.documents(wx.getStorageSync('token'), 1, school_id, type_id).then(res => {
            self.setData({
                information: res.data.data
            })
        })
    },

    // 跳转资讯详情
    openDetals(e) {
        wx.navigateTo({
            url: '../details/index?details_id=' + e.currentTarget.dataset.id
        })
    },

    // 打开资讯分类
    openClassification(e) {
        setTimeout(function () {
            wx.navigateTo({
                url: '../classFication/index?type_id=' + e.currentTarget.dataset.id + '&school_id=' + e.currentTarget.dataset.schoolid
            })
        }, 100)
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