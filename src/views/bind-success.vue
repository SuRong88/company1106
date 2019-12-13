<template>
	<!-- 移动端 微信绑定成功提示 -->
	<div class="success register-success">
		<div class="wrapper">
			<div>
				<h2 class="title">{{ cn ? '绑定成功' : 'Successfully Bound' }}</h2>
				<img class="success-icon" src="../assets/img/pc/icon07.png" alt="" />
				<div class="btn-box">
					<router-link tag="button" to="/index" class="back-btn">{{ cn ? '返回首页' : 'Return to Home Page' }}</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {};
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		}
	};
</script>

<style scoped>
	.back-btn{
		overflow: hidden;
		margin: 0 auto;
	}
</style>
