let WxParse = require('../../../../wxParse/wxParse.js');
let help = require('../../../../model/my/help');

Page({

    data: {

    },

    onLoad: function (options) {
        this.getHelpDocument(options.help_id)
       
    },

    // 获取文档内容
    getHelpDocument: function (val) {
        let self = this;
        wx.showToast({
            title: '获取数据中',
          })
        help.detailHelp(val).then(res => {
            WxParse.wxParse('article', 'html', res.data.detail, self, 5);
            wx.setNavigationBarTitle({
                title: res.data.title //页面标题为路由参数
            });
        });
    }
})