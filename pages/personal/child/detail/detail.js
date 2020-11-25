let child = require('../../../../model/my/child');

const qiniuUploader = require("../../../../utils/qiniu")

function getQiniuToken() {
    var options = {
        region: 'SCN',
        uptoken: '',
        uptokenURL: 'https://api.fengniaotuangou.cn/api/upload/token',
        uptokenFunc: function () {},
        domain: 'https://tu.fengniaotuangou.cn',
        shouldUseQiniuFileName: false
    };
    qiniuUploader.init(options);
}

Page({

    data: {
        // onlyIn: true, // 只允许进校
        info: [],
        id: '',

        showCamera: false, // 显示相机
        cameraConfig: {
            position: 'front',
            flash: 'off'
        },
        showFace: false, // 显示上传人脸的开关
    },

    onLoad(opt) {
        this.setData({
            id: opt.id
        })
        this.getChildInfo();

        this.showCamera = false //是否显示照相机
        this.cameraConfig = { //照相机参数配置
            flash: 'off',
            position: 'front'
        }
        if (wx.getStorageSync('open_face') == 'open') {
            this.setData({
                showFace: true
            })
        }
    },

    onShow() {
        if (wx.getStorageSync('open_face') == 'open') {
            this.setData({
                showFace: true
            })
        }

    },

    getChildInfo() {
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
        })
        let self = this;
        child.childInfo(wx.getStorageSync('token'), self.data.id).then(res => {
            self.setData({
                info: res.data,
                // onlyIn: res.data.state == 1 ? false : res.data.only_in == 1 ? true : false
            })
        })
    },

    // 查看授权信息
    checkAuth() {
        let self = this;
        self.setData({
            info: self.data.info
        });
        if (self.data.info.state != 2) {
            wx.getSetting({
                withSubscriptions: true,
                success: (res) => {
                    if (res.subscriptionsSetting.mainSwitch) {
                        // 用户点击了总是保持选择的状态
                        if (res.subscriptionsSetting.itemSettings) {
                            let modelCode = JSON.stringify(res.subscriptionsSetting.itemSettings);
                            let acceptModelCode = JSON.stringify({
                                'WzOYkFYMmW67J3wxeLzcrlSJEyngFP1uIpxI9W4tbEQ': "accept"
                            });
                            let rejectModelCode = JSON.stringify({
                                'WzOYkFYMmW67J3wxeLzcrlSJEyngFP1uIpxI9W4tbEQ': "reject"
                            });
                            if (modelCode == acceptModelCode) {
                                wx.showToast({
                                    title: '您已授权接收审核结果通知的订阅消息,点击小程序右上角的三个点可查看详情',
                                    icon: 'none',
                                    duration: 4000
                                })
                            }

                            if (modelCode == rejectModelCode) {
                                wx.showToast({
                                    title: '您已拒绝接收审核结果通知的订阅消息,请在小程序右上角的三个点，进入设置进行授权',
                                    icon: 'none',
                                    duration: 4000
                                })
                            }
                        }
                    } else {
                        wx.showModal({
                            title: '授权订阅消息',
                            content: '您未打开设置中的订阅消息开关,请在小程序右上角的三个点，进入设置进行开启',
                            cancelText: '取消',
                            confirmText: '开启',
                            success: (res) => {
                                console.log(2, res);
                                if (res.confirm) {
                                    wx.openSetting({
                                        withSubscriptions: true
                                    })
                                } else if (res.cancel) {
                                    wx.showToast({
                                        icon: "none",
                                        title: '您未打开设置中的订阅消息开关,请在小程序右上角的三个点，进入设置进行开启',
                                        duration: 4000
                                    })
                                }
                            }
                        })
                    }
                }
            })
        }


    },

    // switchChange(e) {
    //     this.setData({
    //         onlyIn: e.detail.value
    //     })
    //     // let only = e.detail.value == true ? 1 : 2;
    //     // child.only(wx.getStorageSync('token'), this.data.id, only).then(res => {
    //     //     wx.showToast({
    //     //         title: '设置成功',
    //     //         icon: 'none'
    //     //     });
    //     // })

    // },

    // 备注
    remarkFocus(e) {
        console.log(e)
        this.data.info.remark = e.detail.value;
        console.log(this.data.info.remark)

        this.setData({
            info: this.data.info
        })
    },

    // 绑定孩子
    bindChild() {
        let self = this;
        self.setData({
            info: self.data.info,
            // onlyIn: self.data.onlyIn
        });
        if (self.data.info.state != 2) {
            wx.requestSubscribeMessage({
                tmplIds: ['WzOYkFYMmW67J3wxeLzcrlSJEyngFP1uIpxI9W4tbEQ']
            });
        }
        setTimeout(function () {
            console.log(self.data.info)
            if (!self.data.info.face_image) {
                wx.showToast({
                    title: '请上传孩子照片',
                    icon: 'none',
                    duration: 3000
                });
                return false;
            }
            // 只允许进校开关 1开 2关
            // let only_in = self.data.onlyIn == true ? 1 : 2
            // 绑定孩子请求
            child.bindChild(wx.getStorageSync('token'), self.data.info.number, self.data.info.remark, self.data.info.cover, self.data.info.face_image, 1, self.data.info.id).then(res => {
                wx.showToast({
                    title: '提交成功，请通知班主任审核',
                    icon: 'none',
                    duration: 3000,
                    success() {
                        self.data.info.state = 2;
                        self.setData({
                            info: self.data.info
                        });
                        setTimeout(function () {
                            self.checkAuth();
                        }, 4000);
                    }
                });
            }).catch(err => {})
        }, 3000)
    },

    // 调用相机
    cameraDisable() {
        let self = this;
        self.showCamera = !self.showCamera;
        self.setData({
            isSave: true,
            showCamera: self.showCamera
        })
    },
    // 拍照
    takePhoto(e) {
        var self = this;
        getQiniuToken()
        console.log('点击拍照')
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'normal',
            success(res) {
                console.log(res)
                self.cameraDisable();
                wx.showToast({
                    title: '上传中...',
                    icon: 'loading',
                    duration: 10000
                });
                qiniuUploader.upload(res.tempImagePath, res => {
                    wx.hideToast();
                    self.data.info.face_image = res.fileURL;
                    self.setData({
                        info: self.data.info
                    })
                })
            }
        })
    },

    // 显示隐藏相机
    cameraDisable: function () {
        console.log('隐藏相机')

        this.showCamera = !this.showCamera;
        this.setData({
            showCamera: this.showCamera
        })
    },
    // 照相机停止运行
    cameraStop: function (e) {
        console.log('相机停止运行')
        console.log(e)
        this.cameraDisable();
        app.showNone('相机停止运行')
    },
    // 照相机没授权
    cameraError: function (e) {
        var self = this;
        self.setData({
            showCamera: false
        })
        console.log(e)
        // app.showTip('相机错误')
        wx.showModal({
            title: '摄像头授权',
            content: '您未开启相机权限，无法上传照片，是否开启',
            cancelText: '取消',
            confirmText: '开启',
            success: function (res) {
                if (res.confirm) {
                    wx.getSetting({
                        success: (res) => {
                            if (!res.authSetting['scope.camera']) {
                                wx.authorize({
                                    scope: 'scope.camera',
                                    success: function () {
                                        console.log('允许')
                                    },
                                    fail: function () {
                                        console.log('拒绝')
                                        wx.openSetting({
                                            success: res => {
                                                self.cameraDisable(); // 开启相机
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                } else if (res.cancel) {
                    wx.showToast({
                        icon: "none",
                        title: '您未开启相机权限，无法上传照片,需要开启相机权限',
                        duration: 4000,
                        success: () => {
                            self.setData({
                                showCamera: false
                            })
                        }
                    })
                }
            }
        })
    },
    // 切换闪光灯状态
    flashChange: function () {
        switch (this.cameraConfig.flash) {
            case 'off':
                this.cameraConfig.flash = 'on';
                break;
            case 'on':
                this.cameraConfig.flash = 'auto';
                break;
            case 'auto':
                this.cameraConfig.flash = 'off';
                break;
        }
        this.setData({
            cameraConfig: this.cameraConfig
        })
    },
    // 切换前后置摄像头
    positionChange() {
        console.log(111)

        switch (this.cameraConfig.position) {
            case 'front':
                this.cameraConfig.position = 'back';
                break;
            case 'back':
                this.cameraConfig.position = 'front';
                break;
        }
        console.log(111)

        this.setData({
            cameraConfig: this.cameraConfig
        })
    }

})