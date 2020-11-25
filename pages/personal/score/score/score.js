let score = require('../../../../model/my/score');

Page({
    data: {
        childList: null,
        child: '',
        achievementList: null, //成绩列表
        scoresList: [], // 各科成绩
        showScore: false,
        totalScore: '',
        title: ''
    },

    onLoad() {
        this.getChild();
    },

    // 获取我的孩子
    getChild() {
        let self = this;
        wx.showToast({
          title: '获取数据中',
          icon: 'none'
        })
        score.list(wx.getStorageSync('token'), 2).then(res => {
            console.log(res)
            self.setData({
                childList: res.data,
                child: res.data[0].name
            });
            self.getAchievement(res.data[0].number, res.data[0].school_id, res.data[0].id);
        })
    },

    // 选中孩子
    childChange(e) {
        this.setData({
            child: this.data.childList[e.detail.value].name
        });
        this.getAchievement(this.data.childList[e.detail.value].number, this.data.childList[e.detail.value].school_id, this.data.childList[e.detail.value].id);
    },

    getAchievement(number, school_id, student_id) {
        let self = this;
        wx.showToast({
            title: '获取数据中',
            icon: 'none'
          })
        score.results(wx.getStorageSync('token'), number, school_id, student_id).then(res => {
            self.setData({
                achievementList: res.data.data
            })
        })
    },

    // 显示各科成绩
    showScores(e) {
        var self = this;
        self.setData({
            scoresList: e.currentTarget.dataset.scores,
            totalScore: e.currentTarget.dataset.score,
            title: e.currentTarget.dataset.title,
            showScore: true
        })
    },

    // 隐藏各科成绩
    close() {
        var self = this;
        self.setData({
            showScore: false
        })
    }
})