<template>
	<!-- 成功 -->
	<div class="pay">
		<div class="wrapper">
			<img class="result-icon" src="../assets/img/pc/icon05.png" alt="" />
			<p class="pay-result">{{ cn ? '支付成功' : 'Payment Accepted' }}</p>
			<p class="pay-tip">
				<span v-if="company_id == 0">{{ cn ? '已成功购买VIP会员套餐～' : 'Successfully Purchased VIP Membership ' }}</span>
			</p>
			<div class="btn-box">
				<router-link v-if="company_id != 0" :to="{ path: '/company_purchase_info', query: { company_id: company_id } }" tag="button">
					{{ cn ? '查看公司详情' : 'View Company Details' }}
				</router-link>
				<router-link v-else to="/me/info" tag="button">
					{{ cn ? '返回个人中心' : 'Return to Personal Center' }}
				</router-link>
				<router-link to="/index" tag="button">
					{{ cn ? '返回首页' : 'Return to Home Page' }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				company_id: ''
			};
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			getQuery() {
				// company_id==0 就是购买会员 否则就是购买/出售公司
				this.$store.commit('clearPayInfo');
				this.company_id = this.$route.query.company_id;
				console.log(this.company_id);
				if (this.company_id == 0) {
					// 买了会员 更新用户信息
					this.$store.dispatch('getUserInfoHandle');
				}
			}
		},
		created() {
			this.getQuery();
		}
	};
</script>

<style></style>
