let manage = require('../../../../model/my/manage')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },

    onShow(options) {
        this.getAuditList();
    },

    // 获取审核列表
    getAuditList() {
        let self = this;
        manage.auditList(wx.getStorageSync('token'), 1).then(res => {
            self.setData({
                list: res.data.data
            })
        })
    },

    // 去审核
    toExamine(e) {
        let self = this;
        wx.showModal({
            title: '审核提示',
            content: '是否通过该家长的申请？',
            cancelText: '不通过',
            confirmText: '通过',
            success: function (res) {
                if (res.confirm) {
                    self.throughAudit(e.currentTarget.dataset.studentid);
                } else if (res.cancel) {
                    self.NotThroughAudit(e.currentTarget.dataset.studentid);
                }
            }
        })
    },
    // 通过审核
    throughAudit(val) {
        let self = this;
        manage.audit(wx.getStorageSync('token'), 3, val).then(res => {
            wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 1000
            });
            self.getAuditList();
        });
    },
    // 不通过审核
    NotThroughAudit (val) {
        let self = this;
        manage.audit(wx.getStorageSync('token'), 4, val).then(res => {
            wx.showToast({
                title: '操作成功',
                icon: 'success',
                duration: 1000
            });
            self.getAuditList();
        });
    },

    // 家长信息
    toFamilyDetails(e) {
        let parentData = e.currentTarget.dataset.parent;
        let info = {
            avatarUrl: parentData.avatarUrl,
            nickname: parentData.nickname.replace('&', ' '),
            name: parentData.name,
            sex: parentData.sex,
            phone: parentData.phone,
            id_card: parentData.id_card,
            address: parentData.address,
            remark: parentData.remark,
        };
        wx.navigateTo({
            url: '../parentDetail/parentDetail?data=' + JSON.stringify(info)
        })
    },

    // 学生信息
    toChildrenDetails(e) {
        wx.navigateTo({
            url: '../childDetail/childDetail?id=' + e.currentTarget.dataset.id
        })

    }
})