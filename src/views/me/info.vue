<template>
	<div class="info">
		<div class="title">
			{{cn?'账号信息':'Account Information'}}</div>
		<div class="content-wrapper">
			<ul>
				<li>
					<span class="label">
						{{cn?'用户昵称':'Username'}}</span>
					<input class="input" :class="{editable:edit1}" :readonly="edit1 ? false : 'readonly'" type="text" v-model="user.member_name" />
					<span v-if="!edit1" class="edit-txt" @click="edit1=true">
						{{cn?'修改':'Modify'}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'账号':'Account'}}</span>
					<input class="input" readonly type="text" v-model="user.email" />
				</li>
				<li class="konw">
					<span class="label">
						{{cn?'我想了解':'Interested in'}}</span>
					<div class="condition-box">
						<div class="select-item">
							<el-radio-group v-model="businessIndex">
								<el-radio-button class="disable" :disabled="edit3 ? false : 'disabled'" v-for="(item, index) in businesses"
								 :label="index">{{ item.company_type_name }}</el-radio-button>
							</el-radio-group>
						</div>
						<div class="select-item select-item2">
							<div class="area-box area-box2" v-for="(obj,i) in knowArr">
								<div class="cr-box">
									<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" :disabled="edit3 ? false : 'disabled'"
									 class="country" v-model="obj[0]" :placeholder="cn?'国家':'Country'" @change="getRegion(i)">
										<el-option v-for="(item, index) in countryArr" :key="item.country_id" :label="item.country_name" :value="index"></el-option>
									</el-select>
									<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" :disabled="edit3 ? false : 'disabled'"
									 class="area" v-model="obj[1]" :placeholder="cn?'地区':'Region'">
										<el-option v-for="(item, index) in knowRegionArr[i]" :key="item.region_id" :label="item.region_name" :value="index"></el-option>
									</el-select>
									<span v-if="i==(knowArr.length-1)&&knowArr.length<3" @click="addKnow"><img class="add-icon" src="../../assets/img/pc/btn09.png"
										 alt="" /></span>
									<img v-if="i>0" @click="reduceKnow(i)" class="remove-icon" src="../../assets/img/pc/btn10.png" alt="">
								</div>
							</div>
						</div>
						<div class="select-item">
							<div class="tag-box">
								<el-checkbox-group v-model="tagIndexs" :min="0" :max="3">
									<el-checkbox :disabled="edit3 ? false : 'disabled'" v-for="(tag, index) in tags" :label="index" :key="tag.company_type_id">{{ tag.company_type_name }}</el-checkbox>
								</el-checkbox-group>
							</div>
						</div>
					</div>
					<span v-if="!edit3" class="edit-txt" @click="edit3=true">{{cn?'修改':'Modify'}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'国家/地区':'Country/Region'}}</span>
					<div class="area-box">
						<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="country"
						 v-model="countryIndex2" :placeholder="cn?'国家':'Country'" @change="getRegion02" :disabled="edit4 ? false : 'disabled'">
							<el-option v-for="(item, index) in countryArr" :key="item.country_id" :label="item.country_name" :value="index"></el-option>
						</el-select>
						<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="area"
						 :disabled="edit4 ? false : 'disabled'" v-model="regionIndex2" :placeholder="cn?'地区':'Region'">
							<el-option v-for="(item, index) in regionArr02" :key="item.region_id" :label="item.region_name" :value="index"></el-option>
						</el-select>
					</div>
					<span v-if="!edit4" class="edit-txt" @click="edit4=true">{{cn?'修改':'Modify'}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'手机号':'Phone'}}</span>
					<div class="prefix">
						<span class="prefix-icon">+</span><input class="phone-prefix" :readonly="edit5 ? false : 'readonly'" :class="{editable:edit5}"
						 v-model="user.phone_prefix"></input>
					</div>
					<input class="input input2" :class="{editable:edit5}" :readonly="edit5 ? false : 'readonly'" type="text" v-model="user.phone" />
					<span v-if="!edit5" class="edit-txt" @click="edit5=true">{{cn?'修改':'Modify'}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'QQ号':'QQ'}}</span>
					<input class="input" :class="{editable:edit6}" :readonly="edit6 ? false : 'readonly'" type="text" v-model="user.qq" />
					<span v-if="!edit6" class="edit-txt" @click="edit6=true">{{cn?'修改':'Modify'}}</span>
				</li>
				<li>
					<span class="label">whatsApp</span>
					<input class="input" :class="{editable:edit7}" :readonly="edit7 ? false : 'readonly'" type="text" v-model="user.whatsapp" />
					<span v-if="!edit7" class="edit-txt" @click="edit7=true">{{cn?'修改':'Modify'}}</span>
				</li>
				<li>
					<span class="label">
						{{cn?'微信':'WeChat'}}</span>
					<input class="input" readonly type="text" v-model="status" />
					<span class="edit-txt" @click="qrCode = true">{{cn?'修改':'Modify'}}</span>
				</li>
			</ul>
			<button class="btn btn-confrim" @click="saveHandle">
				{{cn?'确认':'Confirm'}}</button>
		</div>
		<!-- 微信绑定 -->
		<div class="mask code-mask" v-if="qrCode" @touchmove.prevent = "">
			<div class="content">
				<span class="el-icon el-icon-close close-btn" @click="qrCode = false"></span>
				<h2 class="title">
					{{cn?'微信扫描二维码绑定':'Please open WeChat to scan the code for binding'}}</h2>
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
</template>
<script>
	// import urls from "../../api/index.js";
	export default {
		name: "info",
		data() {
			return {
				// 了解国家地区二维数组
				knowArr: [],
				knowRegionArr: [],
				// 是否手机端
				mobile: true,
				// 微信绑定状态
				status: '',
				user: {},
				edit1: false,
				edit2: false,
				edit3: false,
				edit4: false,
				edit5: false,
				edit6: false,
				edit7: false,
				edit8: false,
				select: false,
				qrCode: false,
				business_type: [{}],
				industry_type: [{}],
				area: [{}],
				country_id: "",
				country_name: "",
				region_id: "",
				region_name: "",
				countryIndex1: null,
				regionIndex1: null,
				regionArr01: [],
				countryIndex2: null,
				regionIndex2: null,
				regionArr02: [],
				countryArr: [],
				regionArr01: [],
				regionArr02: [],
				checkedCountryIndexs: null,
				checkedRegionIndexs: null,
				tags: [],
				tagIndexs: [],
				businesses: [],
				businessIndex: null,
				codeUrl: ""
			};
		},
		watch: {
			businessIndex() {
				this.business_type[0] = this.businesses[this.businessIndex];
			},
			// 行业标签变化
			tagIndexs() {
				var arr = [];
				this.tagIndexs.forEach(item => {
					arr.push(this.tags[item]);
				});
				this.industry_type = arr;
			},
			countryIndex2() {
				var country = this.countryArr[this.countryIndex2];
				this.country_id = country.country_id;
				this.country_name = country.country_name;
				if (this.regionIndex2 === null) {
					this.region_id = "";
					this.region_name = "";
				} else {
					var region = this.countryArr[this.regionIndex1];
					this.region_id = region.region_id;
					this.region_name = region.region_name;
				}
			},
			regionIndex2() {
				if (this.regionIndex2 === null) {
					this.region_id = "";
					this.region_name = "";
				} else {
					var region = this.regionArr02[this.regionIndex2];
					this.region_id = region.region_id;
					this.region_name = region.region_name;
				}
			}
		},
		methods: {
			addKnow() {
				if (!this.edit3) {
					return false
				}
				this.knowArr.push([])
				this.knowRegionArr.push([])
			},
			reduceKnow(index) {
				if (!this.edit3) {
					return false
				}
				this.knowArr.splice(index, 1)
				this.knowRegionArr.splice(index, 1)
			},
			// 是否国内
			getHome() {
				this.$get(urls.isHome, {}).then(res => {
					this.loadEnd();
					this.home = res.data.home;
				});
			},
			// 获取地区（想知道）  添加时
			getRegion(index) {
				this.$set(this.knowArr, index, [this.knowArr[index][0]]);
				this.$set(this.knowRegionArr, index, []);
				this.$get(urls.area, {
					country_id: this.countryArr[this.knowArr[index][0]].country_id
				}).then(res => {
					this.loadEnd();
					this.$set(this.knowRegionArr, index, res.data.region);
				});
			},
			editHandle(index) {
				this.edit[index] = 0
				console.log(index)
				console.log(this.edit[index])
			},
			selectHandle() {
				this.select = !this.select;
			},
			// 了解地区  渲染时
			getRegion01(country_id, region_id, countryIndex, index) {
				this.$get(urls.area, {
					country_id: country_id
				}).then(res => {
					this.loadEnd();
					res.data.region.forEach((item, regionIndex) => {
						if (item.region_id == region_id) {
							this.$set(this.knowArr, index, [countryIndex, regionIndex]);
							this.$set(this.knowRegionArr, index, res.data.region);
						}
					});
				});
			},
			// 自己地区arr
			getRegion02() {
				this.regionIndex2 = null;
				this.$get(urls.area, {
					country_id: this.countryArr[this.countryIndex2].country_id
				}).then(res => {
					this.loadEnd();
					this.regionArr02 = res.data.region;
					this.regionArr02.forEach((item, index) => {
						if (item["region_id"] == this.user.region_id) {
							this.regionIndex2 = index;
							console.log(this.regionIndex2)
						}
					});
					console.log(res);
				});
			},
			// 获取国家
			getCountry() {
				return this.$get(urls.area, {
					country_id: 0
				});
			},
			// 绑定微信
			bindWechat() {
				this.qrCode = true;
			},
			// 获取企业
			getBusiness() {
				return this.$get(urls.companyType, {
					parent_type: "business"
				});
			},
			// 获取行业
			getIndustry() {
				return this.$get(urls.companyType, {
					parent_type: "industry"
				});
			},
			// 获取用户信息
			getUserInfo() {
				this.$get(urls.info, {}).then(res => {
					this.loadEnd();
					if (res.data.openid) {
						this.status = (this.cn) ? '已绑定' : 'bind'
					} else {
						this.status = ''
					}
					this.user = res.data;
					this.area = res.data.know_area;
					this.business_type = res.data.know_business_type;
					this.industry_type = res.data.know_industry_type;
					this.codeUrl = 'http://dz25.mrxdtech.com/api/api/wx_account/qrcode_img?kinds=change&language=cn&member_numbers=' +
						res.data.member_numbers
					console.log(res.data);
					this.tags.forEach((item, index) => {
						for (let i = 0; i < res.data.know_industry_type.length; i++) {
							if (
								item["company_type_id"] ==
								res.data.know_industry_type[i]["company_type_id"]
							) {
								console.log("yes");
								this.tagIndexs.push(index);
							}
						}
					});
					this.businesses.forEach((item, index) => {
						for (let i = 0; i < res.data.know_business_type.length; i++) {
							if (
								item["company_type_id"] ==
								res.data.know_business_type[i]["company_type_id"]
							) {
								this.businessIndex = index;
							}
						}
					});
					// 想了解的国家
					this.knowArr = []
					var index = 0
					this.countryArr.forEach((item, countryIndex) => {
						for (var i = 0; i < res.data.know_area.length; i++) {
							if (item["country_id"] == res.data.know_area[i].country_id) {
								// index国家下标
								this.knowArr.push([countryIndex])
								console.log(res.data.know_area[i].country_id, res.data.know_area[i].region_id, countryIndex, index)
								this.getRegion01(res.data.know_area[i].country_id, res.data.know_area[i].region_id, countryIndex, index)
								index++
							}
						}
					});
					// 自己
					this.countryArr.some((item, index) => {
						if (item["country_id"] == res.data.country_id) {
							this.countryIndex2 = index;
							this.getRegion02();
							return true;
						}
					});
				});
			},
			saveHandle() {
				this.area = []
				this.knowArr.forEach((obj, i) => {
					if (obj.length == 0) {
						return false
					}
					let country = this.countryArr[obj[0]]
					let region = null
					if (obj.length < 2) {
						region = {
							region_id: '',
							region_name: ''
						}
					} else {
						region = this.knowRegionArr[i][obj[1]]
					}
					this.area.push(Object.assign(country, region))
				})
				if (this.nullTest(this.user.member_name)) {
					this.cn ? this.errorToast('昵称不能为空') : this.errorToast('Nickname cannot be empty')
					return false
				}
				if (this.user.member_name.length > 20) {
					this.cn ? this.errorToast('昵称过长') : this.errorToast('Nickname too long')
					return false
				}
				if (this.knowArr.length == 0) {
					this.cn ? this.errorToast('请你选择至少一个想了解的国家地区') : this.errorToast('Please select the country you want to know')
					return false
				}
				if (this.tagIndexs.length == 0) {
					this.cn ? this.errorToast('请你选择至少一个标签') : this.errorToast('Please select at least one label')
					return false
				}
				if (this.nullTest(this.user.phone_prefix)) {
					this.cn ? this.errorToast('手机号码前缀不能为空') : this.errorToast('Please enter mobile number prefix');
					return false;
				}
				if (this.nullTest(this.user.phone)) {
					this.cn ? this.errorToast('手机号不能为空') : this.errorToast('Mobile number cannot be empty')
					return false
				}
				this.$put(urls.infoEdit, {
					"member_name": this.user.member_name,
					"know_business_type": this.business_type,
					"know_industry_type": this.industry_type,
					"know_area": this.area,
					"country_id": this.country_id,
					"country_name": this.country_name,
					"region_id": this.region_id,
					"region_name": this.region_name,
					"phone_prefix": this.user.phone_prefix,
					"phone": this.user.phone,
					"qq": this.user.qq,
					"whatsapp": this.user.whatsapp,
					"wx_code": ""
				}).then(() => {
					this.loadEnd()
					this.cn ? this.successToast('修改成功') : this.successToast('Modified Successfully')
					this.edit1 = false,
						this.edit2 = false,
						this.edit3 = false,
						this.edit4 = false,
						this.edit5 = false,
						this.edit6 = false,
						this.edit7 = false,
						this.edit8 = false,
						this.$store.dispatch('getUserInfoHandle');
					this.getUserInfo();
				}).catch((err) => {
					this.loadEnd()
					this.errorToast(err.data.msg)
				})
			}
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			},
		},
		created() {
			if (window.screen.width > 750) {
				this.mobile = false
			}
			this.axiosAll([
				this.getIndustry(),
				this.getBusiness(),
				this.getCountry()
			]).then(ress => {
				console.log(ress);
				this.loadEnd();
				this.tags = ress[0].data;
				this.businesses = ress[1].data;
				this.countryArr = ress[2].data.country;
				this.getUserInfo();
			});
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
