var child = require('../../../../model/my/child');
var log = require('../../../../model/face/log')
Page({
    data: {
        childList: null,
    },
    onLoad() {

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
        log.listFace(wx.getStorageSync('token'), 1, 2).then(res => {
            console.log(res)
            self.setData({
                childList: res.data
            })
        })
    },
    // 跳转搜索添加孩子
    toSearch: function () {
        wx.navigateTo({
            url: '../../child/search/search'
        })
    },
    // 跳转孩子详细信息
    toChildInfo(e) {
        wx.navigateTo({
            url: '/pages/personal/child/detail/detail?id=' + e.currentTarget.dataset.id
        })
    },
    // 临时出校
    temporaryOut(e) {
        let self = this,
            student_id = e.currentTarget.dataset.studentid;
        wx.showModal({
            title: '提示',
            content: '本次进出权限30分钟后失效',
            success(res) {
                if (res.confirm) {
                    child.out(wx.getStorageSync('token'), student_id).then(res => {
                        wx.showToast({
                            title: '操作成功'
                        })
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })

    },
    // 邀请家庭成员
    inviteMember(e) {
        console.log(e)
        let self = this,
            id = e.currentTarget.dataset.id,
            user_student = e.currentTarget.dataset.userstuid,
            index = e.currentTarget.dataset.index;
            
        self.data.childList[index].family_state = !self.data.childList[index].family_state;
        self.setData({
            childList: this.data.childList
        })
        if (self.data.childList[index].family_state) {
            child.familyInvite(wx.getStorageSync('token'), user_student).then(res => {
                self.data.childList[index].invite_id = res.data;
                // self.data.childList[index].family = res.data;
                // self.setData({
                //     childList: this.data.childList
                // });
            })
            child.familyMember(wx.getStorageSync('token'), id).then(res => {
                self.data.childList[index].family = res.data;
                self.setData({
                    childList: this.data.childList
                });
            })

            console.log(self.data.childList);
            
        }
        
    },

    // 查看家庭成员信息
    toFamilyDetails(e) {
        let parentData = e.currentTarget.dataset.parent;
        console.log(e)
        let info = {
            avatarUrl: parentData.user.avatarUrl,
            nickname: parentData.user.nickname.replace('&', ' '),
            name: parentData.info.name,
            sex: parentData.info.sex,
            phone: parentData.info.phone,
            id_card: parentData.info.id_card,
            address: parentData.info.address,
            remark: parentData.remark,
        };
        wx.navigateTo({
            url: '../../manage/parentDetail/parentDetail?data=' + JSON.stringify(info)
        })
    },

    // 分享
    onShareAppMessage: (e) => {
        console.log(e)
        let id = e.target.dataset.inviteid;
        console.log(222,id)

        if (id != 0) {
            return {
                title: '邀请加入',
                path: '/pages/home/index/index?invite=' + id,

                // path: '../../home/index/index?invite=' + id,
                imageUrl: "http://babihu2018-1256705913.cos.ap-guangzhou.myqcloud.com/bbh/2018/153544840170971.jpg"
            }
        } else {

            wx.showModal({
                title: "提示",
                content: "系统异常！"
            })
            return {
                title: "图巴诺安全中心",
                // cnontent: this.data.summer_theme,
                imageUrl: "http://babihu2018-1256705913.cos.ap-guangzhou.myqcloud.com/bbh/2018/153544840170971.jpg"
            }
        }
    }
})