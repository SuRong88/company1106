<template>
	<div class="order-info company-info">
		<div class="title">{{ cn ? '订单详情' : 'Oder Details' }}</div>
		<div class="content">
			<h1 class="subtitle">{{ cn ? '公司信息' : 'Company Informations' }}</h1>
			<ul class="detail">
				<li>
					<span class="label">{{ cn ? '公司名称' : 'Name' }}：</span>
					<span>{{ companyInfo.company_name }}</span>
				</li>
				<li>
					<span class="label">{{ cn ? '售价' : 'Price' }}：</span>
					<span>{{ companyInfo.company_price }}</span>
				</li>
				<li>
					<span class="label">{{ cn ? '公司收入' : 'Company Revenue' }}：</span>
					<span>{{ companyInfo.income }}</span>
				</li>
				<li>
					<span class="label">{{ cn ? '公司负债' : 'Company Debt' }}：</span>
					<span>{{ companyInfo.debt }}</span>
				</li>
				<li>
					<span class="label">{{ cn ? '行业标签' : 'Industries' }}：</span>
					<p class="tag-box">
						<span class="tag" v-for="item in companyInfo.industry_type_lists">
							<img src="../../assets/img/pc/icon17.png" alt="" />
							{{ item.company_type_name }}
						</span>
					</p>
				</li>
				<li>
					<span class="label">{{ cn ? '企业类型' : 'Type' }}：</span>
					<span v-for="item in companyInfo.business_type_lists">{{ item.company_type_name }}</span>
				</li>
				<li>
					<span class="label">{{ cn ? '地点' : 'Address' }}：</span>
					<span>{{ companyInfo.country_name }},{{ companyInfo.region_name }}</span>
				</li>
				<li>
					<span class="label">{{ cn ? '成立时间' : 'Established On' }}：</span>
					<span>{{ lifeYear }}{{ cn ? '年' : 'Years' }}</span>
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
				<li>
					<span class="label">{{ cn ? '公司照片' : 'Company Photos' }}：</span>
					<div class="img-box img-box1">
						<!-- <img src="../../assets/img/pc/4_image07.png" alt=""> -->
						<img v-for="item in companyInfo.imgs" :src="item.img_path" alt="" />
					</div>
				</li>
			</ul>
			<div class="po-box">
				<div class="platform">
					<span class="label">{{ cn ? '联系平台' : 'Contact Information' }}</span>
					<ul>
						<li><input v-model="name" type="text" :placeholder="cn ? '联系人姓名' : 'Name of Contact Person'" /></li>
						<li><input v-model="phone" type="text" :placeholder="cn ? '联系人电话' : 'Contact Number'" /></li>
						<li><input v-model="email" type="text" :placeholder="cn ? '联系人邮箱' : 'Contact E-mail'" /></li>
					</ul>
					<button class="submit-btn" @click="contactService">{{ cn ? '提交' : 'Submit' }}</button>
				</div>
				<!-- 不是vip不显示联系客服  customer_service也是空对象-->
				<div class="official" v-if="vip">
					<span class="label">{{ cn ? '联系客服' : 'Contact Customer Service' }}</span>
					<ul>
						<li @click="tipHandle" v-if="companyInfo.customer_service.length > 0" v-for="(item, index) in companyInfo.customer_service">
							<template v-if="index == 0">
								<a :href="'skype:' + item.numbers + '?chat'" class="skype qq-service">
									<img class="img" src="../../assets/img/pc/icon04.png" alt="" />
									<p>
										<span>{{ item.numbers }}</span>
										<span>{{ item.descs }}</span>
									</p>
								</a>
							</template>
							<template v-else>
								<a class="qq-service" :href="'tencent://message/?uin=' + item.numbers + '&Site=&Menu=yes'">
									<img class="img" src="../../assets/img/pc/icon03.png" alt="" />
									<p>
										<span>{{ item.numbers }}</span>
										<span>{{ item.descs }}</span>
									</p>
								</a>
							</template>
						</li>
						<li class="tip hide-p" style="color: #666; font-size: 1rem;">
							{{cn?'提示：微信环境下，请打开Skype/QQQQ手动添加客服':'Tips:In Wechat ， please open Skype/QQ and add customer service manually'}}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from '../../api/index.js';
	export default {
		// 订单详情  就是公司详情
		name: 'orderInfo',
		data() {
			return {
				activeIndex: 0,
				name: '',
				phone: '',
				email: '',
				companyInfo: {},
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
						this.errorToast('提示：微信环境下，请打开Skype/QQQQ手动添加客服')
					} else {
						this.errorToast('Tips:In Wechat ， please open Skype/QQ and add customer service manually')
					}
				}
			},
			// 订单详情和公司详情一样的接口
			getCompanyInfo() {
				this.$get(urls.companyInfo, {
						company_id: this.$route.query.company_id
					})
					.then(res => {
						console.log(res);
						this.loadEnd();
						// 公司下线
						if (!res.data.is_online) {
							this.$router.replace({
								path: '/offline'
							});
							return false;
						}
						this.lifeYear = new Date().getFullYear() - res.data.life_year;
						this.companyInfo = res.data;
					})
					.catch(err => {
						this.loadEnd();
						console.log(err);
					});
			},
			// 联系客服
			contactService() {
				if (this.nullTest(this.name)) {
					this.cn ? this.errorToast('名字不能为空') : this.errorToast('Name cannot be empty');;
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
					this.cn ? this.errorToast('邮箱格式有误') : this.errorToast('Incorrect e-mail format ');
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
						this.cn ? this.successToast('提交成功') : this.successToast('Submit Successfully');
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
				this.$post(urls.collect, {
						company_id: this.companyInfo.company_id,
						is_collect: !this.companyInfo.is_collect
					})
					.then(res => {
						this.loadEnd();
						this.cn ? this.successToast('操作成功') : this.successToast('Action Succeeded');
						this.companyInfo.is_collect = !this.companyInfo.is_collect;
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
			}
		},
		created() {
			this.getCompanyInfo();
		}
	};
</script>

<style></style>
