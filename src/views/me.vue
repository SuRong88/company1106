<template>
	<div class="me">
		<!-- 1pc -->
		<div class="wrapper hide-m flex-lg">
			<div class="nav">
				<ul class="user-box">
					<li class="name">{{cn?'你好':'Hello'}}，{{ user.member_name }}</li>
					<li class="email">{{ user.email }}</li>
					<li class="range">{{ user.member_home }}</li>
					<!-- 会员 -->
					<template v-if="vip">
						<router-link to="/me/vip-info" class="vip" tag="li">{{ user.member_vip_level }}</router-link>
						<li class="date">{{cn?'有效期至':'Valid Until'}}：{{ user.member_vip_expire }}</li>
					</template>
					<!-- 非会员 -->
					<template v-else>
						<router-link to="/me/vip-info" class="novip" tag="li">{{ user.member_vip_level }}</router-link>
						<li class="buy-vip" @click="getPrice">{{cn?'购买VIP':'Purchase VIP'}}</li>
					</template>
				</ul>
				<dl>
					<dt>
						<img class="icon" src="../assets/img/pc/icon08.png" alt="" />
						{{cn?'账号及信息管理':'Account'}}
					</dt>
					<router-link to="/me/info" tag="dd">{{cn?'账号信息':'Information'}}</router-link>
					<router-link to="/me/safety" tag="dd">{{cn?'账号安全':'Security'}}</router-link>
					<dt>
						<img class="icon" src="../assets/img/pc/icon09.png" alt="" />
						{{cn?'出售公司管理':'Sale Management'}}
					</dt>
					<router-link to="/me/sale-publish" tag="dd">{{cn?'发布出售公司':'Sale company'}}</router-link>
					<router-link to="/me/sale-list?page=1&limit=12&company_states=wait" tag="dd">{{cn?'出售公司列表':'Sale list'}}</router-link>
					<dt>
						<img class="icon" src="../assets/img/pc/icon10.png" alt="" />
						{{cn?'订单管理':'Order Management'}}
					</dt>
					<router-link to="/me/order-manage?page=1&limit=12&order_type=" tag="dd">{{cn?'订单管理':'Order'}}</router-link>
					<router-link to="/me/collect?page=1&limit=12" tag="dd">{{cn?'收藏管理':'Bookmark'}}</router-link>
				</dl>
			</div>
			<div class="screen">
				<router-view></router-view>
				<div class="mask buy-mask" v-if="buy" @touchmove.prevent = "">
					<div class="content">
						<span class="el-icon el-icon-close close-btn" @click="buy = false"></span>
						<p class="tip1">{{cn?'提示':'Tips'}}</p>
						<ul class="price-box">
							<li class="price-item" :class="{ active: index == 0 }" @click="change(0)">
								<p class="time">{{cn?'季度':'Quarterly'}}</p>
								<p class="price">
									<span class="s">{{ prices[0] }}</span>
								</p>
							</li>
							<li class="price-item" :class="{ active: index == 1 }" @click="change(1)">
								<p class="time">{{cn?'半年':'Semi-Annual'}}</p>
								<p class="price">
									<span class="s">{{ prices[1] }}</span>
								</p>
							</li>
							<li class="price-item" :class="{ active: index == 2 }" @click="change(2)">
								<p class="time">{{cn?'一年':'Annual'}}</p>
								<p class="price">
									<span class="s">{{ prices[2] }}</span>
								</p>
							</li>
						</ul>
						<p class="tip2">{{cn?'成为VIP免费查看所有信息':'Become VIP and View All Information For Free'}}</p>
						<button class="buy-btn" @click="payOrder">{{cn?'开通':'Register'}}</button>
					</div>
				</div>
			</div>
		</div>
		<!-- 2移动端 -->
		<div class="hide-p">
			<ul class="me-hd">
				<li class="name">{{cn?'你好':'Hello'}}，{{ user.member_name }}</li>
				<li class="nav-item-hide" :class="{'nav-item-show':spread}">{{ navItems[activeIndex] }}</li>
				<li class="type">
					<span class="vip-home">（{{ user.member_home }}）</span>
					<router-link @click.native="changeNavItem(0)" to="/me/vip-info" class="novip" :class="{ vip: vip }" tag="span">{{ user.member_vip_level }}</router-link>
				</li>
			</ul>
			<div class="spread-box" :class="{spread:spread,unspread:!spread}">
				<ul class="me-info">
					<li class="email">{{ user.email }}</li>
					<li class="date" v-if="vip">{{cn?'有效期至':'Valid Until'}}：{{ user.member_vip_expire }}</li>
					<li v-else class="buy-btn" @click="getPrice">{{cn?'购买VIP':'Purchase VIP'}}</li>
				</ul>
				<ul class="me-nav">
					<router-link @click.native="changeNavItem(1)" to="/me/info" tag="li">{{cn?'账号信息':'Information'}}</router-link>
					<router-link @click.native="changeNavItem(2)" to="/me/sale-publish" tag="li">{{cn?'发布出售公司':'Sale company'}}</router-link>
					<router-link @click.native="changeNavItem(3)" to="/me/order-manage?page=1&limit=10&order_type=" tag="li">{{cn?'订单管理':'Order'}}</router-link>
					<router-link @click.native="changeNavItem(4)" to="/me/safety" tag="li">{{cn?'账号安全':'Security'}}</router-link>
					<router-link @click.native="changeNavItem(5)" to="/me/sale-list?page=1&limit=10&company_states=wait" tag="li">{{cn?'出售公司列表':'Sale list'}}</router-link>
					<router-link @click.native="changeNavItem(6)" to="/me/collect?page=1&limit=10" tag="li">{{cn?'收藏管理':'Bookmark'}}</router-link>
				</ul>
			</div>
			<div class="spread-icon-box" @click="spreadHandle">
				<img v-if="spread" class="spread-icon" src="../assets/img/m/btn09.png" alt="" />
				<img v-else class="spread-icon" src="../assets/img/m/btn08.png" alt="" />
			</div>
			<div class="screen-m">
				<router-view></router-view>
				<div class="mask buy-mask" v-if="buy">
					<div class="content">
						<span class="el-icon el-icon-close close-btn" @click="buy = false"></span>
						<p class="tip1">{{cn?'提示':'Tips'}}</p>
						<ul class="price-box">
							<li class="price-item" :class="{ active: index == 0 }" @click="change(0)">
								<p class="time">{{cn?'季度':'Quarterly'}}</p>
								<p class="price">
									<span class="s">{{ prices[0] }}</span>
								</p>
							</li>
							<li class="price-item" :class="{ active: index == 1 }" @click="change(1)">
								<p class="time">{{cn?'半年':'Semi-Annual'}}</p>
								<p class="price">
									<span class="s">{{ prices[1] }}</span>
								</p>
							</li>
							<li class="price-item" :class="{ active: index == 2 }" @click="change(2)">
								<p class="time">{{cn?'一年':'Annual'}}</p>
								<p class="price">
									<span class="s">{{ prices[2] }}</span>
								</p>
							</li>
						</ul>
						<p class="tip2">{{cn?'成为VIP免费查看所有信息':'Become VIP and View All Information For Free'}}</p>
						<button class="buy-btn" @click="payOrder">{{cn?'开通':'Register'}}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from '../api/index.js';
	const cnNavItems = ['会员信息', '账号信息', '发布出售公司', '订单管理', '账号安全', '出售公司列表', '收藏管理']
	const enNavItems = ['Member Information', 'Account Information', 'Post Company for Sale', 'Order Management',
		'Account Security', 'List of Companies for Sale', 'Bookmark Management'
	]
	export default {
		name: 'me',
		data() {
			return {
				// 移动端导航栏展开
				spread: true,
				// 导航栏name数组
				navItems: cnNavItems,
				// 手机端导航
				activeIndex: 0,
				// 价格下标
				index: 0,
				// 会员价格
				prices: [],
				buy: false
			};
		},
		methods: {
			// 开通 付款
			payOrder() {
				this.buy = false;
				this.$store.state.payInfo[this.index] = this.prices[this.index];
				console.log(this.$store.state.payInfo);
				this.$router.push({
					path: '/buy'
				});
			},
			// 价格
			change(num) {
				this.index = num;
				// 0~3
				this.$store.state.payInfo = ['', '', '', '', '', ''];
				this.$store.state.payInfo[num] = this.prices[num];
				console.log(this.$store.state.payInfo);
			},
			// 获取会员价格
			getPrice() {
				this.buy = true;
				this.$get(urls.priceView, {})
					.then(res => {
						this.loadEnd();
						// 获取前三个就够了
						this.prices.push(res.data['90_vip_price']);
						this.prices.push(res.data['180_vip_price']);
						this.prices.push(res.data['360_vip_price']);
					})
					.catch(err => {
						this.loadEnd();
						this.errorToast(err.data.msg);
					});
			},
			spreadHandle() {
				this.spread = !this.spread
			},
			// 手机端 导航name
			changeNavItem(index) {
				this.activeIndex = index;
			},
			checkRouter() {
				console.log(this.$route);
				this.navItems = this.cn ? cnNavItems : enNavItems
				switch (this.$route.path) {
					case '/me/vip-info':
						this.activeIndex = 0;
						break;
					case '/me/info':
						this.activeIndex = 1;
						break;
					case '/me/sale-publish':
						this.activeIndex = 2;
						break;
					case '/me/order-manage':
						this.activeIndex = 3;
						break;
					case '/me/safety':
						this.activeIndex = 4;
						break;
					case '/me/sale-list':
						this.activeIndex = 5;
						break;
					case '/me/collect':
						this.activeIndex = 6;
						break;
					default:
						this.activeIndex = 0;
				}
			}
		},
		computed: {
			user() {
				return this.$store.state.userInfo;
			},
			vip() {
				return this.$store.state.userInfo.member_vip_expire != '';
			},
			cn() {
				return this.$store.state.language == 'cn';
			},
		},
		created() {
			this.checkRouter();
		}
	};
</script>

<style></style>
