<template>
	<div class="reset">
		<div class="wrapper">
			<div class="reset-box" v-if="!success">
				<h1 class="title">{{ cn ? '重置密码' : 'Reset Password' }}</h1>
				<input class="password" v-model="pwd01" type="password" :placeholder="cn ? '重置密码' : 'Reset Password'" />
				<input class="password2" v-model="pwd02" type="password" :placeholder="cn ? '确认密码' : 'Confirm password'"
				 @keyup.enter="submitHandle" />
				<button class="submit-btn" @click="submitHandle">{{ cn ? '提交' : 'Submit' }}</button>
			</div>
			<!-- 成功提示 -->
			<div class="success" v-else>
				<h2 class="title">{{ cn ? '重置密码成功，请重新登录' : 'Password has been successfully reset, please re-login' }}</h2>
				<img class="success-icon" src="../assets/img/pc/icon07.png" alt="" />
				<router-link to="/login" class="relogin-btn" tag="button">{{ cn ? '重新登录' : 'Re-login' }}</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	// import urls from '../api/index.js';
	import axios from 'axios';
	export default {
		name: 'reset',
		data() {
			return {
				pwd01: '',
				pwd02: '',
				success: false
			};
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			submitHandle() {
				if (this.nullTest(this.pwd01)) {
					this.cn ? this.errorToast('新密码不能为空') : this.errorToast('Please enter new password');
					return false;
				}
				if (this.nullTest(this.pwd02)) {
					this.cn ? this.errorToast('确认新密码不能为空') : this.errorToast('Please confirm new password');
					return false;
				}
				if (!this.passwordTest(this.pwd01)) {
					this.cn ? this.errorToast('新密码格式错误') : this.errorToast('Incorrect new password format');
					return false;
				}
				if (this.pwd01 !== this.pwd02) {
					this.cn ? this.errorToast('两次输入密码不一致') : this.errorToast('The two passwords entered are inconsistent');
					return false;
				}
				localStorage.setItem('company', this.$route.query.XToken);
				this.$post(urls.resetPwd, {
						pwd: this.md5(this.pwd01)
					})
					.then(() => {
						this.loadEnd();
						this.success = true;
					})
					.catch(err => {
						this.loadEnd();
						console.log(err);
						this.errorToast(err.data.msg);
					});
			}
		},
		created() {
			this.$store.commit('logout');
		}
	};
</script>

<style></style>
