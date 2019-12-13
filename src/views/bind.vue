<template>
	<div class="bind">
		<div class="wrapper">
			<div class="content-wrapper">
				<ul>
					<li>
						<span class="must label">
							{{cn?'登录密码设定':'Password'}}：
						</span>
						<input class="input" v-model="pwd" type="password" :placeholder="cn?'输入密码':'Enter password'" />
						<span class="tip hide-m">

							{{cn?'首位字母，字母+数字不少于6位':'Begin with a letter, letter + number no less than 6 figures'}}
						</span>
					</li>
					<li class="tip-box-m hide-p">
						<span class="label"></span>
						<p class=""><span class="tip">
								{{cn?'首位字母，字母+数字不少于6位':'Begin with a letter, letter + number no less than 6 figures'}}
							</span></p>
					</li>
					<li>
						<span class="must label">

							{{cn?'会员类型':'Membership'}}：
						</span>
						<p v-if="home" class="type">
							{{cn?'国内会员':'Domestic Membership'}}
						</p>
						<p v-else class="type">
							{{cn?'国外会员':'Foreign Membership'}}
						</p>
					</li>
					<li class="konw">
						<span class="must label">

							{{cn?'我想了解':'Interested In'}}：
						</span>
						<div class="condition-box">
							<div class="select-item">
								<el-radio-group v-model="businessIndex">
									<el-radio-button v-for="(item, index) in businesses" :label="index">{{ item.company_type_name }}</el-radio-button>
								</el-radio-group>
							</div>
							<div class="select-item select-item2">
								<div class="area-box area-box2" v-for="(obj, i) in knowArr">
									<div class="cr-box">
										<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="country"
										 v-model="obj[0]" :placeholder="cn?'国家':'Country'" @change="getRegion(i)">
											<el-option v-for="(item, index) in countryArr" :key="item.country_id" :label="item.country_name" :value="index"></el-option>
										</el-select>
										<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="area"
										 v-model="obj[1]" :placeholder="cn?'地区':'Region'">
											<el-option v-for="(item, index) in knowRegionArr[i]" :key="item.region_id" :label="item.region_name" :value="index"></el-option>
										</el-select>
										<span v-if="i == knowArr.length - 1 && knowArr.length < 3" @click="addKnow">
											<img class="add-icon" src="../assets/img/pc/btn09.png" alt="" />
										</span>
										<img v-if="i > 0" @click="reduceKnow(i)" class="remove-icon" src="../assets/img/pc/btn10.png" alt="" />
									</div>
								</div>
							</div>
							<div class="select-item">
								<div class="tag-box">
									<el-checkbox-group v-model="checkedIndexs" :min="0" :max="3">
										<el-checkbox v-for="(tag, index) in tags" :label="index" :key="tag.company_type_id">{{ tag.company_type_name }}</el-checkbox>
									</el-checkbox-group>
								</div>
							</div>
						</div>
					</li>
					<li>
						<span class="must label">
							{{cn?'国家/地区':'Country/Region'}}：
						</span>
						<div class="area-box">
							<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="country"
							 v-model="countryIndex" :placeholder="cn?'国家':'Country'" @change="getRegion02">
								<el-option v-for="(item, index) in countryArr" :key="item.country_id" :label="item.country_name" :value="index"></el-option>
							</el-select>
							<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="area"
							 v-model="region_id" :placeholder="cn?'地区':'Region'">
								<el-option v-for="item in regionArr02" :key="item.region_id" :label="item.region_name" :value="item.region_id"></el-option>
							</el-select>
						</div>
					</li>
					<li>
						<span class="must label">
							{{cn?'手机号':'Phone'}}：
						</span>
						<div class="phone-box">
							<span class="prefix-icon">+</span><input class="country-num" v-model="phone_prefix"></input>
							<input class="input phone" v-model="phone" type="text" :placeholder="cn?'输入手机号码':'Enter Mobile number'" />
						</div>
					</li>
					<li>
						<span class="label">
							{{cn?'微信':'WeChat'}}：
						</span>
						<button class="btn btn-bind" @click="bindWechat">

							{{cn?'绑定微信':'Binding WeChat'}}
						</button>

					</li>
					<li>
						<span class="label">
							{{cn?'QQ号':'QQ'}}：
						</span>
						<input class="input" v-model="qq" type="text" :placeholder="cn?'输入QQ账号':'Enter QQ number'" />
					</li>
					<li>
						<span class="label">whatsApp：</span>
						<input class="input" v-model="whatsapp" type="text" :placeholder="cn?'输入whatsApp账号':'Enter whatsApp number'" />
					</li>
					<li>
						<span class="label"></span>
						<p class="tip">
							{{cn?'注：带 * 号为必填选项':'Notes: * is required field'}}：
						</p>
					</li>
				</ul>
				<button class="btn btn-submit" @click="registerHandle">

					{{cn?'提交':'Submit'}}
				</button>
			</div>
			<!-- 微信绑定 -->
			<div class="mask code-mask" v-if="qrCode" @touchmove.prevent = "">
				<div class="content">
					<span class="el-icon el-icon-close close-btn" @click="qrCode = false"></span>
					<h2 class="title">
						{{cn?'请打开微信进行扫码绑定':'Please open WeChat to scan the code for binding'}}
					</h2>
					<img class="code" :src="codeUrl" alt="" />
					<p v-if="mobile" class="tips">
						{{cn?'请微信关注“全球并购公司”公众号后，长按识别本二维码绑定，获取最新信息':'Please follow WeChat Subscription “Global Company Sales” , then long press to identiry this QR code to obtain the latest information.'}}
					</p>
					<p v-else class="tips">
						{{cn?'请微信关注“全球并购公司”公众号后扫描本二维码绑定，获取最新信息':'Please follow WeChat Subscription “Global Company Sales” , then scan this QR code to subscribe and obtain the latest information.'}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// import urls from '../api/index.js';
	export default {
		name: 'bind',
		data() {
			return {
				// 了解国家地区二维数组
				knowArr: [
					[]
				],
				knowRegionArr: [
					[]
				],
				mobile: true,
				home: 1,
				pwd: '',
				know_business_type: [],
				know_industry_type: [],
				know_area: [],
				countryIndex: null,
				country_id: '',
				region_id: '',
				phone_prefix: '',
				phone: '',
				qq: '',
				whatsapp: '',
				wx_code: '',
				company: '',
				select: false,
				qrCode: false,
				countryArr: [],
				regionArr01: [],
				regionArr02: [],
				checkedIndexs: [],
				tags: [],
				// 企业类型下标
				businessIndex: null,
				// 所有企业类型Arr
				businesses: [],
				// 二维码地址
				codeUrl: ''
			};
		},
		watch: {
			// 想了解的国家地区
			checkedCountryIndexs() {
				// 莫名其妙等于3  手动给空
				this.checkedRegionIndexs = null;
				let country = this.countryArr[this.checkedCountryIndexs];
				let region = this.regionArr01[this.checkedRegionIndexs];
				if (!region) {
					region = {
						region_id: '',
						region_name: ''
					};
				}
				this.know_area[0] = Object.assign(country, region);
			},
			checkedRegionIndexs() {
				let country = this.countryArr[this.checkedCountryIndexs];
				let region = this.regionArr01[this.checkedRegionIndexs];
				if (!region) {
					region = {
						region_id: '',
						region_name: ''
					};
				}
				this.know_area[0] = Object.assign(country, region);
			},
			// 企业类型
			businessIndex() {
				this.know_business_type[0] = this.businesses[this.businessIndex];
			},
			// 行业标签变化
			checkedIndexs() {
				var arr = [];
				this.checkedIndexs.forEach(item => {
					arr.push(this.tags[item]);
				});
				this.know_industry_type = arr;
			},
			// 自己的国家下标
			countryIndex() {
				this.country_id = this.countryArr[this.countryIndex].country_id;
			}
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			addKnow() {
				this.knowArr.push([]);
				this.knowRegionArr.push([]);
			},
			reduceKnow(index) {
				this.knowArr.splice(index, 1);
				this.knowRegionArr.splice(index, 1);
			},
			// 是否国内
			getHome() {
				this.$get(urls.isHome, {}).then(res => {
					this.loadEnd();
					this.home = res.data.home;
				});
			},
			// 获取地区（想知道）
			getRegion(index) {
				this.$set(this.knowArr, index, [this.knowArr[index][0]]);
				this.$set(this.knowRegionArr, index, []);
				this.$get(urls.area, {
					country_id: this.countryArr[this.knowArr[index][0]].country_id
				}).then(res => {
					this.loadEnd();
					this.$set(this.knowRegionArr, index, res.data.region);
					console.log(res);
				});
			},
			// 获取地区个人
			getRegion02() {
				this.region_id = '';
				setTimeout(() => {
					this.$get(urls.area, {
						country_id: this.country_id
					}).then(res => {
						this.loadEnd();
						this.regionArr02 = res.data.region;
						console.log(res);
					});
				}, 100);
			},
			// 获取国家
			getCountry() {
				this.$get(urls.area, {
					language: 'cn',
					country_id: 0
				}).then(res => {
					this.loadEnd();
					this.countryArr = res.data.country;
					console.log(res);
				});
			},
			// 绑定微信
			bindWechat() {
				this.qrCode = true;
			},
			// 获取企业
			getBusiness() {
				this.$get(urls.companyType, {
					parent_type: 'business'
				}).then(res => {
					this.loadEnd();
					this.businesses = res.data;
					console.log(res);
				});
			},
			// 获取行业
			getIndustry() {
				this.$get(urls.companyType, {
					parent_type: 'industry'
				}).then(res => {
					this.loadEnd();
					this.tags = res.data;
					console.log(res);
				});
			},
			// 注册 校验
			registerHandle() {
				this.know_area = [];
				this.knowArr.forEach((obj, i) => {
					if (obj.length == 0) {
						return false;
					}
					let country = this.countryArr[obj[0]];
					let region = null;
					if (obj.length < 2) {
						region = {
							region_id: '',
							region_name: ''
						};
					} else {
						region = this.knowRegionArr[i][obj[1]];
					}
					this.know_area.push(Object.assign(country, region));
				});
				if (this.nullTest(this.pwd)) {
					this.cn ? this.errorToast('密码不能为空') : this.errorToast('Please enter password');
					return false;
				}
				if (!(this.know_business_type.length && this.know_industry_type.length && this.know_area.length)) {
					this.cn ? this.errorToast('请选择想了解的参数') : this.errorToast('Please select the parameters you want to know');
					return false;
				}
				if (this.countryIndex == null) {
					this.cn ? this.errorToast('请选择所在的国家') : this.errorToast('Please select your country');
					return false;
				}
				if (this.nullTest(this.phone_prefix)) {
					this.cn ? this.errorToast('手机号码前缀不能为空') : this.errorToast('Please enter mobile number prefix');
					return false;
				}
				if (this.nullTest(this.phone)) {
					this.cn ? this.errorToast('手机号码不能为空') : this.errorToast('Please enter mobile number');
					return false;
				}
				if (!this.passwordTest(this.pwd)) {
					this.cn ? this.errorToast('密码格式有误') : this.errorToast('Incorrect password format');
					return false;
				}
				this.$post(urls.register, {
						pwd: this.md5(this.pwd),
						know_business_type: this.know_business_type,
						know_industry_type: this.know_industry_type,
						know_area: this.know_area,
						country_id: this.country_id,
						region_id: this.region_id,
						phone_prefix: this.phone_prefix,
						phone: this.phone,
						qq: this.qq,
						whatsapp: this.whatsApp,
						wx_code: ''
					})
					.then(() => {
						this.loadEnd();
						this.$router.replace({
							path: '/register-success'
						});
					})
					.catch(err => {
						this.errorToast(err.data.msg);
						this.loadEnd();
						console.log(err);
					});
			}
		},
		created() {
            let language = localStorage.getItem('language')||'cn'
			if (window.screen.width > 750) {
				this.mobile = false;
            	this.codeUrl = "http://www.gcsgou.com/api/api/wx_account/qrcode_img?kinds=reg&device=pc&language="+language
			} else{
				this.codeUrl = "http://www.gcsgou.com/api/api/wx_account/qrcode_img?kinds=reg&device=mobile&language="+language
			}
			this.getCountry();
			this.getIndustry();
			this.getBusiness();
			this.getHome();
		}
	};
</script>
<style lang="less" scoped>
	.area-box2 {
		display: block;
		margin-bottom: 20px;
	}

	.select-item2 {
		display: block !important;
	}

	.cr-box {
		display: inline-block;
		position: relative;
	}

	.remove-icon {
		width: 15px;
		height: 15px;
		position: absolute;
		top: -7px;
		left: 176px;
	}
</style>
