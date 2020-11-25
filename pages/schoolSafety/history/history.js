let log = require('../../../model/face/log')


Page({

    data: {
        recordsList: null,
        school_id: '',
        number: '',
        student_id: '',
        face_id: '',
        images: [], // 预览图片组
    },
    onLoad: function (options) {
        this.setData({
            school_id: options.school_id,
            number: options.number,
            student_id: options.student_id,
            face_id: options.face_id
        })
        this.getRecords();

    },
    // 历史记录
    getRecords() {
        let self = this;
        log.inOut(wx.getStorageSync('token'),
            '',
            self.data.face_id,
            self.data.student_id,
            self.data.school_id,
            self.data.number,
            1,
            10000).then(res => {
            res.data.direction.forEach(item => {
                if (item.image) {
                    self.data.images.push(item.image)
                }
            })
            self.setData({
                recordsList: res.data.direction
            });
        })
        // log.inOut(wx.getStorageSync('token'), '', 'face_5f561b916830f', '13689', '44', '20190152', 1, 1000).then(res => {
        //     res.data.direction.forEach(item => {
        //         if(item.image) {
        //           self.data.images.push(item.image)
        //         }
        //       })
        //     self.setData({
        //         recordsList: res.data.direction
        //     });
        // })
    },

    // 预览人脸照片
    preview(e) {
        let self = this;
        wx.previewImage({
            current: e.currentTarget.dataset.image, // 当前显示图片的http链接
            urls: self.data.images // 需要预览的图片http链接列表
        })
    }
})