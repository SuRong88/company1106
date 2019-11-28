<template>
	<div class="openInBrowser">
		<div class="browser-top clear">
			<h1>{{ lang == 'cn' ? '支付成功' : 'Payment Accepted' }}</h1>
			<p class="notes">{{ lang == 'cn' ? '请返回微信浏览器继续操作' : 'Please return to the WeChat browser to continue' }}</p>
		</div>
		<div class="browser-box">
			<img class="browser-icon" src="../assets/img/m/icon05.png" alt="" />
			<span class="browser-txt">{{ lang == 'cn' ? '请在微信浏览器打开' : 'Please open it in WeChat browser' }}</span>
		</div>
	</div>
</template>
<script>
	// 需要后台返回语言  根据语言显示相应文本
	export default {
		data() {
			return {
				lang: 'cn'
			};
		},
		created() {
			if (this.$route.query.lang) {
				this.lang = this.$route.query.lang;
				console.log(this.$route.query.lang);
			}
		}
	};
</script>
<style scoped>
	.openInBrowser {
		padding-top: 2rem;
	}

	h1 {
		text-align: center;
		font-weight: 500;
		font-size: 1.4rem;
		color: rgba(51, 51, 51, 1);
		margin-bottom: 1rem;
	}

	.browser-top {
		margin-bottom: 2rem;
		padding-top: 2rem;
	}

	.notes {
		clear: both;
		text-align: center;
		font-size: 1.2rem;
		color: rgba(51, 51, 51, 1);
		line-height: 1.8rem;
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
		padding: 0 1rem;
		text-align: center;
		font-size: 0.8rem;
		margin-top: 0.5rem;
		color: rgba(51, 51, 51, 1);
	}
</style>
