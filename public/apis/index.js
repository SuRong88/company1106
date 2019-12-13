// 本地模式
var ISLOCAL = 0;
var BASEURL = ISLOCAL ? '/api' : 'http://www.gcsgou.com/api/api';
window.urls = {
	// 4.买卖类
	// 公司列表
	companyList: BASEURL + '/company/lists',
	// 公司详情
	companyInfo: BASEURL + '/company',
	// 联系平台
	purchaseContact: BASEURL + '/purchase_contact',
	// 公司是否收藏（取消与否）
	collect: BASEURL + '/company_collect',
	// 公司收藏列表
	collectList: BASEURL + '/company_collect/lists',
	// 公司出售流程
	sellProcess: BASEURL + '/company_sell_article',
	// 公司出售信息发布
	sellPublish: BASEURL + '/company_sell_info',
	// 公司出售信息列表
	sellInfoList: BASEURL + '/company_sell_info/lists',
	//公司出售信息详情
	sellInfoDetail: BASEURL + '/company_sell_info',
	// 公司出售信息修改
	sellInfoEdit: BASEURL + '/company_sell_info',
	// 支付成功或失败等页面地址，需前端提供
	// 价格查看
	priceView: BASEURL + '/price',
	// 下单(点击购买/开通则下单)
	buyOrder: BASEURL + '/order',
	// 支付方式选择
	buyMethod: BASEURL + '/pay/type',
	// 下单支付页面(重新支付时或出售信息发布后可用)
	buyAgain: BASEURL + '/order/pay',
	// 订单列表
	orderList: BASEURL + '/order/lists',
	// 订单详情
	orderInfo: BASEURL + '/order',
	// 微信下单是否成功
	paySuccess: BASEURL + '/order/paysuccess',
	// 3.账号类
	// 登录
	login: BASEURL + '/user_account/login',
	// 图形验证码
	captcha: BASEURL + '/captcha?t=1',
	// 邮箱验证码
	email: BASEURL + '/email/code',
	// 邮箱验证 注册 验证 新邮箱
	email02: BASEURL + '/email/code',
	// 生成微信二维码(移动)
	codeUrl01: BASEURL + '/account/code_url',
	// 绑定微信二维码图片地址（注意路劲）
	codeUrl02: BASEURL + '/user_account/qrcode_img',
	// 注册
	register: BASEURL + '/user_account/register',
	// 密码重置'
	resetPwd: BASEURL + '/user_account/pwd',
	// 密码修改
	editPwd: BASEURL + '/user_account/pwd',
	// 个人详情
	info: BASEURL + '/member',
	// 个人修改
	infoEdit: BASEURL + '/member',
	// 2.列表文章类
	// .文章列表
	postList: BASEURL + '/article/lists',
	// 文章详情
	postDetail: BASEURL + '/article',
	// 1.通用类
	// 国家地区
	area: BASEURL + '/area/lists',
	// 页面通用
	common: BASEURL + '/page_common',
	// 轮播图
	bannerlist: BASEURL + '/banner/lists',
	// 公司分类
	companyType: BASEURL + '/company_type/lists',
	// 推荐列表
	recommendList: BASEURL + '/recommend/lists',
	// 文件上传
	upload: BASEURL + '/file/webuploader',
	// 图片上传base64
	uploadImg: BASEURL + '/file/base64Upload',
	// 判断国内外
	isHome: BASEURL + '/ip_home',
	// 发布出售协议书
	instruction: BASEURL + '/instruction',
	// 微信sdk 
	wxsdk: BASEURL + '/wx/sdk',
};
