<template>
	<div class="login-p">
		<div class="wrapper">
			<div class="login-box">
				<img class="logo" src="../assets/img/pc/logo3.png" alt="" />
				<input v-model="account" class="account" type="text" :placeholder="cn?'邮箱账号':'E-mail Address'" />
				<input v-model="pwd" class="password" type="password" :placeholder="cn?'密码':'Password'" @keyup.enter="login" />
				<button class="login-btn" @click="login">
					{{cn?'登录':'Login'}}
				</button>
				<p class="other">
					<router-link to="/forget" class='forget2' tag="span">
						{{cn?'找回密码':'Retrieve password'}}
					</router-link>
					<span class="spe"></span>
					<span>{{cn?'还没有注册账号？':'Not yet registered for an account'}}</span>
					<router-link to="/register" class='register' tag="span">
						{{cn?'立即注册':'Sign up now'}}
					</router-link>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from '../api/index.js';
	import Bus from '@/bus/event.js';
	export default {
		name: 'login',
		data() {
			return {
				account: '',
				pwd: ''
			};
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			login() {
				if (this.nullTest(this.account)) {
					this.cn ? this.errorToast('请输入邮箱') : this.errorToast('Please enter e-mail');
					return false;
				}
				if (!this.emailTest(this.account)) {
					this.cn ? this.errorToast('邮箱格式有误') : this.errorToast('Incorrect e-mail format');
					return false;
				}
				if (this.nullTest(this.pwd)) {
					this.cn ? this.errorToast('请输入密码') : this.errorToast('Please enter password');
					return false;
				}
				if (!this.passwordTest(this.pwd)) {
					this.cn ? this.errorToast('密码格式有误') : this.errorToast('Incorrect password format');
					return false;
				}
				this.$post(urls.login, {
						account_name: this.account,
						pwd: this.md5(this.pwd)
					})
					.then(res => {
						this.loadEnd();
						localStorage.setItem('company', res.data.XToken);
						sessionStorage.setItem('index', 0)
						sessionStorage.setItem('subIndex', 0)
						this.$router.replace({
							path: '/index'
						});
					})
					.catch(err => {
						this.errorToast(err.data.msg);
						this.loadEnd();
					});
			}
		},
		created() {
			Bus.$emit('getNavIndex', -1, -1);
			this.$store.commit('logout');
		},
		beforeDestroy() {
			this.$store.dispatch('getUserInfoHandle');
		}
	};
</script>

<style></style>
