<template>
	<!-- 案例列表 -->
	<div class="example">
		<v-search></v-search>
		<div class="wrapper">
			<h1 class="title">{{ listName }}</h1>
			<div class="select">
				<span class="label">{{ cn ? '筛选' : 'Filter' }}:</span>
				<div class="area-box">
					<el-select filterable :no-match-text="cn ? '无匹配' : 'No match'" :no-data-text="cn ? '无数据' : 'No data'" class="country"
					 v-model="country_id" :placeholder="cn ? '国家' : 'Country'">
						<el-option v-for="(item, index) in countryArr" :label="item.country_name" :key="item.country_id" :value="item.country_id"></el-option>
					</el-select>
					<el-select filterable :no-match-text="cn ? '无匹配' : 'No match'" :no-data-text="cn ? '无数据' : 'No data'" class="area"
					 v-model="region_id" :placeholder="cn ? '地区' : 'Region'">
						<el-option v-for="(item, index) in regionArr" :label="item.region_name" :key="item.region_id" :value="item.region_id"></el-option>
					</el-select>
				</div>
			</div>
			<template v-if="lists.length > 0">
				<div class="res-box">
					<div class="res-item" v-for="item in lists">
						<img class="item-img" :src="item.img_path" alt="" />
						<div class="info">
							<h1 class="item-title">{{ item.article_title }}</h1>
							<div class="item-desc" v-html="item.detail"></div>
							<div class="item-address">
								<img class="address-icon" src="../assets/img/pc/icon02.png" alt="" />
								{{ cn ? item.country_name : item.country_name_en }}{{ cn ? item.region_name : item.region_name_en }}
							</div>
							<router-link class="view-btn" tag="div" :to="{
									path: '/detail',
									query: {
										html_template: html_template,
										article_id: item.article_id
									}
								}">
								{{ cn ? '查看详情' : 'View Details' }}
							</router-link>
						</div>
					</div>
				</div>
				<el-pagination v-if="lists.length" @current-change="handleCurrentChange" class="pagination hide-m" background
				 layout="prev, pager, next" :page-size="12" :current-page="current_page" :total="total_num"></el-pagination>
				<div v-if="current_page != total_page && total_page != 0" @click="viewMore" class="show-more hide-p">{{ cn ? '查看更多' : 'View More' }}</div>
				<div v-else class="show-more hide-p">{{ cn ? '没有更多了' : 'No More' }}</div>
			</template>
			<div v-else class="no-result">{{ cn ? '抱歉 暂无内容' : 'No information' }}</div>
		</div>
	</div>
</template>

<script>
	import vSearch from 'components/common/search.vue';
	// import urls from '../api/index.js';
	export default {
		name: 'example',
		data() {
			return {
				listName: '',
				country_id: '',
				region_id: '',
				limit: 12,
				current_page: 1,
				total_num: 0,
				total_page: 1,
				html_template: '',
				jump_value: '',
				lists: [],
				countryArr: [],
				regionArr: [],
				countryIndex: '',
				regionIndex: ''
			};
		},
		components: {
			vSearch
		},
		watch: {
			$route: {
				handler(val, oldVal) {
					if (val.query.country_id != oldVal.query.country_id) {
						this.lists = [];
					}
					if (val.query.region_id != oldVal.query.region_id) {
						this.lists = [];
					}
					if (val.query.jump_value != oldVal.query.jump_value) {
						this.lists = [];
						this.country_id = '';
						this.region_id = '';
						this.wSetScroll(0)
					} else {
						window.screen.width > 750 ? this.wSetScroll(500) : ''
					}
					this.getList();
				},
				deep: true
			},
			country_id() {
				let query = JSON.parse(JSON.stringify(this.$route.query));
				query.country_id = this.country_id;
				query.page = 1;
				this.$router.push({
					query: query
				});
				this.getRegion();
			},
			region_id() {
				if (this.region_id === '') {
					return false;
				}
				let query = JSON.parse(JSON.stringify(this.$route.query));
				query.country_id = this.country_id;
				query.region_id = this.region_id;
				query.page = 1;
				this.$router.push({
					query: query
				});
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
				} else {
					// this.errorToast('没有更多结果了~')
				}
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
				this.region_id = '';
				this.$get(urls.area, {
					country_id: this.country_id
				}).then(res => {
					this.loadEnd();
					this.regionArr = res.data.region;
					console.log(res);
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
			getList() {
				// this.listName = this.$route.query.listName
				this.html_template = this.$route.query.html_template;
				this.jump_value = this.$route.query.jump_value;
				this.$get(urls.postList, {
					page: this.$route.query.page,
					limit: this.$route.query.limit,
					html_template: this.$route.query.html_template,
					jump_value: this.$route.query.jump_value,
					country_id: this.$route.query.country_id || '',
					region_id: this.$route.query.region_id || ''
				}).then(res => {
					this.loadEnd();
					this.total_num = res.data.total_num;
					this.total_page = res.data.total_page;
					this.current_page = res.data.current_page;
					this.listName = res.data.nav_title;
					// this.lists = res.data.lists;
					if (window.screen.width > 750) {
						this.lists = res.data.lists;
					} else {
						this.lists = this.lists.concat(res.data.lists);
					}
				});
			}
		},
		created() {
			this.getCountry();
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

<style>
	.no-result {
		height: 400px;
		text-align: center;
	}
</style>
