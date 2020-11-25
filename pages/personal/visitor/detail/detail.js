let school = require("../../../../model/school/school");
let visitor = require("../../../../model/my/visitor");
let qiniuUploader = require("../../../../utils/qiniu");

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
        id: '',
        state: '', // 状态
        href: '', // 人脸图片
        // href: '', // 人脸图片

        schools: [], // 学校列表
        school: '', // 选择的学校
        school_index: '', // 选择学校的下标
        school_id: '',
        workers: [], // 所有工作者
        worker: '',
        worker_index: '',
        worker_id: '',
        date: '',
        name: '', // 真实姓名
        phone: '', // 手机号
        reason: '', // 访客理由

        multiArray: [
            ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
        ], // 日期
        multiIndex: [0, 0],

        showCamera: false, // 显示相机
        cameraConfig: {
            position: 'front',
            flash: 'off'
        },
        showFace: false // 人脸开关
    },
    onLoad(opt) {
        this.setData({
            id: opt.id,
            multiIndex: [new Date().getMonth(), new Date().getDate() - 1]
        });
        this.getRecord(opt.id);
        this.getSchools();
        if (wx.getStorageSync('open_face') == 'open') {
            this.setData({
                showFace: true
            })
        }
        this.showCamera = false //是否显示照相机
        this.cameraConfig = { //照相机参数配置
            flash: 'off',
            position: 'front'
        }
    },
    onShow() {
        if (wx.getStorageSync('open_face') == 'open') {
            this.setData({
                showFace: true
            })
        }
    },

    // 获取申请的记录
    getRecord(val) {
        let self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'

        })
        visitor.one(wx.getStorageSync('token'), val).then(res => {
            console.log(res)
            self.setData({
                href: res.data.href,
                school: res.data.school,
                worker: res.data.worker,
                date: res.data.date,
                name: res.data.name,
                phone: res.data.phone,
                reason: res.data.reason,
                state: res.data.state
            })
        })
    },

    // 访客审核
    toAudit() {
        let self = this;
        wx.showModal({
          title: '提示',
          content: '是否通过访客申请',
          cancelText:"不通过",
          confirmText:"通过",
          success (res) {
            if (res.confirm) {
                visitor.toAudit(wx.getStorageSync('token'), self.data.id, 2).then(res => {
                    wx.showToast({
                        title: '审核成功！',
                        icon: 'loading',
                        duration: 1000
                      });
                      wx.reLaunch({
                
                        url: '../list/list'
                      })
                })
            } else if (res.cancel) {
                visitor.toAudit(wx.getStorageSync('token'), self.data.id, 3).then(res => {
                    wx.showToast({
                        title: '审核成功！',
                        icon: 'loading',
                        duration: 1000
                      });
                      wx.reLaunch({
                        url: '../list/list'
                      })
                })
            }
          }
        })
    },

    // 获取学校列表
    getSchools() {
        let self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'

        })
        school.list(wx.getStorageSync('token'), 1, 1000).then(res => {
            self.setData({
                schools: res.data.data
            })
        })
    },

    // 选中学校
    bindSchoolChange(e) {
        let self = this;
        self.data.state = '';
        self.setData({
            school: self.data.schools[e.detail.value].name,
            school_index: e.detail.value,
            school_id: self.data.schools[e.detail.value].id,
            state: self.data.state
        });
        self.getWorkers(self.data.schools[e.detail.value].id)

    },
    // 获取该校的工作者
    getWorkers(val) {
        let self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'

        })
        visitor.workers(1, 1000, val).then(res => {
            self.setData({
                workers: res.data.data
            })
        })
    },

    // 选中工作者
    bindWorkerChange(e) {
        let self = this;
        self.data.state = '';

        self.setData({
            worker: self.data.workers[e.detail.value].name,
            worker_index: e.detail.value,
            worker_id: self.data.workers[e.detail.value].user_id,
            state: self.data.state

        });
    },

    // 选中时间
    bindMultiPickerColumnChange(e) {
        let self = this;
        let timeData = {
            multiArray: self.data.multiArray,
            multiIndex: self.data.multiIndex
        };

        timeData.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 1:
                        timeData.multiArray[1] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29'];
                        break;
                    default:
                        timeData.multiArray[1] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
                        break;
                }
                timeData.multiIndex[1] = 0;
                timeData.multiIndex[2] = 0;
                break;
        }
        self.setData(timeData);
    },

    // 获取名字
    nameBlur(e) {
        this.data.state = '';
        this.setData({
            name: e.detail.value,
            state: self.data.state
        })
    },

    // 获取手机号码
    phoneBlur(e) {
        this.data.state = '';

        this.setData({
            phone: e.detail.value,
            state: self.data.state

        })
    },

    // 获取访客理由
    reasonInput(e) {
        this.data.state = '';

        this.setData({
            reason: e.detail.value,
            state: self.data.state

        })
    },

    // 提交审核
    submission(e) {
        let self = this;
        console.log(self.data.name)
        console.log(self.data.phone)

        if (!self.data.href) { // 未上传照片
            wx.showToast({
                title: '请上传照片！',
                icon: 'loading',
                duration: 1000
            });
            return;
        }
        if (!self.data.school_id) { // 未选择学校
            wx.showToast({
                title: '请选择学校！',
                icon: 'loading',
                duration: 1000
            });
            return;
        }
        if (!self.data.worker_id) { // 未输入选择拜访人
            wx.showToast({
                title: '请选择拜访人！',
                icon: 'loading',
                duration: 1000
            })
            return;
        }
        if (self.data.multiIndex[0] <= new Date().getMonth() && self.data.multiIndex[1] < new Date().getDate() - 1) {
            wx.showToast({
                title: '来访日期不正确',
                icon: 'loading',
                duration: 1000
            })
            return;
        } else {
            self.setData({
                date: new Date().getFullYear() + '-' + (self.data.multiIndex[0] + 1) + '-' + (self.data.multiIndex[1] + 1)
            })
        }
        if (!self.data.name) { // 未输入姓名
            debugger
            wx.showToast({
                title: '请输入真实姓名',
                icon: 'loading',
                duration: 1000
            });
            return;
        }
        if (!self.data.phone) { // 未输入手机号
            wx.showToast({
                title: '请输入手机号',
                icon: 'loading',
                duration: 1000
            });
            return;
        }
        if (!self.data.reason) { // 未输入访客理由
            wx.showToast({
                title: '请输入真实姓名',
                icon: 'loading',
                duration: 1000
            });
            return;
        }
        wx.showToast({
            title: '提交中',
            icon: 'none'
        })
        visitor.audit(wx.getStorageSync('token'), self.data.href, self.data.name, self.data.phone, self.data.reason, self.data.worker_id, self.data.school_id, self.data.date).then(res => {
            console.log(res);
            wx.showToast({
                title: '提交成功,请通知拜访人',
                icon: 'success',
                duration: 1000
            });
            self.getRecord();
        })
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
                    duration: 100000
                });
                qiniuUploader.upload(res.tempImagePath, res => {
                    wx.hideToast();
                    self.setData({
                        href: res.fileURL
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
        console.log(e)
        // app.showTip('相机错误')
        this.cameraDisable(); //隐藏相机
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