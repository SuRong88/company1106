<template>
	<div class="register-p">
		<div class="wrapper">
			<div class="register-box" v-if="!success">
				<img class="logo" src="../assets/img/pc/logo3.png" alt="" />
				<input class="account" v-model="email" type="text" :placeholder="cn ? '邮箱账号' : 'E-mail Address'" />
				<p class="code-box">
					<input v-model="code02" @keyup.enter="nextStep" class="code" type="text" :placeholder="cn ? '输入验证码' : 'Enter verification code'" />
					<button class="code-btn" :class="{ waiting: waiting }" @click="showCode">{{ text }}</button>
				</p>
				<button class="next-btn" @click="nextStep">{{ cn ? '下一步' : 'Next' }}</button>
				<p class="other">
					<span class="spe"></span>
					{{ cn ? '已有账号' : 'Already has an account' }}？
					<router-link to="/login" class="login" tag="span">{{ cn ? '立即登录' : 'Login now' }}</router-link>
				</p>
			</div>
			<!-- 图像验证码 -->
			<div class="mask" v-if="getCode">
				<div class="content">
					<span class="el-icon el-icon-close close-btn" @click="getCode = false"></span>
					<h2 class="title">{{ cn ? '请输入图像验证码' : 'Please enter Captcha code' }}</h2>
					<p class="code-box">
						<input v-model="code01" @keyup.enter="confirmCode" type="text" :placeholder="cn ? '点击验证码可更换' : 'Click captcha code to replace'" />
						<span @click="changeCode" class="code-img-box"><img class="code-img" :src="codePath" alt="" /></span>
					</p>
					<div class="btn-box">
						<button class="comfirm-btn" @click="confirmCode">{{ cn ? '确定' : 'Confirm' }}</button>
						<button class="cancel-btn" @click="cancelCode">{{ cn ? '取消' : 'Cancel' }}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from '../api/index.js';
	export default {
		name: 'register',
		data() {
			return {
				text: '',
				waiting: false,
				email: '',
				// 图形码
				code01: '',
				// 验证码
				code02: '',
				emailCode: '',
				getCode: false,
				success: false,
				codePath: ''
			};
		},
		computed: {
			cn() {
				this.text = this.$store.state.language == 'cn' ? '获取验证码' : 'Get verification code';
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			// 显示图形码
			showCode() {
				if (this.waiting) {
					return false;
				}
				this.code01 = '';
				var email = this.email.trim();
				if (!email) {
					this.cn ? this.errorToast('请输入邮箱') : this.errorToast('Please enter e-mail');
					return false;
				}
				if (!this.emailTest(email)) {
					this.cn ? this.errorToast('邮箱格式有误') : this.errorToast('Incorrect e-mail format');
					return false;
				}
				this.codePath = urls.captcha;
				this.getCode = true;
			},
			// 切换图形码
			changeCode() {
				this.codePath += Math.random();
			},
			// 确定图形码 获取邮箱验证码
			confirmCode() {
				var email = this.email.trim();
				var code01 = this.code01.trim();
				if (!email) {
					this.cn ? this.errorToast('请输入邮箱') : this.errorToast('Please enter e-mail');
					return false;
				}
				if (!this.emailTest(email)) {
					this.cn ? this.errorToast('邮箱格式有误') : this.errorToast('Incorrect e-mail format');
					return false;
				}
				if (!/^\d{4}$/.test(code01)) {
					this.cn ? this.errorToast('验证码格式有误') : this.errorToast('Incorrect verification code format');
					return false;
				}
				this.$post(urls.email, {
						email: email,
						kinds: 'reg',
						captcha: code01
					})
					.then(res => {
						this.loadEnd();
						// 重新获取
						this.waiting = true;
						this.text = 59 + 's';
						var timer = setInterval(() => {
							// alert('233')
							if (parseInt(this.text) == 0) {
								this.text = this.cn ? '重新获取' : 'Resend';
								this.waiting = false;
								clearInterval(timer);
							} else {
								var second = parseInt(this.text) - 1;
								this.text = second + 's';
							}
						}, 1000);
						this.getCode = false;
						this.emailCode = res.data.email_code;
						console.log(res);
					})
					.catch(err => {
						console.log(err);
						this.loadEnd();
						this.errorToast(err.data.msg);
						this.code01 = '';
						this.changeCode();
					});
			},
			// 取消图形码
			cancelCode() {
				this.getCode = false;
				this.code01 = '';
			},
			// 获取邮箱验证码
			getEmailCode() {},
			// 下一步
			nextStep() {
				var email = this.email.trim();
				var code02 = this.code02.trim();
				var emailCode = this.emailCode.trim();
				if (!email) {
					this.cn ? this.errorToast('请输入邮箱') : this.errorToast('Please enter e-mail');
					return false;
				}
				if (!this.emailTest(email)) {
					this.cn ? this.errorToast('邮箱格式有误') : this.errorToast('Incorrect e-mail format');
					return false;
				}
				if (!code02) {
					this.cn ? this.errorToast('邮箱验证码不能为空') : this.errorToast('Please enter e-mail verification code');
					return false;
				}
				if (!/^\d{6}$/.test(code02)) {
					this.cn ? this.errorToast('邮箱验证码格式错误') : this.errorToast('Incorrect e-mail verification code format');
					return false;
				}
				if (code02 != emailCode) {
					this.cn ? this.errorToast('邮箱验证码错误') : this.errorToast('Incorrect e-mail verification code');
					return false;
				}
				this.$put(urls.email02, {
						email: email,
						kinds: 'reg',
						email_code: emailCode
					})
					.then(res => {
						this.loadEnd();
						this.$router.push({
							path: '/bind'
						});
					})
					.catch(err => {
						console.log(err);
						this.loadEnd();
						this.errorToast(err.data.msg);
					});
			}
		},
		created() {}
	};
</script>

<style scoped>
	button {
		outline: none;
	}

	.waiting {
		background-color: lightgray !important;
		color: #999 !important;
		outline: none;
	}
</style>
