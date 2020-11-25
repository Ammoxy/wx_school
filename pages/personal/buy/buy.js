 let buy = require('../../../model/my/buy');


 Page({
     data: {
         childList: null,
         child: '',
         school_id: '', // 学校id
         goodsList: null,
         goodsName: '',
         goods_index: '',
         goods_price: '', // 商品价格
         goods_id: '', // 商品id
         user_id: '', // 用户id
         student_id: '' // 学生id
     },
     onLoad(options) {
         this.getChild();
         this.setData({
             user_id: options.user_id
         });

     },
     onShow() {},

     // 查看待支付订单
     getWaitPay() {
         buy.bill(wx.getStorageSync('token'), this.data.school_id, 1, 1, 10).then(res => {
             console.log(res.data)
             if (res.data.length > 0) {
                 wx.showModal({
                     title: '待支付订单',
                     content: '您有' + res.data.length + '笔待付款订单',
                     cancelText: '稍后查看',
                     confirmText: '查看详情',
                     success: (res) => {
                         if (res.confirm) {
                             wx.navigateTo({
                                 url: '../buy/bill/bill?status=1',
                             })
                         } else if (res.cancel) {}
                     }
                 })
             }
         })
     },

     // 获取我的孩子
     getChild() {
         let self = this;
         wx.showToast({
             title: '获取数据中',
             icon: 'none'
         })
         buy.list(wx.getStorageSync('token'), 2).then(res => {
             console.log(res)
             self.setData({
                 childList: res.data,
                 child: res.data[0].name,
                 school_id: res.data[0].school_id,
                 student_id: res.data[0].id
             })
             this.getGoods();
             this.getWaitPay();

         })
     },

     // 选中孩子
     childChange(e) {
         this.setData({
             child: this.data.childList[e.detail.value].name,
             school_id: this.data.childList[e.detail.value].school_id,
             student_id: this.data.childList[e.detail.value].id
         });
         this.getGoods();
     },

     // 获取商品列表
     getGoods() {
         let self = this;
         wx.showToast({
             title: '获取数据中',
             icon: 'none'
         })
         buy.goods(wx.getStorageSync('token'), self.data.school_id).then(res => {
             self.setData({
                 goodsList: res.data.data,
                 goodsName: res.data.data[0].title,
                 goods_id: res.data.data[0].id,
                 goods_price: res.data.data[0].price,
                 goods_index: 0,
             })
         })
     },
     goodsChange(e) {
         let self = this;
         self.setData({
             goodsList: self.data.goodsList,
             goods_index: e.detail.value,
             goodsName: self.data.goodsList[e.detail.value].title,
             goods_id: self.data.goodsList[e.detail.value].id,
             goods_price: self.data.goodsList[e.detail.value].price
         });
     },

     // 生成订单支付
     pay() {
         let self = this;
         if (self.data.school_id && self.data.user_id && self.data.goods_id && self.data.student_id && self.data.goods_price) {
             buy.order(wx.getStorageSync('token'), self.data.school_id, self.data.user_id, self.data.goods_id, self.data.student_id, self.data.goods_price).then(res => {
                 let order_id = res.data;
                 if (order_id > 0) {
                     buy.buyGoods(wx.getStorageSync('token'), order_id).then(res => {
                         console.log(res.data)
                         wx.requestPayment({
                             timeStamp: res.data.timeStamp,
                             nonceStr: res.data.nonceStr,
                             package: res.data.package,
                             signType: 'MD5',
                             paySign: res.data.paySign,
                             success(res) {
                                 wx.showToast({
                                     icon: "none",
                                     title: '购买成功'
                                 });
                                 setTimeout(function () {
                                     wx.switchTab({
                                         url: '/pages/personal/index/index',
                                     })
                                 }, 1500)
                             },
                             fail() {
                                 buy.cancelOrder(wx.getStorageSync('token'), order_id).then(res => {
                                     if (res.data > 0) {
                                         wx.showToast({
                                             icon: "none",
                                             title: '订单已取消'
                                         });
                                     }
                                 })
                             }
                         })
                     })
                 }
             })
         }

     },
     // 账单明细
     toBill() {
         wx.navigateTo({
             url: '../buy/bill/bill?school_id='+ this.data.school_id
         })
     }
 })