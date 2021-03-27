let log = require('../../../model/face/log')
let Lunar = require('../../../utils/lunar')

let markersArray = [{
        id: 0,
        iconPath: "../../../icon/address.png",
        latitude: 22.93791,
        longitude: 113.34135,
        width: 30,
        height: 30,
        title: '广州市图巴诺信息科技有限公司',
        anchor: {
            x: .5,
            y: 1
        },
        alpha: 1
    }],
    addressText = '广州市图巴诺信息科技有限公司',
    latitudeNum = 22.93791,
    longitudeNum = 113.34135;

Page({
    data: {
        daysColor: [{
            month: 'current', // 要标记的日期所属月份，有效值有prev（上个月）,current（当前月），next（下个月）
            day: new Date().getDate(), // 要标记的日期
            color: 'white', // 白色
            background: "#2a9f93" //日期单元格的颜色
        }], // 日历
        childList: null,
        recordsList: null, // 进出记录,

        address: addressText,
        //地图开始的位置
        latitude: latitudeNum,
        longitude: longitudeNum,
        //标记位置
        markers: markersArray,

    },

    onShow() {
        this.getChild();
    },

    // 获取我的孩子
    getChild() {
        let self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
        })
        log.list(wx.getStorageSync('token'), 3).then(res => {
            self.setData({
                childList: res.data
            })
            // 当前时间
            let time = new Date();
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let date = time.getDate();
            let gregorian = Lunar.getdateTime(year, month, date); // 星期
            let lunar = Lunar.toLunar(year, month, date); // 农历
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].showCalendar = false;
                res.data[i].gregorian = gregorian;
                res.data[i].lunar = lunar;
                // 获取当前日期的进出记录
                console.log(i)
            }
            self.setData({
                childList: res.data
            });
            self.getInOutLog()
        })
    },

    // 获取当前日期的进出记录
    getInOutLog() {
        let self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
        })
        console.log(self.data.childList)
        for (let i = 0; i < self.data.childList.length; i++) {
            setTimeout(() => {
                let gregorian = self.data.childList[i].gregorian;
                log.inOut(wx.getStorageSync('token'),
                    gregorian.year + '-' + gregorian.month + '-' + gregorian.date,
                    self.data.childList[i].face_id,
                    self.data.childList[i].id,
                    self.data.childList[i].school_id,
                    self.data.childList[i].number,
                    1,
                    10).then(res => {
                    self.data.childList[i].recordsList = res.data.direction;
                    self.setData({
                        childList: self.data.childList
                    });
                })
            }, 2000);
        }

        // log.inOut(wx.getStorageSync('token'), gregorian.year + '-' + gregorian.month + '-' + gregorian.date, 'face_5f561b916830f', '13689', '44', '20190152', 1, 10).then(res => {
        //     self.setData({
        //         recordsList: res.data.direction
        //     });
        // })
    },

    // 跳转更多历史进出记录
    toRecord(e) {
        let history_data = e.currentTarget.dataset.value;
        log.inOut(wx.getStorageSync('token'),
            '',
            history_data.face_id,
            history_data.id,
            history_data.school_id,
            history_data.number,
            1,
            10).then(res => {
            wx.navigateTo({
                url: '../history/history?school_id=' + history_data.school_id + '&number=' + history_data.number + '&student_id=' + history_data.id + '&face_id=' + history_data.face_id
            })
        })

        // log.inOut(wx.getStorageSync('token'), '', 'face_5f561b916830f', '13689', '44', '20190152', 1, 10).then(res => {
        //     wx.navigateTo({
        //         url: '../history/history?school_id=' + 44 + '&number=' + 20190152 + '&student_id=' + 13689 + '&face_id=' + 'face_5f561b916830f'
        //     })
        // })
    },

    // 点击显示日历
    calendar(e) {
        let index = e.currentTarget.dataset.index;
        this.data.childList[index].showCalendar = true;
        this.setData({
            childList: this.data.childList
        });
    },

    // 日历
    dayClick(e) {
        console.log(e)
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
        })
        let index = e.currentTarget.dataset.index;
        let gregorian = Lunar.getdateTime(e.detail.year, e.detail.month, e.detail.day); // 星期
        let lunar = Lunar.toLunar(e.detail.year, e.detail.month, e.detail.day); // 农历
        this.data.childList[index].gregorian = gregorian;
        this.data.childList[index].lunar = lunar;
        // 隐藏日历
        this.data.childList[index].showCalendar = false;
        this.setData({
            childList: this.data.childList
        });
        log.inOut(wx.getStorageSync('token'), gregorian.year + '-' + gregorian.month + '-' + gregorian.date, this.data.childList[index].face_id,
            this.data.childList[index].id,
            this.data.childList[index].school_id,
            this.data.childList[index].number, 1, 10).then(res => {
            this.data.childList[index].recordsList = res.data.direction;
            this.setData({
                childList: this.data.childList
            });
        }).catch(err => {
        })
    },

    // 隐藏日历遮罩弹框
    hideMask: function (e) {
        let index = e.currentTarget.dataset.index;
        this.data.childList[index].showCalendar = false;
        this.setData({
            childList: this.data.childList
        });
    },
})