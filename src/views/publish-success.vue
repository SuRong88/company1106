<template>
	<div class="publish-success ">
		<img class="success-img" src="../assets/img/pc/icon13.png" alt="" />
		<h1 class="tip">
			{{cn?'已成功提交审核':'Successfully submitted for review'}}
		</h1>
		<router-link to="index">
			<button class="back-btn">
				{{cn?'返回首页':'Return to Home Page'}}
			</button>
		</router-link>
	</div>
</template>

<script>
	export default {
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		}
	}
</script>

<style>
</style>
