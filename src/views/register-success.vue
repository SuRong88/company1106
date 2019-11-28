<template>
	<!-- 注册成功提示 -->
	<div class="success register-success">
		<div class="wrapper">
			<div>
				<h2 class="title">{{ cn ? '注册成功' : 'Successfully Registered' }}</h2>
				<img class="success-icon" src="../assets/img/pc/icon07.png" alt="" />
				<div class="btn-box">
					<router-link tag="button" to="/index" class="back-btn">{{ cn ? '返回首页' : 'Return to Home Page' }}</router-link>
					<router-link tag="button" to="/login" class="join-btn">{{ cn ? '登录' : 'Login' }}</router-link>
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

<style></style>
