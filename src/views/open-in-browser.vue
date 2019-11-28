<template>
	<div class="openInBrowser">
		<div class="browser-top clear">
			<img class="arrow-icon" src="../assets/img/m/icon06.png" alt="" />
			<p class="notes">{{ cn ? '请在菜单中选择在浏览器中打开， 以完成支付' : 'Please select open in browser in the menu to complete the payment' }}</p>
		</div>
		<div class="browser-box">
			<img class="browser-icon" src="../assets/img/m/icon05.png" alt="" />
			<span class="browser-txt">{{ cn ? '在浏览器中打开' : 'Open in browser' }}</span>
		</div>
	</div>
</template>

<script>
	// import urls from '../api/index.js';
	export default {
		methods: {
			getForm() {
				this.$get(urls.buyMethod, {
						order_id: this.$route.query.order_id,
						type: 'ali',
						device_port: 'mobile',
						language: this.$route.query.language || 'cn'
					})
					.then(res => {
						this.loadEnd();
					})
					.catch(err => {
						this.loadEnd();
						const div = document.createElement('div');
						div.innerHTML = err.data;
						document.body.appendChild(div);
						setTimeout(function() {
							document.forms['alipaysubmit'].submit();
						}, 200);
					});
			}
		},
		computed: {
			// 付款参数
			orderQuery() {
				var obj = {
					'90_vip_price': this.$store.state.payInfo[0],
					'180_vip_price': this.$store.state.payInfo[1],
					'360_vip_price': this.$store.state.payInfo[2],
					company_purchase_info_price: this.$store.state.payInfo[3],
					company_id: this.$store.state.payInfo[4]
				};
				return obj;
			},
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		created() {
			if (!this.$route.query.order_id) {
				this.$router.replace({
					path: '/index'
				});
				return false;
			}
			var ua = navigator.userAgent.toLowerCase();
			var isWeixin = ua.indexOf('micromessenger') != -1;
			let order_id = this.$route.query.order_id;
			var timer = null;
			var second = 0;
			if (isWeixin) {
				timer = setInterval(() => {
					console.log(233);
					if (second >= 3600) {
						clearInterval(timer);
						this.loadEnd();
						if (this.cn) {
							this.errorToast('支付超时，请重新支付');
						} else {
							this.errorToast('Payment timeout, please pay again');
						}
						this.$router.replace({
							path: '/pay-fail',
							query: {
								order_id: order_id
							}
						});
						return false;
					}
					this.$get(urls.paySuccess, {
						order_id: order_id
					}).then(res => {
						if (res.data.pay_success) {
							clearInterval(timer);
							this.loadEnd();
							let company_id = this.orderQuery.company_id == '' ? null : this.orderQuery.company_id;
							this.$router.replace({
								path: '/pay-success',
								query: {
									company_id: company_id
								}
							});
							return false;
						}
					});
					second = second + 1;
				}, 1000);
				return false;
			}
			this.getForm();
		}
	};
</script>

<style scoped>
	.browser-top {
		margin-bottom: 2rem;
	}

	.notes {
		clear: both;
		width: 50%;
		float: right;
		font-size: 1.2rem;
		color: rgba(51, 51, 51, 1);
		line-height: 1.8rem;
		margin-right: 1rem;
		word-break: break-all;
	}

	.arrow-icon {
		display: block;
		width: 50%;
		float: right;
		width: 2.4rem;
		height: 4.85rem;
		margin: 2rem 2rem -1rem 0rem;
	}

	.browser-box {
		width: 11.1rem;
		height: 11.1rem;
		background: rgba(241, 238, 244, 1);
		border-radius: 50%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.browser-icon {
		width: 4.55rem;
		height: 4.55rem;
	}

	.browser-txt {
		font-size: 0.8rem;
		margin-top: 0.5rem;
		color: rgba(51, 51, 51, 1);
	}
</style>
