const url = {
    'Login': '/login', // 手机号授权登录
    'UserInfo': '/user/info', // 后台获取个人用户信息
    'Configs': '/configs', // 人脸开关接口

    // 名校风采
    'Banners': '/banners', // 轮播图
    'DocumentTypes': '/document/types', // 资讯分类
    'Documents': '/documents', // 资讯列表
    'Document': '/document', // 资讯详情

    // 公共
    'UserSchools': '/user/schools', // 用户绑定的学校列表
    'Schools': '/schools', // 全部学校列表
    'Grades': '/grades', // 获取班级
    'Classes': '/classes', // 获取班级
    'UserStudent': '/user/student', // 获取孩子列表

    // 我的孩子
    'StudentOut': '/student/out', // 临时出校
    // 'Invite': '/invite', // 家庭成员
    'FamilyMember': '/family/member', // 家庭成员
    'Children': '/children', // 获取孩子列表
    'SearchStudents': '/students', // 搜索孩子
    'Student': '/student', // 获取孩子信息
    'Child': '/child', // 绑定孩子
    'OnlyAccess': '/only/access', // 只允许进校

    // 购买的服务信息
    'UserServes': '/user/serves', // 服务信息
    'ForbiddenProducts': '/forbidden/products', // 查看该用户是否可以购买

    // 购买服务
    'Products': '/products', // 获取商品
    'ProductOrder': '/product/order', // 订单
    'Orders': '/orders', // 购买账单
    'BuyProduct': '/buy/product', // 生成支付
    'PayCancel': '/pay/cancel', // 取消支付

    // 公告
    'ClassNotice': '/class/notice', // 发布/获取（家长）/删除公告
    'ClassNoticeTeacher': '/class/notice/teacher', // 获取公告（教师）

    // 班级管理
    'MyStudents': '/my/students', // 审核列表
    'PassUserStudent': '/pass/user/student', // 审核
    'ClassStudent': '/class/students', // 在校学生

    // 帮助文档
    'HelpDocs': '/help/docs', // 帮助文档
    'HelpDoc': '/help/doc', // 获取文档内容

    // 访客申请
    'Visitor': '/visitor', // 获取我的申请记录
    'Visitors': '/visitors', // 获取所有访客
    'SchoolVisitors': '/school/visitor', // 获取所有访客
    'Workers': '/workers', // 获取选中学校的所有工作者
    'CheckVisitor': '/check/visitor', // 获取选中学校的所有工作者

    // 成绩管理
    'StudentExam': '/student/exam', // 获取学生的成绩

    // 安全校园
    'UserStudentFaceLogs': '/user/student/faceLogs', // 获取学生的进出记录

    // 名校风采
    'AcceptInvite': '/accept/invite', // 接受邀请


    // 商城
    'BannersShop': '/banner/list', // 轮播图
    'Goods': '/good/list', // 获取商品列表
    'GoodDetail': '/good', // 获取商品详情
    'Merchants': '/merchant/list', // 获取商家列表
    'MerchantsDetail': '/merchant', // 获取商家详情

    'Oeders': '/order/list', // 获取订单列表
    'CreateOrder': '/creation/order', // 创建订单
    'Pay': '/pay', // 支付
    'Students': '/user/students', // 孩子

};

module.exports = url;