<template>
	<!-- 移动端微信绑定失败 -->
	<div class="success register-success">
		<div class="wrapper">
			<div>
				<h2 class="title">{{ cn ? '绑定失败' : 'Unsuccessfully Bound' }}</h2>
				<img class="success-icon" src="../assets/img/pc/icon077.png" alt="" />
				<div class="btn-box">
					<router-link tag="button" to="/me/info" class="back-btn">{{ cn ? '重新绑定' : 'Try again' }}</router-link>
					<router-link tag="button" to="/index" class="join-btn">{{ cn ? '返回首页' : 'Return to Home Page' }}</router-link>
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
	.join-btn{
		overflow: hidden;
	}
</style>
