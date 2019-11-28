<template>
	<div class="order-manage">
		<div class="title">
			{{cn?'订单管理':'Order Management'}}
		</div>
		<ul class="select-box">
			<li class="select-item" :class="{ active: order_type == '' }" @click="changeType('')">
				{{cn?'全部':'All'}}</li>
			<li class="select-item" :class="{ active: order_type == 'company_sell_info' }" @click="changeType('company_sell_info')">
				{{cn?'发布出售公司服务':'Sell Service'}}</li>
			<li class="select-item" :class="{ active: order_type == 'company_purchase_info' }" @click="changeType('company_purchase_info')">
				{{cn?'购买公司服务':'Purchase Service'}}</li>
		</ul>
		<!-- 1有结果 -->
		<template v-if="lists.length>0">
			<!-- pc -->
			<div class="list hide-m">
				<div class="item" v-for="item in lists" v-if="item.pay_success">
					<div class="img-box">
						<img class="img" src="../../assets/img/pc/2_image01.png" alt="" />
					</div>
					<div class="content-box">
						<h1 class="item-title">{{item.company_name}}</h1>
						<ul class="cont">
							<li>
								<span class="label">
									{{cn?'订单编号':'Oder ID'}}：</span>
								{{item.order_numbers}}
							</li>
							<li>
								<span class="label">
									{{cn?'支付时间':'Time of Payment'}}：</span>
								{{item.pay_time|formatDate('yyyy-MM-dd')}}
							</li>
							<li>
								<span class="label">
									{{cn?'类型':'Type'}}：</span>
								{{item.order_type_show}}
							</li>
							<li>
								<span class="label">
									{{cn?'行业':'Industries'}}：</span>
								<span v-for="subitem in item.company_type_lists">
									{{subitem.company_type_name}}
								</span>
							</li>
							<li>
								<span class="label">
									{{cn?'地区':'Region'}}：</span>
								{{item.country_name}}，{{item.region_name}}
							</li>
						</ul>
					</div>
					<div class="other">
						<p class="price">{{item.company_price}}</p>
						<div class="status-view">
							<p class="status">
								{{cn?'已支付':'Paid'}}</p>
							<router-link :to="{path:'/me/order-info',query:{company_id:item.company_id}}" class="view-btn" tag="button">
								{{cn?'查看':'View'}}</router-link>
						</div>
					</div>
				</div>
				<el-pagination @current-change="handleCurrentChange" class="pagination hide-m" background layout="prev, pager, next"
				 :page-size="12" :current-page="current_page" :total="total_num"></el-pagination>
			</div>
			<div class="list hide-p">
				<div class="item" v-for="item in lists" v-if="item.pay_success">
					<div class="top">
						<div class="order-num">
							{{cn?'订单编号':'Oder ID'}}：{{item.order_numbers}}
						</div>
						<div class="state">
							{{cn?'已支付':'Paid'}}
						</div>
					</div>
					<div class="middle">
						<div class="img-box">
							<img class="img" src="../../assets/img/pc/2_image01.png" alt="" />
						</div>
						<div class="content-box">
							<h1 class="item-title">{{item.company_name}}</h1>
							<ul class="cont">
								<li>
									<span class="label">{{cn?'支付时间':'Time of Payment'}}：</span>
									{{item.pay_time|formatDate('yyyy-MM-dd')}}
								</li>
								<li>
									<span class="label">{{cn?'类型':'Type'}}：</span>
									{{item.order_type_show}}
								</li>
								<li>
									<span class="label">{{cn?'行业':'Industry'}}：</span>
									<span v-for="subitem in item.company_type_lists">
										{{subitem.company_type_name}}
									</span>
								</li>
								<li>
									<span class="label">{{cn?'地区':'Region'}}：</span>
									{{item.country_name}}，{{item.region_name}}
								</li>
							</ul>
						</div>
					</div>
					<div class="bottom">
						<p class="price">{{item.company_price}}</p>
						<router-link :to="{path:'/me/order-info',query:{company_id:item.company_id}}" class="view-btn" tag="button">{{cn?'查看':'View'}}</router-link>
					</div>
				</div>
				<div v-if="current_page!=total_page&&total_page!=0" @click="viewMore" class="more">{{cn?'查看更多':'View More'}}</div>
				<div v-else class="more">{{ cn ? '没有更多了' : 'No More' }}</div>
			</div>
		</template>
		<!-- 2没有结果 -->
		<div class="no-result" v-else>{{cn?'没有任何订单相关信息':'No order related information'}}～</div>
	</div>
</template>

<script>
	// import urls from '../../api/index.js';
	export default {
		name: 'orderManage',
		methods: {},
		data() {
			return {
				order_type: '',
				total_num: 1,
				total_page: 1,
				current_page: 1,
				lists: []
			};
		},
		watch: {
			$route: {
				handler(val, oldVal) {
					if (val.query.order_type != oldVal.query.order_type) {
						this.lists = []
					}
					this.getOrderList()
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
					let query = JSON.parse(JSON.stringify(this.$route.query))
					query.page = this.current_page + 1
					this.$router.push({
						query: query
					});
				} else {}
			},
			handleCurrentChange(val) {
				console.log(val)
				let query = JSON.parse(JSON.stringify(this.$route.query))
				query.page = val
				this.$router.push({
					query: query
				});
			},
			changeStatus(status) {
				this.company_states = status;
				let query = JSON.parse(JSON.stringify(this.$route.query))
				query.company_states = status;
				console.log(query)
				this.$router.push({
					query: query
				});
			},
			changeType(type) {
				if (type == this.order_type) {
					return false;
				}

				this.order_type = type;
				let query = JSON.parse(JSON.stringify(this.$route.query))
				query.page = 1
				query.order_type = type;
				this.$router.push({
					query: query
				});
			},
			getOrderList() {
				this.order_type = this.$route.query.order_type
				this.$get(urls.orderList, {
						order_type: this.$route.query.order_type,
						page: this.$route.query.page,
						limit: this.$route.query.limit
					})
					.then(res => {
						this.loadEnd();
						this.total_num = res.data.total_num || 0;
						this.total_page = res.data.total_page || 0;
						this.current_page = res.data.current_page || 0;
						if (window.screen.width > 750) {
							this.lists = res.data.lists || [];
						} else {
							this.lists = this.lists.concat(res.data.lists);
						}
					})
					.catch(err => {
						this.loadEnd();
						this.cn = 'cn' ? this.errorToast('数据获取失败') : this.errorToast('Data Acquisition Failed');
						console.log(err);
					});
			}
		},
		created() {
			if (window.screen.width <= 750) {
				let query = JSON.parse(JSON.stringify(this.$route.query))
				if (query.page == 1) {
					this.getOrderList()
					return false;
				}
				query.page = 1
				this.$router.replace({
					query: query
				});
				return false
			}
			this.getOrderList()
		}
	};
</script>

<style></style>
