<template>
	<div class="publish">
		<div class="title">
			{{cn?'发布出售公司':'Post Company for Sale'}}</div>
		<div class="content-wrapper">
			<ul>
				<li>
					<span class="label must">
						{{cn?'公司名称':'Name'}}：</span>
					<input class="input" type="text" v-model="name" :placeholder="cn?'请输入公司名称':'Please enter Company Name'" />
				</li>
				<li>
					<span class="label must">
						{{cn?'行业标签':'Industries'}}：</span>
					<div class="content-box2">
						<el-checkbox-group v-model="industryIndexs" :min="0" :max="3">
							<el-checkbox v-for="(tag, index) in industryArr" :label="index" :key="tag.company_type_id">{{ tag.company_type_name }}</el-checkbox>
						</el-checkbox-group>
					</div>
				</li>
				<li>
					<span class="label must">
						{{cn?'企业类型':'Type'}}：</span>
					<div class="content-box2">
						<el-checkbox-group v-model="businessIndexs" :min="0" :max="1">
							<el-checkbox v-for="(item, index) in businessArr" :label="index" :key="item.company_type_id">{{ item.company_type_name }}</el-checkbox>
						</el-checkbox-group>
					</div>
				</li>
				<li>
					<span class="label must">
						{{cn?'地点':'Address'}}：</span>
					<div class="mul-box">
						<!-- <span class="select"></span> -->
						<!-- <span class="select"></span> -->
						<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="select"
						 v-model="countryIndex" :placeholder="cn?'国家':'Country'">
							<el-option v-for="(item, index) in countryArr" :key="item.country_id" :label="item.country_name" :value="index"></el-option>
						</el-select>
						<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="select"
						 v-model="regionIndex" :placeholder="cn?'地区':'Region'">
							<el-option v-for="(item, index) in regionArr" :key="item.region_id" :label="item.region_name" :value="index"></el-option>
						</el-select>
						<input class="input address" type="text" v-model="address" :placeholder="cn?'请输入详细地址':'Please enter detailed address '" />
					</div>
				</li>
				<li>
					<span class="label must">
						{{cn?'成立时间':'Established On'}}：</span>
					<div class="mul-box">
						<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="select"
						 v-model="year" :placeholder="cn?'年':'Year'">
							<el-option v-for="item in years" :key="item" :label="item" :value="item"></el-option>
						</el-select>
						<el-select filterable :no-match-text="cn?'无匹配':'No match'" :no-data-text="cn?'无数据':'No data'" class="select"
						 v-model="month" :placeholder="cn?'月':'Month'">
							<el-option v-for="item in months" :key="item" :label="item" :value="item"></el-option>
						</el-select>
					</div>
				</li>
				<li>
					<span class="label must">
						{{cn?'出售原因':'Selling Reasons'}}：</span>
					<textarea class="input high" :placeholder="cn?'请输入出售原因':'Please enter Selling Reason'" v-model="reason"></textarea>
				</li>
				<li>
					<span class="label must">
						{{cn?'售价':'Price'}}：</span>
					<input class="input" type="text" v-model="price" :placeholder="cn?'请输入售价及币种':'Please enter Selling Price and Currency '" />
				</li>
				<li>
					<span class="label must">
						{{cn?'公司简介':'Profile'}}：</span>
					<textarea class="input high" v-model="desc" :placeholder="cn?'请输入公司简介':'Please enter Company Profile'"></textarea>
				</li>
				<li>
					<span class="label">
						{{cn?'经营范围':'Scope of Business'}}：</span>
					<textarea class="input high" v-model="scope" :placeholder="cn?'请输入经营范围':'Please enter Scope of Business'"></textarea>
				</li>
				<li>
					<span class="label">
						{{cn?'公司负债':'Company Debt'}}：</span>
					<textarea class="input high" v-model="debt" :placeholder="cn?'请输入公司负债':'Please enter Company Debt'"></textarea>
				</li>
				<li>
					<span class="label">
						{{cn?'营业证明':'Business Certificate'}}：</span>
					<div class="mul-box">
						<div class="img-item" v-for="(item, index) in license_imgs">
							<img class="img" :src="item.img_path" />
							<span class="remove-btn" @click="delImg(index, 'type1')"></span>
						</div>
						<div v-if="license_imgs.length<1" class="upload-btn img-item"><input accept="image/*" class="upload" type="file"
							 @change="uploadImg01" value="" /></div>
					</div>
				</li>
				<li>
					<span class="label">
						{{cn?'行业证书':'Industry Certificate'}}：</span>
					<div class="mul-box">
						<div class="img-item" v-for="(item, index) in certificate_imgs">
							<img class="img" :src="item.img_path" />
							<span class="remove-btn" @click="delImg(index, 'type2')"></span>
						</div>
						<div v-if="certificate_imgs.length<5" class="upload-btn img-item"><input accept="image/*" class="upload" type="file"
							 @change="uploadImg02" value="" /></div>
					</div>
				</li>
				<li>
					<span class="label">
						{{cn?'公司照片':'Company Photos'}}：</span>
					<div class="mul-box">
						<div class="img-item" v-for="(item, index) in imgs">
							<img class="img" :src="item.img_path" />
							<span class="remove-btn" @click="delImg(index, 'type3')"></span>
						</div>
						<div v-if="imgs.length<5" class="upload-btn img-item"><input accept="image/*" class="upload" @change="uploadImg03"
							 type="file" value="" /></div>
					</div>
				</li>
				<li>
					<span class="label">
						{{cn?'公司收入':'Company Revenue'}}：</span>
					<input class="input" type="text" v-model="income" :placeholder="cn?'请输入公司收入':'Please enter Company Revenue'" />
				</li>
				<li>
					<span class="label"></span>
					<div class="content-box2 book-box">
						<div class="box clear">
							<span class="agree-btn" :class="{ agree: agree }" @click="agree = !agree"></span>
							<span>
								{{cn?'同意':'Agree'}}</span>
							<span class="book" @click="book1 = true">
								{{cn?'《出售公司委托书》':'《Proxy for selling a company》'}}</span>
							/
							<span class="book" @click="book2 = true">
								{{cn?'《内容发布协议》':'《Information release agreement》'}}</span>
						</div>
						<span class="tip">
							{{cn?'注：带 * 号为必填选项':'Notes: * is required field'}}</span>
					</div>
				</li>
			</ul>
			<button class="btn btn-confirm" @click="submit">
				{{cn?'确认':'Confirm'}}</button>
		</div>
		<div class="mask" v-if="book1" >
			<div class="content book-mask edit_textBox">
				<div class="book-txt">
					<span class="el-icon el-icon-close close-btn" @click="book1 = false"></span>
					<div v-html="bookText1">

					</div>
				</div>
			</div>
		</div>
		<div class="mask " v-if="book2">
			<div class="content book-mask edit_textBox">
				<div class="book-txt">
					<span class="el-icon el-icon-close close-btn" @click="book2 = false"></span>
					<div v-html="bookText2">

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from '../../api/index.js';
	import lrz from 'lrz';

	const years = []
	const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	var thisYear = new Date().getFullYear();
	var Section = thisYear - 1900;
	for (var i = 0; i <= Section; i++) {
		years.push(thisYear--)
	}
	export default {
		name: 'publish',
		data() {
			return {
				//
				book1: false,
				book2: false,
				bookText1: '',
				bookText2: '',
				//
				name: '',
				address: '',
				reason: '',
				price: '',
				desc: '',
				scope: '',
				debt: '',
				income: '',
				agree: false,
				// 行业类型
				industryArr: [],
				// 企业类型
				businessArr: [],
				// 储存下标
				industryIndexs: [],
				businessIndexs: [],
				countryArr: [],
				regionArr: [],
				countryIndex: null,
				regionIndex: null,
				country_id: '',
				country_name: '',
				region_id: '',
				region_name: '',
				years: years,
				months: months,
				year: '',
				month: '',

				business_type_lists: [],
				industry_type_lists: [],
				license_imgs: [],
				certificate_imgs: [],
				imgs: []
			};
		},
		watch: {
			industryIndexs() {
				var arr = [];
				this.industryIndexs.forEach(item => {
					arr.push(this.industryArr[item]);
				});
				this.industry_type_lists = arr;
			},
			businessIndexs() {
				var arr = [];
				this.businessIndexs.forEach(item => {
					arr.push(this.businessArr[item]);
				});
				this.business_type_lists = arr;
			},
			countryIndex() {
				this.country_name = this.countryArr[this.countryIndex].country_name;
				this.country_id = this.countryArr[this.countryIndex].country_id;
				this.getRegion();
			},
			regionIndex() {
				this.region_name = this.regionArr[this.regionIndex].region_name;
				this.region_id = this.regionArr[this.regionIndex].region_id;
			}
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			// 获取协议
			getInstruction() {
				this.$get(urls.instruction, {})
					.then(res => {
						this.loadEnd();
						this.bookText1 = res.data.purchase;
						this.bookText2 = res.data.merge;
					})
			},
			// 获取行业arr
			getIndustryArr() {
				this.$get(urls.companyType, {
						parent_type: 'industry'
					})
					.then(res => {
						this.loadEnd();
						this.industryArr = res.data;
					})
					.catch(err => {
						this.loadEnd();
						console.log(err);
					});
			},
			// 获取企业Arr
			getBusinessArr() {
				this.$get(urls.companyType, {
						parent_type: 'business'
					})
					.then(res => {
						this.loadEnd();
						this.businessArr = res.data;
					})
					.catch(err => {
						this.loadEnd();
						console.log(err);
					});
			},
			// 获取国家
			getCountry() {
				this.$get(urls.area, {
					country_id: 0
				}).then(res => {
					this.loadEnd();
					this.countryArr = res.data.country;
					console.log(res);
				});
			},
			// 获取地区
			getRegion() {
				this.$get(urls.area, {
					country_id: this.country_id
				}).then(res => {
					this.loadEnd();
					this.regionArr = res.data.region;
					console.log(res);
				});
			},
			// 上传图片 
			uploadImg01(e) {
				if (this.license_imgs.length >= 1) {
					this.cn ? this.errorToast('最多只能上传1张图片') : this.errorToast('No more than one picture')
					return false
				}
				const file = e.target.files || e.dataTransfer.files;
				let target = file[0];
				lrz(target, {
						// width: 87
					})
					.then(rst => {
						console.log(rst.base64);
						this.$post(urls.uploadImg, {
								name: '1',
								base64: rst.base64
							})
							.then(res => {
								this.loadEnd();
								var obj = new Object();
								obj.img_id = res.data.id;
								obj.img_path = rst.base64;
								this.license_imgs.push(obj);
								console.log(obj);
							})
							.catch(err => {
								this.loadEnd();
								this.cn ? this.errorToast('上传失败 请重试') : this.errorToast('Upload failed,try again')
							});
					})
					.catch(err => {
						this.cn ? this.errorToast('转码失败 请重试') : this.errorToast('Convert failed,try again')
					})
					.always(() => {
						// console.log('不管是成功失败，都会执行');
					});
			},
			uploadImg02(e) {
				if (this.certificate_imgs.length >= 5) {
					this.cn ? this.errorToast('最多只能上传5张图片') : this.errorToast('No more than 5 pictures')
					return false
				}
				const file = e.target.files || e.dataTransfer.files;
				let target = file[0];
				lrz(target, {
						// width: 87
					})
					.then(rst => {
						console.log(rst.base64);
						this.$post(urls.uploadImg, {
								name: '1',
								base64: rst.base64
							})
							.then(res => {
								this.loadEnd();
								var obj = new Object();
								obj.img_id = res.data.id;
								obj.img_path = rst.base64;
								this.certificate_imgs.push(obj);
								console.log(obj);
							})
							.catch(err => {
								this.loadEnd();
								this.cn ? this.errorToast('上传失败 请重试') : this.errorToast('Upload failed,try again')
							});
					})
					.catch(err => {
						this.cn ? this.errorToast('转码失败 请重试') : this.errorToast('Convert failed,try again')
					})
					.always(() => {});
			},
			uploadImg03(e) {
				if (this.imgs.length >= 5) {
					this.cn ? this.errorToast('最多只能上传5张图片') : this.errorToast('No more than 5 pictures')
					return false
				}
				const file = e.target.files || e.dataTransfer.files;
				let target = file[0];
				lrz(target, {
						// width: 87
					})
					.then(rst => {
						console.log(rst.base64);
						this.$post(urls.uploadImg, {
								name: '1',
								base64: rst.base64
							})
							.then(res => {
								this.loadEnd();
								var obj = new Object();
								obj.img_id = res.data.id;
								obj.img_path = rst.base64;
								this.imgs.push(obj);
								console.log(obj);
							})
							.catch(err => {
								this.loadEnd();
								this.cn ? this.errorToast('上传失败 请重试') : this.errorToast('Upload failed,try again')
							});
					})
					.catch(err => {
						this.cn ? this.errorToast('转码失败 请重试') : this.errorToast('Convert failed,try again')
					});
			},
			// 删除图片
			delImg(index, type) {
				switch (type) {
					case 'type1':
						this.license_imgs.splice(index, 1);
						break;
					case 'type2':
						this.certificate_imgs.splice(index, 1);
						break;
					case 'type3':
						this.imgs.splice(index, 1);
						break;
				}
			},
			// 发布  校验
			submit() {
				if (this.nullTest(this.name)) {
					this.cn ? this.errorToast('请输入公司名称') : this.errorToast('Please enter company name')
					return false;
				}
				if (!this.industryIndexs.length) {
					this.cn ? this.errorToast('请选择行业标签') : this.errorToast('Please select industry labels')
					return false;
				}
				if (!this.businessIndexs.length) {
					this.cn ? this.errorToast('请选择企业类型') : this.errorToast('Please select an enterprise type')
					return false;
				}
				if (!this.country_name) {
					this.cn ? this.errorToast('请选择国家') : this.errorToast('Please select the country')
					return false;
				}
				if (!this.year) {
					this.cn ? this.errorToast('请选择成立年份') : this.errorToast('Please select the year of establishment')
					return false;
				}
				if (!this.month) {
					this.cn ? this.errorToast('请选择成立月份') : this.errorToast('Please select the month of establishment')
					return false;
				}
				if (this.nullTest(this.reason)) {
					this.cn ? this.errorToast('请输入出售原因') : this.errorToast('Please enter selling reason')
					return false;
				}
				if (this.nullTest(this.price)) {
					this.cn ? this.errorToast('请输入售价') : this.errorToast('Please enter selling price')
					return false;
				}
				if (this.nullTest(this.desc)) {
					this.cn ? this.errorToast('请输入公司简介') : this.errorToast('Please enter company profile')
					return false;
				}
				// 不同意协议
				if (!this.agree) {
					this.cn ? this.errorToast('请同意相关协议') : this.errorToast('Please agree to the relevant agreement')
					return false;
				}
				this.$post(urls.sellPublish, {
						company_name: this.name,
						business_type_lists: this.business_type_lists,
						industry_type_lists: this.industry_type_lists,
						country_id: this.country_id,
						country_name: this.country_name,
						region_id: this.region_id,
						region_name: this.region_name,
						place: this.address,
						life_year: this.year,
						life_month: this.month,
						sell_reason: this.reason,
						company_price: this.price,
						descs: this.desc,
						scope: this.scope,
						debt: this.debt,
						license_imgs: this.license_imgs,
						certificate_imgs: this.certificate_imgs,
						imgs: this.imgs,
						income: this.income
					})
					.then(res => {
						this.loadEnd();
						// 国内去付款
						if (this.$store.state.userInfo.home == 1) {
							this.$router.push({
								path: '/buy',
								query: {
									order_id: res.data.order_id
								}
							});
							return false;
						} else {
							// 国外直接成功 待审核
							this.$router.push({
								path: '/publish-success'
							});
						}
					})
					.catch(err => {
						this.loadEnd();
						this.errorToast(err.data.msg);
					});
			}
		},
		created() {
			this.getInstruction();
			this.getBusinessArr();
			this.getIndustryArr();
			this.getCountry();
			// this.getRegion();
		}
	};
</script>

<style></style>
