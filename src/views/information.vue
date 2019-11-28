<template>
	<div class="information">
		<div class="wrapper">
			<el-breadcrumb class="el-breadcrumb" separator-class="el-icon-d-arrow-right">
				<el-breadcrumb-item :to="{ path: '/index' }">{{ cn ? '首页' : 'Home' }}</el-breadcrumb-item>
				<el-breadcrumb-item>{{ cn ? '公司详情' : 'Company Details' }}</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- PC -->
			<div class="pic-box hide-m flex-lg" v-if="companyInfo.imgs.length">
				<div class="left"><img :src="current_img" alt="" /></div>
				<ul class="right">
					<li class="small-img-box" :class="{ active: activeIndex == index }" v-for="(img, index) in companyInfo.imgs"
					 @click="changeActiveIndex(index)">
						<img class="small-img" :src="img.img_path" alt="" />
						<div class="m"></div>
					</li>
				</ul>
			</div>
			<!-- 移动 -->
			<div class="img-box-m hide-p" v-if="companyInfo.imgs.length">
				<swiper :options="swiperOption" ref="mySwiper" class="">
					<swiper-slide v-for="item in companyInfo.imgs"><img class="img" :src="item.img_path" alt="" /></swiper-slide>
				</swiper>
				<div id="swiperP" class="swiper-pagination hide-p"></div>
			</div>
			<div class="brief">
				<h1 class="title">{{ companyInfo.company_name }}</h1>
				<p class="address">{{ companyInfo.country_name }}，{{ companyInfo.region_name }}</p>
				<ul class="tags" v-if="companyInfo.company_type_lists.length > 0">
					<li class="tag" v-for="item in companyInfo.company_type_lists">{{ item.company_type_name }}</li>
				</ul>
				<span class="collect-icon-box cancel-collect" v-if="companyInfo.is_collect" @click="isCollect()">
					<img class="collect-icon " src="../assets/img/pc/btn06.png" alt="" />
					{{ cn ? '已收藏' : 'Bookmarked' }}
				</span>
				<span class="collect-icon-box " v-else @click="isCollect()">
					<img class="collect-icon" src="../assets/img/pc/btn05.png" alt="" />
					{{ cn ? '收藏' : 'Bookmark' }}
				</span>
				<span class="saled" v-if="companyInfo.company_states == 'sold'">{{ cn ? '已出售' : 'Sold' }}</span>
			</div>
			<!-- 是否模糊处理 1是0不是 -->
			<!-- 是 -->
			<template v-if="companyInfo.is_fuzzy">
				<img class="mask-info hide-p" src="../assets/img/m/fuzzy.png" alt="" />
				<img class="mask-info" src="../assets/img/pc/mask.png" alt="" />
			</template>
			<!-- 不是 -->
			<template v-else>
				<ul class="detail">
					<li>
						<span class="label">{{ cn ? '成立时间' : 'Established On' }}：</span>
						<span>{{ lifeYear }}{{ cn ? '年' : 'Years' }}</span>
					</li>
					<li>
						<span class="label">{{ cn ? '出售价格' : 'Price' }}：</span>
						<span class="blue">{{ companyInfo.company_price }}</span>
					</li>
					<li>
						<span class="label">{{ cn ? '公司收入' : 'Company Revenue' }}：</span>
						<span class="green">{{ companyInfo.income }}</span>
					</li>
					<li>
						<span class="label">{{ cn ? '公司负债' : 'Company Debt' }}：</span>
						<span>{{ companyInfo.debt }}</span>
					</li>
					<li>
						<span class="label">{{ cn ? '出售原因' : 'Selling Reasons' }}：</span>
						<span>{{ companyInfo.sell_reason }}</span>
					</li>

					<li>
						<span class="label">{{ cn ? '公司简介' : 'Profile' }}：</span>
						<span>{{ companyInfo.descs }}</span>
					</li>
					<li>
						<span class="label">{{ cn ? '经营范围' : 'Scope of Business' }}：</span>
						<span>{{ companyInfo.scope }}</span>
					</li>
				</ul>
				<div class="platform">
					<span class="label">{{ cn ? '联系平台' : 'Contact Information' }}</span>
					<ul>
						<li><input v-model="name" type="text" :placeholder="cn ? '联系人姓名' : 'Name of Contact Person'" /></li>
						<li><input v-model="phone" type="text" :placeholder="cn ? '联系人电话' : 'Contact Number'" /></li>
						<li><input v-model="email" type="text" :placeholder="cn ? '联系人邮箱' : 'Contact E-mail'" /></li>
						<li class="submit-btn" @click="contactService">{{ cn ? '提交' : 'Submit' }}</li>
					</ul>
				</div>
				<!-- 不是vip不显示联系客服  customer_service也是空对象-->
				<div class="official" v-if="vip">
					<span class="label">{{ cn ? '联系客服' : 'Contact Customer Service' }}</span>
					<ul>
						<li @click="tipHandle" v-if="companyInfo.customer_service.length > 0" v-for="(item, index) in companyInfo.customer_service">
							<template v-if="index == 0">
								<a :href="'skype:' + item.numbers + '?chat'" class="skype qq-service">
									<img class="img" src="../assets/img/pc/icon04.png" alt="" />
									<p>
										<span>{{ item.numbers }}</span>
										<span>{{ item.descs }}</span>
									</p>
								</a>
							</template>
							<template v-else>
								<a class="qq-service" :href="'tencent://message/?uin=' + item.numbers + '&Site=&Menu=yes'">
									<img class="img" src="../assets/img/pc/icon03.png" alt="" />
									<p>
										<span>{{ item.numbers }}</span>
										<span>{{ item.descs }}</span>
									</p>
								</a>
							</template>
						</li>
						<li class="tip hide-p" style="color: #666; font-size: 1rem;">
							{{ cn ? '提示：微信环境下，请打开Skype/QQ手动添加客服' : 'Tips:In Wechat ， please open Skype/QQ and add customer service manually' }}
						</li>
					</ul>
				</div>
			</template>
		</div>
		<div class="purchase-mask" v-if="show" @touchmove.prevent = "">
			<div class="content">
				<p class="title">{{ cn ? '购买查看' : 'Purchase to View' }}</p>
				<div class="main-c">
					<div class="l">
						<ul class="price-box">
							<li class="price-item" :class="{ active: index == 3 }" @click="change(3)">
								<p class="time">{{ cn ? '一条' : 'One Message' }}</p>
								<p class="price">
									<span class="s">{{ prices[3] }}</span>
								</p>
							</li>
						</ul>
						<p class="tip2">{{ cn ? '单条信息查看价格' : 'Price For Viewing One Message' }}</p>
						<button v-if="companyInfo.company_states != 'sold'" class="buy-btn" @click="payInfo">{{ cn ? '购买' : 'Purchase' }}</button>
						<button v-else class="buy-btn">{{ cn ? '该公司已出售' : 'The company had been sold' }}</button>
					</div>
					<div class="r">
						<ul class="price-box">
							<li class="price-item" :class="{ active: index == 0 }" @click="change(0)">
								<p class="time">{{ cn ? '季度' : 'Quarterly' }}</p>
								<p class="price">
									<span class="s">{{ prices[0] }}</span>
								</p>
							</li>
							<li class="price-item" :class="{ active: index == 1 }" @click="change(1)">
								<p class="time">{{ cn ? '半年' : 'Semi-Annual' }}</p>
								<p class="price">
									<span class="s">{{ prices[1] }}</span>
								</p>
							</li>
							<li class="price-item" :class="{ active: index == 2 }" @click="change(2)">
								<p class="time">{{ cn ? '一年' : 'Annual' }}</p>
								<p class="price">
									<span class="s">{{ prices[2] }}</span>
								</p>
							</li>
						</ul>
						<p class="tip2">{{ cn ? '成为VIP免费查看所有信息' : 'Become VIP and View All Information For Free' }}</p>
						<button class="buy-btn" @click="payVip">{{ cn ? '开通' : 'Register' }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from 'api/index.js';
	import Bus from '@/bus/event.js'
	export default {
		name: 'information',
		data() {
			return {
				// 显示购买框
				show: false,
				swiperOption: {
					loop: true,
					speed: 900,
					notNextTick: true,
					autoplay: true,
					preloadImages: false,
					pagination: {
						el: '#swiperP'
					}
				},
				// 当前大图
				current_img: '',
				// 当前大图索引
				activeIndex: 0,
				name: '',
				phone: '',
				email: '',
				companyInfo: {
					company_id: '',
					company_name: '',
					descs: '',
					country_name: '',
					region_name: '',
					company_price: '',
					income: '',
					debt: '',
					sell_reason: '',
					life: '',
					scope: '',
					imgs: [],
					license_imgs: [],
					certificate_imgs: [],
					customer_service: [{
						id: '',
						name: '',
						descs: '',
						img_path: ''
					}],
					is_fuzzy: 1,
					company_states: '',
					company_type_lists: '',
					is_collect: 0
				},
				index: 0,
				prices: [],
				// 今年的年份
				lifeYear: 0
			};
		},
		computed: {
			vip() {
				return this.$store.state.userInfo.member_vip_expire != '';
			},
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			// 手机端提示
			tipHandle() {
				if (window.screen.width <= 750) {
					if (this.cn) {
						this.errorToast('提示：微信环境下，请打开Skype/QQ手动添加客服');
					} else {
						this.errorToast('Tips:In Wechat ， please open Skype/QQ and add customer service manually');
					}
				}
			},
			getCompanyInfo() {
				this.$get(urls.companyInfo, {
						company_id: this.$route.query.company_id
					})
					.then(res => {
						this.loadEnd();
						console.log(res);
						if (!res.data.is_online) {
							this.$router.replace({
								path: '/offline'
							});
							return false;
						}
						this.companyInfo = res.data;
						this.companyInfo.imgs.length && (this.current_img = this.companyInfo.imgs[0].img_path);
						this.lifeYear = new Date().getFullYear() - res.data.life_year;
						// 模糊处理？  获取购买价格
						if (res.data.is_fuzzy) {
							this.getPrice();
							return false;
						}
						console.log(res.data);
					})
					.catch(err => {
						this.errorToast(err.data.msg);
						this.loadEnd();
						console.log(err);
					});
			},
			// 联系客服
			contactService() {
				if (this.nullTest(this.name)) {
					this.cn ? this.errorToast('名字不能为空') : this.errorToast('Please enter name');
					return false;
				}
				if (this.nullTest(this.phone)) {
					this.cn ? this.errorToast('电话不能为空') : this.errorToast('Please enter phone');
					return false;
				}
				if (this.nullTest(this.email)) {
					this.cn ? this.errorToast('邮箱不能为空') : this.errorToast('Please enter e-mail');
					return false;
				}
				if (!this.emailTest(this.email)) {
					this.cn ? this.errorToast('邮箱格式有误') : this.errorToast('Incorrect e-mail format');
					return false;
				}
				this.$post(urls.purchaseContact, {
						company_id: this.companyInfo.company_id,
						name: this.name,
						phone: this.phone,
						email: this.email
					})
					.then(res => {
						this.loadEnd();
						this.cn ? this.successToast('提交成功') : this.successToast('Submitted successfully');
						this.name = '';
						this.phone = '';
						this.email = '';
					})
					.catch(err => {
						this.loadEnd();
						this.errorToast(err.msg);
						console.log(err);
					});
			},
			// 是否收藏
			isCollect() {
				// 直接赋值为何报错?
				var is_collect = this.companyInfo.is_collect ? 0 : 1;
				this.$post(urls.collect, {
						company_id: this.companyInfo.company_id,
						is_collect: is_collect
					})
					.then(res => {
						this.loadEnd();
						this.cn ? this.successToast('操作成功') : this.successToast('Action Succeeded');
						this.companyInfo.is_collect = is_collect;
					})
					.catch(err => {
						this.loadEnd();
						this.errorToast(err.msg);
						console.log(err);
					});
			},
			// 改变图片active
			changeActiveIndex(index) {
				this.activeIndex = index;
				this.current_img = this.companyInfo.imgs[index].img_path;
			},
			// 获取会员价格
			getPrice() {
				this.prices = [];
				this.$get(urls.priceView, {})
					.then(res => {
						this.loadEnd();
						this.show = true;
						// 获取前4个就够了
						this.prices.push(res.data['90_vip_price']);
						this.prices.push(res.data['180_vip_price']);
						this.prices.push(res.data['360_vip_price']);
						this.prices.push(res.data['company_purchase_info_price']);
					})
					.catch(err => {
						this.loadEnd();
						this.errorToast(err.data.msg);
					});
			},
			// 选择购买单条 还是会员
			change(num) {
				this.index = num;
			},
			// 买会员
			payVip() {
				if (this.index == 3) {
					this.index = 0;
					return false;
				}
				this.$store.state.payInfo = ['', '', '', '', '', ''];
				this.$store.state.payInfo[this.index] = this.prices[this.index];
				console.log(this.$store.state.payInfo);
				this.$router.push({
					path: '/buy'
				});
			},
			// 买信息
			payInfo() {
				this.index = 3;
				this.$store.state.payInfo = ['', '', '', this.prices[3], this.companyInfo.company_id];
				console.log(this.$store.state.payInfo);
				this.$router.push({
					path: '/buy'
				});
			}
		},
		created() {
			this.getCompanyInfo();
			Bus.$emit('getNavIndex', -1, -1)
		}
	};
</script>

<style>
	.qq-service {
		display: block;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
</style>
