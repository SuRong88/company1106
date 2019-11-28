<template>
	<div class="search">
		<swiper v-if="bannerImgs && bannerImgs.length > 0" :options="swiperOption" ref="mySwiper" class="swiper-container swiper-banner"
		 style="width: 100%;height: 100%;">
			<swiper-slide v-for="(item, index) in bannerImgs" class="swiper-slide background-size-cover" :style="'background:url(' + item.img_path + ') no-repeat center center'">
				<router-link v-if="item.link" style="display: block; width: 100%; height: 100%;" :to="item.link"></router-link>
			</swiper-slide>
		</swiper>
		<div :class="select ? 'search-box active' : 'search-box'">
			<input class="search-input" type="text" v-model="company_name" :placeholder="cn ? '请输入关键词' : 'Please enter keywords'"
			 @keyup.enter="searchHandle" />
			<div class="select-menu" @click="select = !select">
				{{ cn ? '高级搜索' : 'Advanced Search' }}
				<i class="el-icon-caret-bottom el-icon--right" :class="{ active: select }"></i>
			</div>
			<div class="btn-box">
				<span @click="searchHandle">
					<img class="search-icon" src="../../assets/img/pc/btn_search.png" alt="" />
					{{ cn ? '搜索' : 'Search' }}
				</span>
				<router-link to="/sale" tag="span">{{ cn ? '出售公司' : 'Selling Companies' }}</router-link>
			</div>
			<img @click="searchHandle" class="search-icon hide-p" src="../../assets/img/m/btn_search.png" alt="" />
			<div class="select-box">
				<div class="select-item">
					<span class="label">{{ cn ? '国家地区' : 'Country and Region' }}：</span>
					<div class="area-box">
						<el-select filterable :no-match-text="cn ? '无匹配' : 'No match'" :no-data-text="cn ? '无数据' : 'No data'" class="country"
						 v-model="countryIndex" :placeholder="cn ? '国家' : 'Country'">
							<el-option v-for="(item, index) in countryArr" :key="item.country_id" :label="item.country_name" :value="index"></el-option>
						</el-select>
						<el-select filterable :no-match-text="cn ? '无匹配' : 'No match'" :no-data-text="cn ? '无数据' : 'No data'" class="area"
						 v-model="regionIndex" :placeholder="cn ? '地区' : 'Region'">
							<el-option v-for="(item, index) in regionArr" :key="item.region_id" :label="item.region_name" :value="index"></el-option>
						</el-select>
					</div>
				</div>
				<div class="select-item">
					<span class="label label2">{{ cn ? '行业标签' : 'Industry' }}：</span>
					<div class="tag-box">
						<el-checkbox-group v-model="tagIndex" :min="0" :max="3">
							<el-checkbox v-for="(tag, index) in tags" :label="index" :key="tag.company_type_id">{{ tag.company_type_name }}</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from '../../api/index.js';
	let noSwiping = window.screen.width > 750 ? true : false;
	export default {
		data() {
			return {
				swiperOption: {
					loop: true,
					speed: 900,
					notNextTick: true,
					autoplay: true,
					preloadImages: false,
					noSwiping: noSwiping,
					noSwipingSelector: '.swiper-container'
				},
				bannerImgs: [],
				select: false,
				company_name: '',
				countryArr: [],
				regionArr: [],
				tags: [],
				countryIndex: null,
				regionIndex: null,
				tagIndex: [],
				// 可选
				country_id: '',
				// 可选
				region_id: '',
				country_name: '',
				region_name: '',
				// 不需要
				business_type_lists: [],
				page: 1,
				limit: 12,
				// 可选
				industry_type_lists: []
			};
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		watch: {
			countryIndex() {
				if (this.countryIndex == null) {
					return false
				}
				this.country_name = this.countryArr[this.countryIndex].country_name;
				this.country_id = this.countryArr[this.countryIndex].country_id;
				this.getRegion();
			},
			regionIndex() {
				if (this.regionIndex == null) {
					return false
				}
				this.region_name = this.regionArr[this.regionIndex].region_name;
				this.region_id = this.regionArr[this.regionIndex].region_id;
			},
			tagIndex() {
				var arr = [];
				this.tagIndex.forEach(item => {
					arr.push(this.tags[item]);
				});
				this.industry_type_lists = arr;
			}
		},
		methods: {
			searchChange() {},
			// 获取轮播图
			getBannerImgs() {
				this.$get(urls.bannerlist).then(res => {
					this.loadEnd();
					this.bannerImgs = res.data;
					// 轮播图为一张的时候不loop
					this.swiperOption.loop = (res.data.length<=1)?false:true
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
				this.regionIndex = null
				this.region_name = null
				this.region_id = null
				this.$get(urls.area, {
					country_id: this.country_id
				}).then(res => {
					this.loadEnd();
					this.regionArr = res.data.region;
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

			// 搜索
			searchHandle() {
				this.select = false;
				this.$router.push({
					path: '/result',
					query: {
						company_name: this.company_name,
						country_id: this.country_id,
						region_id: this.region_id,
						business_type_lists: JSON.stringify(this.business_type_lists),
						page: this.page,
						limit: this.limit,
						industry_type_lists: JSON.stringify(this.industry_type_lists),
						country_name: this.country_name,
						region_name: this.region_name
					}
				});
				// 每次搜索 清空搜索条件
				this.countryIndex = null
				this.regionIndex = null
				this.tagIndex = []
				this.company_name = ''
				this.country_id = ''
				this.region_id = ''
				this.business_type_lists = []
				this.page = 1
				this.limit = 12
				this.country_name = ''
				this.region_name = ''
			}
		},
		created() {
			this.getBannerImgs();
			this.getCountry();
			this.getIndustry();
		}
	};
</script>

<style>
	.background-size-cover{
		background-size: cover!important;
	}
</style>
