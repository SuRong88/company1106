<template>
	<div class="forget">
		<div class="wrapper">
			<div class="forget-box">
				<h1 class="title">{{ cn ? '找回密码' : 'Retrieve password' }}</h1>
				<input class="account" v-model="email" type="text" :placeholder="cn ? '输入邮箱账号' : 'Enter E-mail Address'" />
				<p class="code-box">
					<input @keyup.enter="confirmCode" v-model="code01" class="code" type="text" :placeholder="cn ? '输入验证码' : 'Enter verification code'" />
					<button class="code-btn" :class="{ waiting: waiting }" @click="getImgCode">{{ text }}</button>
				</p>
				<button class="submit-btn" @click="confirmCode">{{ cn ? '提交' : 'Submit' }}</button>
			</div>
			<!-- 图像验证码 -->
			<div class="mask" v-if="getCode">
				<div class="content">
					<span class="el-icon el-icon-close close-btn" @click="getCode = false"></span>
					<h2 class="title">{{ cn ? '输入图像验证码' : 'Please enter Captcha code' }}</h2>
					<p class="code-box">
						<input @keyup.enter="confirmCode" v-model="code01" type="text" :placeholder="cn ? '点击验证码可更换' : 'Click captcha code to replace'" />
						<span @click="changeCode" class="code-img-box"><img class="code-img" :src="codePath" alt="" /></span>
					</p>
					<div class="btn-box">
						<button class="comfirm-btn" @click="confirmCode">{{ cn ? '确定' : 'Confirm' }}</button>
						<button class="cancel-btn" @click="cancelCode">{{ cn ? '取消' : 'Cancel' }}</button>
					</div>
				</div>
			</div>
			<!-- 操作成功 -->
			<div class="mask" v-if="success">
				<div class="content content-success">
					<span class="el-icon el-icon-close close-btn" @click="success = false"></span>
					<h2 class="title">{{ cn ? '操作成功' : 'Action Succeeded' }}</h2>

					<p class="tip">
						{{ cn ? '修改密码邮件已发到' : 'E-mail to reset password has been sent to' }}
						<span class="email">{{ email }}</span>
						{{ cn ? '邮箱， 请前往修改' : 'mailbox, please go ahead to reset' }}
					</p>
					<button class="know-btn" @click="success = false">{{ cn ? '我知道了' : 'OK' }}</button>
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
				// 获取图形码
				getCode: false,
				// 找回密码成功
				success: false,
				// 图形码
				code01: '',
				// 验证码
				code02: '',
				emailCode: '',
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
			// 获取图形码
			getImgCode() {
				// 等待
				if (this.waiting) {
					return false;
				}
				this.code01 = '';
				// 非等待
				if (this.nullTest(this.email)) {
					this.cn ? this.errorToast('邮箱不能为空') : this.errorToast('Please enter e-mail');
					return false;
				}
				if (!this.emailTest(this.email)) {
					this.cn ? this.errorToast('邮箱格式错误') : this.errorToast('Incorrect e-mail format');
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
				if (this.waiting) {
					this.cn ? this.errorToast('请不要频繁操作') : this.errorToast('Please do not operate frequently');
					return false;
				}
				var email = this.email.trim();
				var code01 = this.code01.trim();
				if (!email) {
					this.cn ? this.errorToast('邮箱不能为空') : this.errorToast('Please enter e-mail');
					return false;
				}
				if (!this.emailTest(email)) {
					this.cn ? this.errorToast('邮箱格式错误') : this.errorToast('Incorrect e-mail format');
					return false;
				}
				if (this.nullTest(code01)) {
					this.cn ? this.errorToast('验证码不能为空') : this.errorToast('Please enter verification code');
					return false;
				}
				if (!/^\d{4}$/.test(code01)) {
					this.cn ? this.errorToast('验证码格式错误') : this.errorToast('Incorrect verification code format');
					return false;
				}
				this.$post(urls.email, {
						email: email,
						kinds: 'pwd',
						captcha: code01
					})
					//1 图形码正确
					.then(res => {
						this.success = true;
						this.getCode = false;
						this.loadEnd();
						// 重新获取
						this.waiting = true;
						this.text = 59 + 's';
						var timer = setInterval(() => {
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
					//2 图形码错误
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
			}
		},
		created() {
			this.$store.commit('logout');
		}
	};
</script>

<style>
	.waiting {
		background-color: lightgray !important;
		color: #999 !important;
		outline: none;
	}
</style>
