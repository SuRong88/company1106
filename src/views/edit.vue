<template>
	<div class="edit">
		<div class="wrapper">
			<div class="edit-box" v-if="!success">
				<h1 class="title">{{ cn ? '修改密码' : 'Modify password' }}</h1>
				<input class="password0" v-model="oldPwd" type="password" :placeholder="cn ? '原登录密码' : 'Original password'" />
				<input class="password1" v-model="newPwd01" type="password" :placeholder="cn ? '新登录密码' : 'New password'" />
				<input class="password2" v-model="newPwd02" type="password" :placeholder="cn ? '确认新密码' : 'Confirm password'" />
				<button class="submit-btn" @click="checkPwd">{{ cn ? '提交' : 'Submit' }}</button>
			</div>
			<!-- 成功提示 -->
			<div class="success" v-else>
				<h2 class="title">{{ cn ? '修改密码成功' : 'Successfully Modified' }}</h2>
				<img class="success-icon" src="../assets/img/pc/icon07.png" alt="" />
				<router-link tag="button" to="me/info" class="back-btn">{{ cn ? '返回个人中心' : 'Return to Personal Center' }}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from '../api/index.js';
	export default {
		name: 'edit',
		data() {
			return {
				oldPwd: '',
				newPwd01: '',
				newPwd02: '',
				success: false
			};
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			checkPwd() {
				if (this.nullTest(this.oldPwd)) {
					this.cn ? this.errorToast('旧密码不能为空') : this.errorToast('Please enter original password');
					return false;
				}
				if (this.nullTest(this.newPwd01)) {
					this.cn ? this.errorToast('新密码不能为空') : this.errorToast('Please enter new password');
					return false;
				}
				if (this.nullTest(this.newPwd02)) {
					this.cn ? this.errorToast('确认新密码不能为空') : this.errorToast('Confirm new password cannot be empty');
					return false;
				}
				if (!this.passwordTest(this.oldPwd)) {
					this.cn ? this.errorToast('旧密码格式错误') : this.errorToast('Incorrect original password format');
					return false;
				}
				if (!this.passwordTest(this.newPwd01)) {
					this.cn ? this.errorToast('新密码格式错误') : this.errorToast('Incorrect new password format');
					return false;
				}
				if (this.newPwd01 !== this.newPwd02) {
					this.cn ? this.errorToast('两次输入密码不一致') : this.errorToast('The two passwords entered are inconsistent');
					return false;
				}
				this.$put(urls.editPwd, {
						pwd_old: this.md5(this.oldPwd),
						pwd_new: this.md5(this.newPwd01)
					})
					.then(() => {
						this.loadEnd();
						(this.oldPwd = ''),
						(this.newPwd01 = ''),
						(this.newPwd02 = ''),
						(this.success = true),
						// 更新信息
						this.$store.dispatch('getUserInfoHandle');
					})
					.catch(err => {
						this.loadEnd();
						console.log(err);
						this.errorToast(err.data.msg);
					});
			}
		}
	};
</script>

<style></style>
