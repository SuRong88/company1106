<template>
	<div class="offline">
		<div class="wrapper">
			<img class="offline-img" src="../assets/img/pc/icon15.png" alt="" />
			<p class="tip">
				{{cn?'该公司已下线！':'This Company has been removed'}}
			</p>
			<div class="btn-box">
				<router-link class='btn-back' to="/me/info" tag="button">
					{{cn?'返回个人中心':'Return to Personal Center'}}
				</router-link>
				<router-link class='btn-back' to="/index" tag="button">
					{{cn?'返回首页':'Return to Home Page'}}
				</router-link>

			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'offline',
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			},
		}
	}
</script>
<style>
</style>
