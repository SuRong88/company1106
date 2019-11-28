<template>
	<div class="sale-list">
		<div class="title">{{ cn ? '出售公司列表' : 'List of Companies for Sale' }}</div>
		<ul class="select-box">
			<li class="select-item" :class="{ active: company_states == 'wait' }" @click="changeStatus('wait')">{{ cn ? '待审核' : 'New' }}</li>
			<li class="select-item" :class="{ active: company_states == 'pass' }" @click="changeStatus('pass')">{{ cn ? '已通过' : 'Accepted' }}</li>
			<li class="select-item" :class="{ active: company_states == 'refuse' }" @click="changeStatus('refuse')">{{ cn ? '未通过' : 'Rejected' }}</li>
			<li class="select-item" :class="{ active: company_states == 'sold' }" @click="changeStatus('sold')">{{ cn ? '已出售' : 'Sold' }}</li>
		</ul>
		<!-- 1有结果 -->
		<!-- 1.1pc -->
		<template v-if="lists.length">
			<div class="list hide-m">
				<table class="table">
					<thead>
						<tr>
							<td>{{ cn ? '公司名称' : 'Company Name' }}</td>
							<td>{{ cn ? '提交时间' : 'Submission Time' }}</td>
							<td>{{ cn ? '审核状态' : 'Review Status' }}</td>
							<td>{{ cn ? '行业' : 'Industry' }}</td>
							<td>{{ cn ? '地区' : 'Region' }}</td>
							<td>{{ cn ? '操作' : 'Action' }}</td>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in lists">
							<td>{{ item.company_name }}</td>
							<td>{{ item.create_time | formatDate('yyyy-MM-dd') }}</td>
							<td :class="{ yellow: company_states == 'wait', red: company_states == 'refuse', green: company_states == 'pass' || company_states == 'sold' }">
								{{ item.company_states_show }}
							</td>
							<td>{{ item.company_type_lists[0].company_type_name }}</td>
							<td>{{ item.country_name }},{{ item.region_name }}</td>
							<td class="operation">
								<router-link class="blue" :to="{ path: '/me/sale-info', query: { company_id: item.company_id } }" tag="span">
									{{ cn ? '查看' : 'View' }}
								</router-link>
								<!-- 已出售 不能编辑 -->
								<span v-if="company_states != 'sold'" class="line">|</span>
								<router-link v-if="company_states != 'sold'" class="blue" :to="{ path: '/me/sale-edit', query: { company_id: item.company_id } }"
								 tag="span">
									{{ cn ? '编辑' : 'Modify' }}
								</router-link>
							</td>
						</tr>
					</tbody>
				</table>
				<el-pagination @current-change="handleCurrentChange" class="pagination hide-m" background layout="prev, pager, next"
				 :page-size="12" :current-page="current_page" :total="total_num"></el-pagination>
			</div>
			<!-- 1.2移动 -->
			<div class="list hide-p">
				<div class="list-item" v-for="item in lists">
					<div class="l">
						<div class="item-title">{{ cn ? '公司名称' : 'Company Name' }}：{{ item.company_name }}</div>
						<div class="date">{{ cn ? '提交时间' : 'Submission Time' }}：{{ item.create_time | formatDate('yyyy-MM-dd') }}</div>
						<div class="address">{{ cn ? '地区' : 'Region' }}：{{ item.country_name }},{{ item.region_name }}</div>
						<ul class="tag-box" v-if="item.company_type_lists.length">
							<span class="tag" v-if="index < 2" v-for="(tag, index) in item.company_type_lists">{{ tag.company_type_name }}</span>
							<span v-if="item.company_type_lists.length > 2">...</span>
						</ul>
					</div>
					<div class="r">
						<div class="state" :class="{ yellow: company_states == 'wait', red: company_states == 'refuse', green: company_states == 'pass' || company_states == 'sold' }">
							{{ cn ? '待审核' : 'To Be Reviewed' }}
						</div>
						<div class="ope-box">
							<router-link class="blue" :to="{ path: '/me/sale-info', query: { company_id: item.company_id } }" tag="span">{{ cn ? '查看' : 'View' }}</router-link>
							<!-- 已出售 不能编辑 -->
							<span v-if="company_states != 'sold'" class="spe"></span>
							<router-link v-if="company_states != 'sold'" class="blue" :to="{ path: '/me/sale-edit', query: { company_id: item.company_id } }"
							 tag="span">
								{{ cn ? '编辑' : 'Modify' }}
							</router-link>
						</div>
					</div>
				</div>
				<div v-if="current_page != total_page && total_page != 0" @click="viewMore" class="more">{{ cn ? '查看更多' : 'View More' }}</div>
				<div v-else class="more">{{ cn ? '没有更多了' : 'No More' }}</div>
			</div>
		</template>
		<!-- 2没有结果 -->
		<div v-else class="no-result">{{ cn ? '没有任何出售公司信息' : 'No information on the company being sold' }}～</div>
	</div>
</template>

<script>
	// import urls from '../../api/index.js';
	export default {
		name: 'saleList',
		data() {
			return {
				company_states: 'wait',
				current_page: 1,
				limit: 12,
				total_num: 0,
				total_page: 0,
				lists: []
			};
		},
		watch: {
			$route: {
				handler(val, oldVal) {
					if (val.query.company_states != oldVal.query.company_states) {
						this.lists = [];
					}
					this.getSellInfoList();
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
			changeStatus(status) {
				this.company_states = status;
				let query = JSON.parse(JSON.stringify(this.$route.query));
				query.page = 1;
				query.company_states = status;
				console.log(query);
				this.$router.push({
					query: query
				});
			},
			getSellInfoList() {
				this.company_states = this.$route.query.company_states;
				this.$get(urls.sellInfoList, {
						company_states: this.$route.query.company_states,
						page: this.$route.query.page,
						limit: this.$route.query.limit
					})
					.then(res => {
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
						this.loadEnd();
						console.log(err);
					});
			}
		},
		created() {
			if (window.screen.width <= 750) {
				let query = JSON.parse(JSON.stringify(this.$route.query));
				if (query.page == 1) {
					this.getSellInfoList();
					return false;
				}
				query.page = 1;
				this.$router.replace({
					query: query
				});
				return false;
			}
			this.getSellInfoList();
		}
	};
</script>

<style></style>
