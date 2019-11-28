<template>
	<div class="collect">
		<div class="title">{{ cn ? '收藏管理' : 'Bookmark Management' }}</div>
		<template v-if="lists.length">
			<div class="list clear hide-m">
				<div class="item" v-for="item in lists">
					<img class="img" :src="item.img_path" alt="" />
					<ul class="content">
						<li class="item-title">{{ item.company_name }}</li>
						<li>
							{{ cn ? '出售价格' : 'Selling Price' }}：
							<span class="price">
								¥
								<i>{{ item.company_price }}</i>
							</span>
						</li>
						<li>{{ item.country_name }}，{{ item.region_name }}</li>
						<li>
							<span class="label" v-if="index < 2" v-for="(type, index) in item.company_type_lists">{{ type.company_type_name }}</span>
						</li>
						<li class="view">
							<router-link class="detail-btn" tag="span" :to="{ path: '/company_purchase_info', query: { company_id: item.company_id } }">
								{{ cn ? '查看详情' : 'View Details' }}
							</router-link>
							<span class="collect-icon-box" @click="cancelCollect(item.company_id, index)">
								<img class="collect-icon" src="../../assets/img/pc/btn06.png" alt="" />
								{{ cn ? '取消' : 'Cancel' }}
							</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="list clear hide-p">
				<div class="item" v-for="item in lists">
					<div class="top">
						<img class="img" :src="item.img_path" alt="" />
						<ul class="content">
							<li class="item-title">{{ item.company_name }}</li>
							<li>
								{{ cn ? '出售价格' : 'Selling Price' }}：
								<span class="price">
									¥
									<i>{{ item.company_price }}</i>
								</span>
							</li>
							<li>{{ item.country_name }}，{{ item.region_name }}</li>
							<li>
								<span class="label" v-if="index < 2" v-for="(type, index) in item.company_type_lists">{{ type.company_type_name }}</span>
								<span v-if="item.company_type_lists.length>2">...</span>
							</li>
						</ul>
					</div>
					<div class="bottom">
						<div class="l">
							<span class="collect-icon-box" @click="cancelCollect(item.company_id, index)">
								<img class="collect-icon" src="../../assets/img/pc/btn06.png" alt="" />
								{{ cn ? '取消' : 'Cancel' }}
							</span>
						</div>
						<div class="r">
							<router-link class="detail-btn" tag="span" :to="{ path: '/company_purchase_info', query: { company_id: item.company_id } }">
								{{ cn ? '查看详情' : 'View Details' }}
							</router-link>
						</div>
					</div>
				</div>
				<div v-if="current_page != total_page && total_page != 0" @click="viewMore" class="more">{{ cn ? '查看更多' : 'View More' }}</div>
				<div v-else class="more">{{ cn ? '没有更多了' : 'No More' }}</div>
			</div>
			<el-pagination @current-change="handleCurrentChange" class="pagination hide-m" background layout="prev, pager, next"
			 :page-size="12" :current-page="current_page" :total="total_num"></el-pagination>
		</template>
		<!-- 2没有结果 -->
		<div v-else class="no-result">{{ cn ? '收藏公司信息为空，快去收藏吧' : 'No information' }}～</div>
	</div>
</template>

<script>
	// import urls from '../../api/index.js';
	export default {
		name: 'collect',
		methods: {},
		data() {
			return {
				total_num: 1,
				total_page: 1,
				current_page: 1,
				lists: []
			};
		},
		watch: {
			$route: {
				handler() {
					console.log('当前页改变');
					this.getCollectList();
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
			// 页码改变
			handleCurrentChange(val) {
				console.log(val);
				let query = JSON.parse(JSON.stringify(this.$route.query));
				query.page = val;
				this.$router.push({
					query: query
				});
			},
			// 获取收藏列表
			getCollectList() {
				this.$get(urls.collectList, {
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
						console.log(res);
					})
					.catch(err => {
						console.log(err);
						this.loadEnd();
						this.errorToast(err.data.msg);
					});
			},
			// 取消收藏
			// 公司id  数组下标
			cancelCollect(id, index) {
				this.$post(urls.collect, {
						company_id: id,
						is_collect: 0
					})
					.then(res => {
						this.loadEnd();
						this.cn ? this.successToast('操作成功') : this.successToast('Action Succeeded');
						this.lists.splice(index, 1);
					})
					.catch(err => {
						this.loadEnd();
						this.cn ? this.errorToast('操作失败') : this.errorToast('Action Failed');
						console.log(err);
					});
			}
		},
		created() {
			if (window.screen.width <= 750) {
				let query = JSON.parse(JSON.stringify(this.$route.query));
				if (query.page == 1) {
					this.getCollectList();
					return false;
				}
				query.page = 1;
				this.$router.replace({
					query: query
				});
				return false;
			}
			this.getCollectList();
		}
	};
</script>

<style></style>
