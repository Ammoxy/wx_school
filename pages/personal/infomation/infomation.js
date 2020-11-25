var user = require('../../../model/my/info')
var school = require('../../../model/school/school')
const REG_PHONE = /^1[3-9]\d{9}$/
const REG_ID = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
const qiniuUploader = require("../../../utils/qiniu");

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

  /**
   * 页面的初始数据
   */
  data: {
    // 个人信息(传给后台的值)
    name: '',
    sex: '',
    id_card: '',
    phone: '',
    address: '',
    school_id: '',
    class_id: '',
    href: '',
    worker: '',

    // 回显
    avatarUrl: '',
    nickname: '',
    school_name: '', // 学校名字
    worker_type: '', // 职工类型

    workers: [{
      'name': '普通教职工',
      'type': 1
    }, {
      'name': '班主任',
      'type': 2
    }, {
      'name': '安保员',
      'type': 3
    }],
    worker_idx: '', // 选择职位的下标
    isWorkers: false, // 是否为教职工
    schools: [], // 学校选择列表
    school_idx: '', // 选择学校的下标
    grades: [], // 获取年级列表
    grade_idx: '', // 年级下标
    grade_name: '', // 年级名称
    classes: [], // 获取班级列表
    class_idx: '', // 班级下标
    class_name: '', // 班级名称

    showCamera: false, // 显示相机
    cameraConfig: {
      position: 'front',
      flash: 'off'
    },
    isSave: false, // 提交按钮
    showFace: false, // 显示上传人脸的图片
    mask_disable: false, // 授权窗口
  },

  onLoad(options) {
    this.getPersonalInfo(); // 页面刷新获取个人信息
    this.getSchools();
    // 初始化
    this.showCamera = false //是否显示照相机
    this.cameraConfig = { //照相机参数配置
      flash: 'off',
      position: 'front'
    }
    if (wx.getStorageSync('open_face') == 'open') {
      this.setData({
        showFace: true
      });
    }
  },

  onShow() {
    if (wx.getStorageSync('open_face') == 'open') {
      this.setData({
        showFace: true
      });
    }
  },

  getPersonalInfo() {
    var self = this;
    wx.showToast({
      title: '获取数据中',
      icon: 'none'
    })
    user.info(wx.getStorageSync('token')).then(res => {
      console.log(123, res)
      if (res.data.worker) {
        self.setData({
          isWorkers: res.data.worker == 0 ? false : true
        })
      }
      self.setData({
        avatarUrl: res.data.avatarUrl,
        nickname: res.data.nickname,
        school_name: res.data.school, // 学校名字
        worker_type: res.data.worker_type, // 职工类型
        grade_name: res.data.grade,
        class_name: res.data.class,
        name: res.data.name,
        sex: res.data.sex,
        id_card: res.data.id_card,
        phone: res.data.phone,
        address: res.data.address,
        school_id: res.data.school_id,
        class_id: res.data.class_id,
        href: res.data.href,
        // href: 'https://tu.fengniaotuangou.cn/ff6f43acb00cbde60fbfc9049e77ffe1.jpg',
        worker: res.data.worker,
      });
      self.getGrades(res.data.school_id)
    })
  },

  // 注册
  register() {
    let self = this;
    // 教职工注册
    wx.showToast({
      title: '提交中',
      icon: 'none'
    })
    if (self.data.isWorkers == true) {
      console.log('教职工注册');
      if (self.data.worker == 2) {
        wx.requestSubscribeMessage({
          tmplIds: ['WzOYkFYMmW67J3wxeLzcrlSJEyngFP1uIpxI9W4tbEQ']
        })
        console.log('班主任');
        if (self.data.name && self.data.sex && self.data.phone && self.data.address && self.data.school_id && self.data.worker && self.data.class_id && self.data.href) {
          user.register(wx.getStorageSync('token'), self.data.name, self.data.sex, self.data.phone, self.data.id_card, self.data.address, self.data.school_id, self.data.worker, self.data.class_id, self.data.href).then(res => {
            wx.showToast({
              title: '提交成功',
              icon: 'none'
            })
            self.getPersonalInfo();
            self.setData({
              isSave: false
            })
          })
        } else {
          wx.showToast({
            title: '请补充完整信息',
            icon: 'none'
          })
        }
      } else {
        console.log('普通教职工');
        self.setData({
          class_id: 0
        })
        if (self.data.name && self.data.sex && self.data.phone && self.data.address && self.data.school_id && self.data.worker && self.data.href) {
          console.log(wx.getStorageSync('token'), self.data.name, self.data.sex, self.data.phone, self.data.id_card, self.data.address, self.data.school_id, self.data.worker, self.data.class_id, self.data.href)
          user.register(wx.getStorageSync('token'), self.data.name, self.data.sex, self.data.phone, self.data.id_card, self.data.address, self.data.school_id, self.data.worker, self.data.class_id, self.data.href).then(res => {
            wx.showToast({
              title: '提交成功',
              icon: 'none'
            })
            self.getPersonalInfo();
            self.setData({
              isSave: false
            })
          })
        } else {
          wx.showToast({
            title: '请补充完整信息',
            icon: 'none'
          })
        }
      };
    } else {
      console.log('家长注册')
      if (self.data.name && self.data.sex && self.data.phone && self.data.address) {
        user.register(wx.getStorageSync('token'), self.data.name, self.data.sex, self.data.phone, self.data.id_card, self.data.address, 0, 0, 0, '').then(res => {
          self.getPersonalInfo()
        })
        self.setData({
          isSave: false
        })
      } else {
        wx.showToast({
          title: '请补充完整信息',
          icon: 'none'
        })
      }
    }
  },

  nameBlur(e) {
    this.setData({
      isSave: true,
      name: e.detail.value
    })
  },
  sexFoucs(e) {
    this.setData({
      isSave: true,
      sex: e.detail.value
    })
  },
  phoneFocus(e) {
    this.setData({
      isSave: true,
      phone: e.detail.value
    })
  },
  phoneBlur(e) {
    var self = this;
    if (!REG_PHONE.test(e.detail.value)) {
      wx.showToast({
        icon: "none",
        title: '请正确的手机号'
      })
    } else {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  addressBlur(e) {
    this.setData({
      isSave: true,
      address: e.detail.value
    })
  },

  // 点击图标选择地址
  map(e) {
    var self = this;
    console.log("开启地图")
    wx.chooseLocation({
      success(res) {
        console.log(res)
        self.setData({
          isSave: true,
          address: res.address
        })
      },
      fail: function (err) {
        console.log(123, err)
        wx.getSetting({
          success: (res) => {
            console.log(456, res)
            if (res.authSetting['scope.userLocation'] == false) {
              self.display();

            }
          }
        })
      },
    })
    console.log("地图")
  },

  // 是否是教职工
  switchChange(e) {
    var self = this;
    self.setData({
      isSave: true,
      isWorkers: e.detail.value
    })

  },
  // 选择职位
  bindWorkerChange(e) {
    let self = this;
    self.setData({
      isSave: true,
      worker: self.data.workers[e.detail.value].type,
      worker_idx: e.detail.value,
      worker_type: self.data.workers[e.detail.value].name
    });
  },
  // 获取学校列表
  getSchools() {
    var self = this;
    wx.showToast({
      title: '获取数据中',
      icon: 'none'
    })
    school.list(wx.getStorageSync('token'), 1, 1000).then(res => {
      self.setData({
        schools: res.data.data
      });
    })
  },
  // 学校选择
  bindSchoolChange(e) {
    let self = this;
    self.setData({
      isSave: true,
      school_id: self.data.schools[e.detail.value].id,
      school_idx: e.detail.value,
      school_name: self.data.schools[e.detail.value].name
    });
    self.getGrades(self.data.schools[e.detail.value].id)
  },
  // 获取年级列表
  getGrades(val) {
    var self = this;
    school.grade(wx.getStorageSync('token'), 1, 1000, val).then(res => {
      self.setData({
        grades: res.data.data
      })
    })
  },

  // 选择年级
  bindGradeChange(e) {
    let self = this;
    self.setData({
      isSave: true,
      grade_idx: e.detail.value,
      grade_name: self.data.grades[e.detail.value].title
    });
    self.getClasses(self.data.grades[e.detail.value].id)
  },

  // 获取班级列表
  getClasses(val) {
    var self = this;
    school.classes(wx.getStorageSync('token'), 1, 1000, val).then(res => {
      self.setData({
        classes: res.data.data
      })
    })
  },

  // 选择班级
  bindClassChange(e) {
    let self = this;
    if (self.data.grade_name) {
      self.setData({
        isSave: true,
        class_id: self.data.classes[e.detail.value].id,
        class_idx: e.detail.value,
        class_name: self.data.classes[e.detail.value].title
      });
    } else {
      wx.showToast({
        title: '请先选择年级',
        icon: 'none'
      })
    }

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
          duration: 50000
        });
        qiniuUploader.upload(res.tempImagePath, res => {
          wx.hideToast();
          if (res.fileURL) {
            self.setData({
              isSave: true,
              href: res.fileURL
            })
          }

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
    this.display();
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
  },

  // 授权返回
  authorization: function (e) {
    this.display()
  },

  display() {
    this.data.mask_disable = !this.data.mask_disable;
    this.setData({
      mask_disable: this.data.mask_disable
    })
    console.log(this.data.mask_disable)
  }
})