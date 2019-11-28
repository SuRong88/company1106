<template>
	<!-- 支付失败 -->
	<div class="pay">
		<div class="wrapper">
			<img class="result-icon" src="../assets/img/pc/icon06.png" alt="" />
			<p class="pay-result">{{ cn ? '支付失败' : 'Payment Declined' }}</p>
			<p class="pay-tip"></p>
			<div class="btn-box">
				<router-link :to="{
						path: '/buy',
						query: {
							order_id: order_id
						}
					}" tag="button">
					{{ cn ? '重新支付' : 'Repay' }}
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
				order_id: ''
			};
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			getQuery() {
				this.order_id = this.$route.query.order_id;
				console.log(this.order_id);
			}
		},
		created() {
			this.getQuery();
		}
	};
</script>

<style></style>
