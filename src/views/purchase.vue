<template>
	<div class="purchase">
		<v-search></v-search>
		<div class="wrapper">
			<h1 class="title">{{ cn ? '购买公司' : 'Buying Companies' }}</h1>
			<!-- 筛选条件 -->
			<div class="condition-box">
				<div class="condition">
					<div class="label">{{ cn ? '企业分类' : 'Types' }}:</div>
					<ul class="tags">
						<template v-for="(item, index) in businesses">
							<li :class="businessIndex.indexOf(index) >= 0 ? 'active' : ''" @click="indexChange1(index)">{{ item.company_type_name }}</li>
							<span class="spe" v-if="index != businesses.length - 1"></span>
						</template>
					</ul>
				</div>
				<div class="condition condition2">
					<div class="label">{{ cn ? '行业分类' : 'Industries' }}:</div>
					<ul class="tags">
						<template v-for="(item, index) in tags">
							<li :class="tagsIndex.indexOf(index) >= 0 ? 'active' : ''" @click="indexChange2(index)">{{ item.company_type_name }}</li>
							<span class="spe" v-if="index != tags.length - 1"></span>
						</template>
					</ul>
				</div>
				<p class="tip">{{ cn ? '（最多选择3个标签）' : '(Choose up to three labels)' }}</p>
			</div>
			<template v-if="lists.length > 0">
				<!-- 1.有结果 -->
				<div class="results  clear">
					<div class="result-item" v-for="item in lists">
						<img class="img" :src="item.img_path" alt="" />
						<ul class="content">
							<li class="item-title">{{ item.company_name }}</li>
							<li>
								{{ cn ? '出售价格：' : 'Selling Price' }}
								<span class="price">
									<i>{{ item.company_price }}</i>
								</span>
							</li>
							<li>{{ item.country_name }}, {{ item.region_name }}</li>
							<li>
								<span class="label" v-if="index < 2" v-for="(tag, index) in item.company_type_lists">{{ tag.company_type_name }}</span>
								<span v-if="item.company_type_lists.length > 2">...</span>
							</li>
							<li>
								<router-link class="view" tag="button" :to="{ path: '/company_purchase_info', query: { company_id: item.company_id } }">
									{{ cn ? '查看详情' : 'View Details' }}
								</router-link>
								<span class="saled" v-if="item.company_states == 'sold'">{{ cn ? '已出售' : 'Sold' }}</span>
							</li>
						</ul>
					</div>
				</div>
				<el-pagination v-if="lists.length" @current-change="handleCurrentChange" class="pagination hide-m" background
				 layout="prev, pager, next" :page-size="12" :current-page="current_page" :total="total_num"></el-pagination>
				<div v-if="current_page != total_page && total_page != 0" @click="viewMore" class="show-more hide-p">{{ cn ? '查看更多' : 'View More' }}</div>
				<div v-else class="show-more hide-p">{{ cn ? '没有更多了' : 'No More' }}</div>
			</template>
			<!-- 2.无结果 -->
			<div v-else class="no-result">{{ cn ? '暂无内容' : 'No information was found' }}</div>
		</div>
	</div>
</template>

<script>
	import vSearch from 'components/common/search.vue';
	// import urls from '../api/index.js';
	export default {
		name: 'purchase',
		data() {
			return {
				noResult: false,
				businessIndex: [],
				tagsIndex: [],
				businesses: [],
				tags: [],
				limit: 12,
				current_page: 1,
				total_num: 0,
				total_page: 1,
				lists: []
			};
		},
		components: {
			vSearch
		},
		watch: {
			$route: {
				handler(val, oldVal) {
					console.log(val);
					console.log(oldVal);
					if (val.query.business_type_lists != oldVal.query.business_type_lists) {
						this.lists = [];
					}
					if (val.query.industry_type_lists != oldVal.query.industry_type_lists) {
						this.lists = [];
					}
					this.getList();
					window.screen.width > 750 ? this.wSetScroll(500) : '';
				},
				deep: true
			}
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			// 移动加载更多
			viewMore() {
				if (this.current_page < this.total_page) {
					let query = JSON.parse(JSON.stringify(this.$route.query));
					query.page = this.current_page + 1;
					this.$router.push({
						query: query
					});
				} else {}
			},
			getList() {
				// 数组传过去是以字符串  注意
				this.$get(urls.companyList, {
						company_name: '',
						country_id: '',
						region_id: '',
						page: this.$route.query.page,
						limit: this.$route.query.limit,
						business_type_lists: this.$route.query.business_type_lists || '[]',
						industry_type_lists: this.$route.query.industry_type_lists || '[]'
					})
					.then(res => {
						console.log('成功');
						this.loadEnd();
						this.total_num = res.data.total_num;
						this.total_page = res.data.total_page;
						this.current_page = res.data.current_page;
						if (window.screen.width > 750) {
							this.lists = res.data.lists;
						} else {
							this.lists = this.lists.concat(res.data.lists);
						}
					})
					.catch(err => {
						console.log('失败');
						this.loadEnd();
						this.errorToast(err.data.msg);
					});
			},
			handleCurrentChange(val) {
				console.log(val);
				let query = JSON.parse(JSON.stringify(this.$route.query));
				query.page = val;
				this.$router.push({
					query: query
				});
			},
			// 获取企业
			getBusiness() {
				this.$get(urls.companyType, {
					parent_type: 'business'
				}).then(res => {
					this.loadEnd();
					this.businesses = res.data;
					let business_type_lists = [];
					if (this.$route.query.business_type_lists) {
						business_type_lists = JSON.parse(this.$route.query.business_type_lists);
					}
					this.businesses.forEach((item, index) => {
						for (let i = 0; i < business_type_lists.length; i++) {
							if (item.company_type_id == business_type_lists[i].company_type_id) {
								this.businessIndex.push(index);
							}
						}
					});
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
					let industry_type_lists = [];
					if (this.$route.query.industry_type_lists) {
						industry_type_lists = JSON.parse(this.$route.query.industry_type_lists);
					}
					this.tags.forEach((item, index) => {
						for (let i = 0; i < industry_type_lists.length; i++) {
							if (item.company_type_id == industry_type_lists[i].company_type_id) {
								this.tagsIndex.push(index);
							}
						}
					});
					console.log(res);
				});
			},
			indexChange1(index) {
				if (this.businessIndex.indexOf(index) >= 0) {
					var index2 = this.businessIndex.indexOf(index);
					let business_type_lists = [];
					let query = JSON.parse(JSON.stringify(this.$route.query));
					this.businessIndex.splice(index2, 1);
					this.businessIndex.forEach(item => {
						business_type_lists.push(this.businesses[item]);
					});
					query.business_type_lists = JSON.stringify(business_type_lists);
					query.page = 1;
					this.$router.push({
						query: query
					});
					return false;
				}
				if (this.businessIndex.length >= 3) {
					this.cn ? this.errorToast('最多只能选择三个标签') : this.errorToast('No more than 3 labels');
					return false;
				} else {
					let business_type_lists = [];
					let query = JSON.parse(JSON.stringify(this.$route.query));
					this.businessIndex.push(index);
					this.businessIndex.forEach(item => {
						business_type_lists.push(this.businesses[item]);
					});
					query.business_type_lists = JSON.stringify(business_type_lists);
					query.page = 1;
					this.$router.push({
						query: query
					});
				}
			},
			indexChange2(index) {
				if (this.tagsIndex.indexOf(index) >= 0) {
					var index2 = this.tagsIndex.indexOf(index);
					let industry_type_lists = [];
					let query = JSON.parse(JSON.stringify(this.$route.query));
					this.tagsIndex.splice(index2, 1);
					this.tagsIndex.forEach(item => {
						industry_type_lists.push(this.tags[item]);
					});
					query.industry_type_lists = JSON.stringify(industry_type_lists);
					query.page = 1;
					this.$router.push({
						query: query
					});
					return false;
				}
				if (this.tagsIndex.length >= 3) {
					this.cn ? this.errorToast('最多只能选择三个标签') : this.errorToast('No more than 3 labels');
					return false;
				} else {
					let industry_type_lists = [];
					let query = JSON.parse(JSON.stringify(this.$route.query));
					this.tagsIndex.push(index);
					this.tagsIndex.forEach(item => {
						industry_type_lists.push(this.tags[item]);
					});
					query.industry_type_lists = JSON.stringify(industry_type_lists);
					query.page = 1;
					this.$router.push({
						query: query
					});
				}
			}
		},
		created() {
			this.getBusiness();
			this.getIndustry();
			if (window.screen.width <= 750) {
				let query = JSON.parse(JSON.stringify(this.$route.query));
				if (query.page == 1) {
					this.getList();
					return false;
				}
				query.page = 1;
				this.$router.replace({
					query: query
				});
				return false;
			}
			this.getList();
		}
	};
</script>

<style></style>
