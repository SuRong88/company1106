<template>
	<div class="result">
		<v-search></v-search>
		<div class="wrapper">
			<!-- 面包屑 -->
			<div class="brief">
				<span class="count">{{ cn ? '找到' : 'Found' }} {{ total_num }} {{ cn ? '个相关结果' : 'Related Results' }}</span>
				<p class="tag-box">
					<span class="tag">{{ cn ? '筛选：' : 'Filter：' }}</span>
					<template v-if="country_name">
						<span class="tag">{{ country_name }}</span>
					</template>
					<template v-if="region_name">
						<span class="spe"></span>
						<span class="tag">{{ region_name }}</span>
					</template>
					<template v-for="(item, index) in industryLists">
						<span class="spe"></span>
						<span class="tag">{{ item.company_type_name }}</span>
					</template>
				</p>
			</div>
			<!-- 1.有结果 -->
			<template v-if="lists.length">
				<div class="results  clear">
					<div class="result-item" v-for="item in lists">
						<img class="img" :src="item.img_path" alt="" />
						<ul class="content">
							<li class="title">{{ item.company_name }}</li>
							<li class="price-li">
								{{ cn ? '出售价格：' : 'Selling Price' }}
								<span class="price">
									<i>{{ item.company_price }}</i>
								</span>
							</li>
							<li>{{ item.country_name }}，{{ item.region_name }}</li>
							<li>
								<span class="label" v-if="index < 2" v-for="(tag, index) in item.company_type_lists">{{ tag.company_type_name }}</span>
								<span v-if="item.company_type_lists.length > 2">...</span>
							</li>
							<router-link :to="{ path: '/company_purchase_info', query: { company_id: item.company_id } }" tag="li" class="view">
								{{ cn ? '查看详情' : 'View Details' }}
							</router-link>
						</ul>
					</div>
				</div>
				<el-pagination @current-change="handleCurrentChange" class="pagination hide-m" background layout="prev, pager, next"
				 :page-size="12" :current-page="current_page" :total="total_num"></el-pagination>
				<div v-if="current_page != total_page && total_page != 0" @click="viewMore" class="show-more hide-p">{{ cn ? '查看更多' : 'View More' }}</div>
				<div v-else class="show-more hide-p">{{ cn ? '没有更多了' : 'No More' }}</div>
			</template>
			<!-- 2.无结果 -->
			<div v-else class="no-result">
				<template v-if="$route.query.company_name">
					{{ cn ? '搜索' : 'Searched for' }} “
					<span class="search-word">{{ search.company_name }}</span>
					” {{ cn ? '没找到符合条件的公司信息，搜索其他试试～' : 'No matched company information was found, try searching for other.' }}
				</template>
				<template v-else>
					{{ cn ? '抱歉~当前列表内容为空' : 'No matched company information was found, try searching for other.' }}
				</template>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from '../api/index.js';
	import Bus from '@/bus/event.js'
	import vSearch from 'components/common/search.vue';
	export default {
		name: 'results',
		components: {
			vSearch
		},
		data() {
			return {
				// 所有搜索信息obj
				search: {
					page: 1,
					limit: 10
				},
				total_num: 0,
				total_page: 1,
				current_page: 1,
				// 所有搜索结果
				lists: [],
				// 面包屑显示
				country_name: '',
				region_name: '',
				//行业类型arr
				industryLists: []
			};
		},
		watch: {
			$route: {
				handler(val, oldVal) {
					console.log(val);
					console.log(oldVal);
					if (val.query.company_name != oldVal.query.company_name) {
						this.lists = [];
					}
					if (val.query.country_id != oldVal.query.country_id) {
						this.lists = [];
					}
					if (val.query.region_id != oldVal.query.region_id) {
						this.lists = [];
					}
					if (val.query.business_type_lists != oldVal.query.business_type_lists) {
						this.lists = [];
					}
					if (val.query.industry_type_lists != oldVal.query.industry_type_lists) {
						this.lists = [];
					}
					this.getList();
					window.screen.width > 750 ? this.wSetScroll(500) : ''
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
			handleCurrentChange(val) {
				console.log(val);
				let query = JSON.parse(JSON.stringify(this.$route.query));
				query.page = val;
				this.$router.push({
					query: query
				});
				this.getList();
			},
			getList() {
				this.country_name = this.$route.query.country_name || '';
				this.region_name = this.$route.query.region_name || '';
				this.industryLists = JSON.parse(this.$route.query.industry_type_lists) || [];
				this.search.company_name = this.$route.query.company_name || '';
				this.search.country_id = this.$route.query.country_id || '';
				this.search.region_id = this.$route.query.region_id || '';
				this.search.business_type_lists = this.$route.query.business_type_lists || '[]';
				this.search.page = this.$route.query.page || 1;
				this.search.limit = this.$route.query.limit || 10;
				this.search.industry_type_lists = this.$route.query.industry_type_lists || '[]';
				console.log(this.search);
				// 数组传过去是以字符串  注意
				this.$get(urls.companyList, this.search)
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
			}
		},
		created() {
			Bus.$emit('getNavIndex', -1, -1);
			// 移动端
			if (window.screen.width <= 750) {
				let query = JSON.parse(JSON.stringify(this.$route.query));
				// 进来就是第一页
				if (query.page == 1) {
					this.getList();
					return false;
				}
				// 不是第一页
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
</style>
