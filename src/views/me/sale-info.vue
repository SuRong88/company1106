<template>
	<div class="company-info">
		<!-- 出售公司详情查看 -->
		<div class="title">
			{{cn?'出售公司详情':'Sold Company Details'}}</div>
		<div class="content">
			<h1 class="subtitle">
				{{cn?'公司信息':'Company Information'}}
			</h1>
			<ul class="detail">
				<li>
					<span class="label">
						{{cn?'公司名称':'Name'}}：</span>
					<span>{{companyInfo.company_name}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'售价':'Price'}}：</span>
					<span>{{companyInfo.company_price}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'公司收入':'Company Revenue'}}：</span>
					<span>{{companyInfo.income}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'公司负债':'Company Debt'}}：</span>
					<span>{{companyInfo.debt}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'行业标签':'Industries'}}：</span>
					<p class="tag-box">
						<span class="tag" v-for="item in companyInfo.industry_type_lists">
							<img src="../../assets/img/pc/icon17.png" alt="">
							{{item.company_type_name}}
						</span>
					</p>
				</li>
				<li>
					<span class="label">
						{{cn?'企业类型':'Type'}}：</span>
					<span v-for="item in companyInfo.business_type_lists">
						{{item.company_type_name}}
					</span>
				</li>
				<li>
					<span class="label">
						{{cn?'地点':'Address'}}：</span>
					<span>
						{{companyInfo.country_name}},{{companyInfo.region_name}}
					</span>
				</li>
				<li>
					<span class="label">
						{{cn?'成立时间':'Established On'}}：</span>
					<span>{{lifeYear}}
						{{cn?'年':'Years'}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'出售原因':'Selling Reasons'}}：</span>
					<span>
						{{companyInfo.sell_reason}}
					</span>
				</li>

				<li>
					<span class="label">
						{{cn?'公司简介':'Profile'}}：</span>
					<span>
						{{companyInfo.descs}}
					</span>
				</li>
				<li>
					<span class="label">
						{{cn?'经营范围':'Scope of Business'}}：</span>
					<span>
						{{companyInfo.scope}}
					</span>
				</li>
				<li class="noflex-li">
					<span class="label mb22">
						{{cn?'公司照片':'Company Photos'}}：</span>
					<div class="img-box img-box1">
						<img v-for="item in companyInfo.imgs" :src="item.img_path" alt="">
					</div>
				</li>
				<li class="noflex-li">
					<span class="label mb22">
						{{cn?'营业证明':'Business Certificate'}}：</span>
					<div class="img-box img-box2">
						<img v-for="item in companyInfo.license_imgs" :src="item.img_path" alt="">
					</div>
				</li>
				<li class="noflex-li">
					<span class="label mb22">
						{{cn?'行业证书':'Industry Certificate'}}：</span>
					<div class="img-box img-box3">
						<img v-for="item in companyInfo.certificate_imgs" :src="item.img_path" alt="">
					</div>
				</li>
			</ul>
			<div class="service-box" v-if="vip&&companyInfo.service_commissioner">
				<h1 class="name udl">
					{{cn?'服务专员信息':'Service Representative Information '}}</h1>
				<div class="main">
					<img class="avatar" src="../../assets/img/pc/icon14.png" alt="">
					<ul class="main-c">

						<li class="main-item">
							<img class="icon" src="../../assets/img/pc/icon18.png" alt="">
							<span class="item-name">
								{{cn?'服务专员':'Service Representative'}}：</span>
							{{companyInfo.service_commissioner.name}}
						</li>
						<li class="main-item">
							<img class="icon" src="../../assets/img/pc/icon19.png" alt="">
							<span class="item-name">
								{{cn?'手机':'Mobile Phone'}}：</span>
							{{companyInfo.service_commissioner.phone}}
						</li>
						<li class="main-item">
							<img class="icon" src="../../assets/img/pc/icon20.png" alt="">
							<span class="item-name">
								{{cn?'邮箱':'E-mail'}}：</span>
							{{companyInfo.service_commissioner.email}}
						</li>

					</ul>
				</div>
				<div class="about-box">
					<h1 class="name mb22"><img class="icon" src="../../assets/img/pc/icon21.png" alt="">
						{{cn?'行业经验与履历':'Professional Experience and Resume'}}：</h1>
					<p class="desc">
						{{companyInfo.service_commissioner.experience}}
					</p>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	// import urls from '../../api/index.js'
	export default {
		data() {
			return {
				companyInfo: {
					"service_commissioner": {
						"id": "",
						"name": "",
						"phone": "",
						"email": "",
						"experience": ""
					}
				},
				lifeYear: 0
			}
		},
		computed: {
			vip() {
				return this.$store.state.userInfo.member_vip_expire != '0'
			},
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			// 查看出售公司详情
			getCompanyInfo() {
				this.$get(urls.sellInfoDetail, {
						company_id: this.$route.query.company_id
					})
					.then(res => {
						this.loadEnd();
						console.log(res);
						this.companyInfo = res.data;
						this.lifeYear = new Date().getFullYear() - res.data.life_year;
					})
					.catch(err => {
						this.loadEnd();
						console.log(err);
					});
			},
		},
		created() {
			this.getCompanyInfo()
		}
	};
</script>

<style></style>
