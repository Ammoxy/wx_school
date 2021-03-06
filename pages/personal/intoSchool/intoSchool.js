var child = require('../../../model/my/child');
let log = require('../../../model/face/log')

Page({
    data: {
        childList: null,
        disBtn: true,
        timer: 1800,
        minute: '', // 分
        second: '', // 秒
        user_id: ''
    },


    onLoad: function (options) {
        console.log(options);
        this.setData({
            user_id: options.user_id
        })
    },

    onShow() {
        this.getChild();
    },

    // 获取我的孩子
    getChild() {
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
        })
        let self = this;
        child.list(wx.getStorageSync('token'), 1).then(res => {
            self.setData({
                childList: res.data
            })
            for (let i = 0; i < self.data.childList.length; i++) {
                if (self.data.childList[i].only_in == 1) {
                    self.data.childList[i].onlyIn = true;
                    self.data.childList[i].hideBtn = true;
                    self.setData({
                        childList: self.data.childList
                    })
                } else if (self.data.childList[i].only_in == 2) {
                    self.data.childList[i].onlyIn = false;
                    self.setData({
                        childList: self.data.childList
                    })
                }
                console.log(self.data.childList)
            }
        })
    },

    // 选中开关
    switchChange(e) {
        console.log(e)
        wx.showLoading({
            title: '设置中',
        });
        if (e.currentTarget.dataset.state == 3) {
            if (e.detail.value == true) {
                child.only(wx.getStorageSync('token'), e.currentTarget.dataset.id, 1).then(res => {
                    wx.showToast({
                        title: '设置成功',
                        icon: 'none',
                        success: () => {
                            setTimeout(() => {
                                this.getChild();
                            }, 2000)
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    wx.showModal({
                        title: '提示',
                        content: '您未购买服务, 无法设置, 是否前往购买服务',
                        success: (res) => {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                wx.navigateTo({
                                    url: '../buy/buy?user_id=' + this.data.user_id
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                                this.getChild();
                            }
                        }
                    })
                    // setTimeout(() => {
                    //     this.getChild();
                    // }, 2000)
                })
            } else if (e.detail.value == false) {
                child.only(wx.getStorageSync('token'), e.currentTarget.dataset.id, 2).then(res => {
                    wx.showToast({
                        title: '设置成功',
                        icon: 'none',
                        success: () => {
                            setTimeout(() => {
                                this.getChild();
                            }, 2000)
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    wx.showModal({
                        title: '提示',
                        content: '您未购买服务, 无法设置, 是否前往购买服务',
                        success: (res) => {
                            if (res.confirm) {
                                console.log('用户点击确定')
                                wx.navigateTo({
                                    url: '../buy/buy?user_id=' + this.data.user_id
                                })
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                                this.getChild();
                            }
                        }
                    })
                })
            }
        } else if (e.currentTarget.dataset.state == 2) {
            wx.showToast({
                title: '学生未审核, 设置无效, 请先联系班主任审核',
                icon: 'none',
            });
        } else if (e.currentTarget.dataset.state == 4) {
            wx.showToast({
                title: '学生未通过审核, 设置无效, 请重新绑定学生',
                icon: 'none',
            });
        } else if (e.currentTarget.dataset.state == 5) {
            wx.showToast({
                title: '学生修改了人脸信息, 未审核 , 设置无效, 请先联系班主任审核',
                icon: 'none',
                duration: 3000
            });
        }
        
    },
    // 临时出校
    temporaryOut(e) {
        console.log(e)
        let self = this,
            student_id = e.currentTarget.dataset.studentid,
            index = e.currentTarget.dataset.index;
        wx.showModal({
            title: '提示',
            content: '本次进出权限30分钟后失效',
            success(res) {
                if (res.confirm) {
                    child.out(wx.getStorageSync('token'), student_id).then(res => {
                        wx.showToast({
                            title: '操作成功'
                        })
                        // self.data.childList[index].hideBtn = false;
                        // self.setData({
                        //     childList: self.data.childList
                        // })
                        // let crontab = setInterval(function () {
                        //     self.setData({
                        //         minute: parseInt(self.data.timer / 60), // 分
                        //         second: parseInt(self.data.timer % 60), // 秒
                        //     })
                        //     if (self.data.timer-- <= 0) {
                        //         self.data.childList[index].hideBtn = true;
                        //         self.setData({
                        //             childList: self.data.childList
                        //         })
                        //         self.setData({
                        //             timer: 1800,
                        //             minute: '', // 分
                        //             second: '' // 秒
                        //         })
                        //         clearInterval(crontab);
                        //     }
                        // }, 1000);
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },

    //下拉刷新
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.getChild();
        //模拟加载
        setTimeout(function () {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },
})