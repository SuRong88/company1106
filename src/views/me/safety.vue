<template>
	<div class="safety">
		<div class="title">
			{{cn?'账号安全':'Account Security'}}
		</div>
		<div class="content">
			<ul>
				<li>
					<img class="icon" src="../../assets/img/pc/icon11.png" alt="">
					<span class="label">
						{{cn?'登录账号':'Account'}}</span>
					<span class="spe"></span>
					<input readonly type="text" v-model="user.email">
				<li>
					<img class="icon" src="../../assets/img/pc/icon11.png" alt="">
					<span class="label">
						{{cn?'登录密码':'Password'}}</span>
					<span class="spe"></span>
					<input readonly type="text" value="********">
					<router-link to="/edit">
						{{cn?'修改':'Modify'}}
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'safety',
		data() {
			return {}
		},
		computed: {
			user() {
				return this.$store.state.userInfo;
			},
			cn() {
				return this.$store.state.language == 'cn';
			}
		}
	}
</script>

<style>
</style>
