<template>
	<!-- 顾问服务列表 -->
	<div class="service">
		<v-search></v-search>
		<div class="wrapper">
			<h1 class="title">{{ listName }}</h1>
			<template v-if="lists.length">
				<div class="content">
					<div class="item" v-for="item in lists">
						<img class="img" :src="item.img_path" alt="" />
						<div class="content">
							<h1 class="item-title">{{ item.article_title }}</h1>
							<p class="item-desc edit_textBox">{{ item.detail }}</p>
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
		name: 'service',
		data() {
			return {
				listName: '',
				limit: 12,
				current_page: 1,
				total_num: 0,
				total_page: 1,
				html_template: '',
				jump_value: '',
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
					if (val.query.jump_value != oldVal.query.jump_value) {
						this.lists = [];
						this.wSetScroll(0)
					} else {
						window.screen.width > 750 ? this.wSetScroll(500) : ''
					}
					this.getList();
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
			},
			getList() {
				this.html_template = this.$route.query.html_template;
				this.jump_value = this.$route.query.jump_value;
				this.$get(urls.postList, {
					page: this.$route.query.page,
					limit: this.$route.query.limit,
					html_template: this.$route.query.html_template,
					jump_value: this.$route.query.jump_value,
					country_id: '',
					region_id: ''
				}).then(res => {
					this.loadEnd();
					this.total_num = res.data.total_num;
					this.total_page = res.data.total_page;
					this.current_page = res.data.current_page;
					this.listName = res.data.nav_title;
					if (window.screen.width > 750) {
						this.lists = res.data.lists;
					} else {
						this.lists = this.lists.concat(res.data.lists);
					}
				});
			}
		},
		created() {
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
