 let buy = require('../../../model/my/buy');
 var app = getApp()
 let child = require('../../../model/my/child');

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
         student_id: '', // 学生id,
         isBind: false,
         is_check_pay: '',
         infoData: null,
         grade_type: null,
         total: 0
     },
     onLoad(options) {
         this.setData({
             user_id: app.globalData.user_id
         });

         if (options.info) {
             console.log(JSON.parse(options.info));
             this.setData({
                 student_id: JSON.parse(options.info).id,
                 school_id: JSON.parse(options.info).school_id,
                 isBind: true,
                 is_check_pay: JSON.parse(options.info).schoolData.is_check_pay,
                 infoData: JSON.parse(options.info),
                 grade_type: JSON.parse(options.info).grade_type
             })
             this.getGoods(this.data.school_id);
         } else {
             this.getChild();
         }
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
                 student_id: res.data[0].id,
                 grade_type: res.data.grade_type
             })
             this.getGoods(self.data.school_id);
             this.getWaitPay();

         })
     },

     // 选中孩子
     childChange(e) {
         this.setData({
             child: this.data.childList[e.detail.value].name,
             school_id: this.data.childList[e.detail.value].school_id,
             student_id: this.data.childList[e.detail.value].id,
             grade_type: this.data.childList[e.detail.value].grade_type,
         });
         this.getGoods(this.data.school_id);
     },

     // 获取商品列表
     getGoods(val) {
         let self = this;
         if (self.data.grade_type == 6) {
             var params = {
                 token: wx.getStorageSync('token'),
                 school: val,
                 student_id: self.data.student_id,
                 type: 1
             }
         } else {
             var params = {
                 token: wx.getStorageSync('token'),
                 school: val,
                 type: 1
             }
         }
         wx.showToast({
             title: '获取数据中',
             icon: 'none'
         })
         console.log(params);

         buy.goods(params).then(res => {
             console.log(res);
             self.setData({
                 goodsList: res.data.data,
                 goods_index: 0,
                 total: res.data.total
             })
             if (res.data.total > 0) {
                 self.setData({
                     goodsName: res.data.data[0].title,
                     goods_id: res.data.data[0].id,
                     goods_price: res.data.data[0].price,
                 })
             } else {
                 self.setData({
                     goodsName: '',
                     goods_id: '',
                     goods_price: '',
                 })
             }
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
                                 if (self.data.is_check_pay == 1) {
                                     //  绑定收费
                                     if (self.data.infoData.face_id == null) {
                                         child.bindChild(wx.getStorageSync('token'), self.data.infoData.number, self.data.infoData.remark, self.data.infoData.cover, self.data.infoData.face_image, 1, self.data.infoData.id).then(res => {
                                             wx.switchTab({
                                                 url: '/pages/personal/index/index',
                                             })
                                         }).catch(err => {})
                                     } else {
                                         wx.switchTab({
                                             url: '/pages/personal/index/index',
                                         })
                                     }
                                 } else {
                                     setTimeout(function () {
                                         wx.switchTab({
                                             url: '/pages/personal/index/index',
                                         })
                                     }, 1500)

                                 }

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
             url: '../buy/bill/bill?school_id=' + this.data.school_id
         })
     }
 })