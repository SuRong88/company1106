<template>
	<div class="buy">
		<div class="content wrapper">
			<div class="info">
				<p class="title"><span class="label">
						{{cn ? '标题' : 'Title'}}：</span>
					{{payInfo.title}}</p>
				<p v-if="payInfo.member_type" class="tag">
					{{payInfo.member_type}}
				</p>
				<p class="price-item"><span class="label">{{cn ? '单次金额' : 'One-Time Payment'}}：</span><span class="price">{{payInfo.pay_price}}</span>
					<p class="date-item" v-if="payInfo.vip_expire"><span class="label">{{cn ? '有效期至' : 'Valid Until'}}：</span><span
						 class="date">{{payInfo.vip_expire}}</span></p>
			</div>
			<div class="pay-box">
				<p>
					<span class="label">{{cn ? '支付方式' : 'Payment Method'}}：</span>
					<ul>
						<li @click="payMethod('wx')" :class="{active:activeIndex=='wx'}">
							<img class="pay-icon" src="../assets/img/pc/wechat.png" alt="">
							<span class="pay-name">{{cn ? '微信' : 'Wechat'}}</span>
							<img v-if="activeIndex=='wx'" class="checked-icon hide-p" src="../assets/img/m/pay-icon.png" alt="">
							<img v-else class="checked-icon hide-p" src="../assets/img/m/unpay-icon.png" alt="">
						</li>
						<li @click="payMethod('ali')" :class="{active:activeIndex=='ali'}">
							<img class="pay-icon" src="../assets/img/pc/alipay.png" alt="">
							<span class="pay-name">{{cn ? '支付宝' : 'Alipay'}}</span>
							<img v-if="activeIndex=='ali'" class="checked-icon hide-p" src="../assets/img/m/pay-icon.png" alt="">
							<img v-else class="checked-icon hide-p" src="../assets/img/m/unpay-icon.png" alt="">
						</li>
						<li @click="payMethod('union')" :class="{active:activeIndex=='union'}">
							<img class="pay-icon" src="../assets/img/pc/yinlian.png" alt="">
							<span class="pay-name">{{cn ? '银联' : 'Yinlian'}}</span>
							<img v-if="activeIndex=='union'" class="checked-icon hide-p" src="../assets/img/m/pay-icon.png" alt="">
							<img v-else class="checked-icon hide-p" src="../assets/img/m/unpay-icon.png" alt="">
						</li>
						<li @click="payMethod('visia')" :class="{active:activeIndex=='visia'}">
							<img class="pay-icon" src="../assets/img/pc/visa.png" alt="">
							<span class="pay-name">visa</span>
							<img v-if="activeIndex=='visia'" class="checked-icon hide-p" src="../assets/img/m/pay-icon.png" alt="">
							<img v-else class="checked-icon hide-p" src="../assets/img/m/unpay-icon.png" alt="">
						</li>
						<li @click="payMethod('mastercard')" :class="{active:activeIndex=='mastercard'}">
							<img class="pay-icon" src="../assets/img/pc/mastercard.png" alt="">
							<span class="pay-name">mastercard</span>
							<img v-if="activeIndex=='mastercard'" class="checked-icon hide-p" src="../assets/img/m/pay-icon.png" alt="">
							<img v-else class="checked-icon hide-p" src="../assets/img/m/unpay-icon.png" alt="">
						</li>
						<li @click="payMethod('paypal')" :class="{active:activeIndex=='paypal'}">
							<img class="pay-icon" src="../assets/img/pc/palpay.png" alt="">
							<span class="pay-name">paypal</span>
							<img v-if="activeIndex=='paypal'" class="checked-icon hide-p" src="../assets/img/m/pay-icon.png" alt="">
							<img v-else class="checked-icon hide-p" src="../assets/img/m/unpay-icon.png" alt="">
						</li>
					</ul>
				</p>
				<div class="code-box" v-if="pay">
					<img class="pay-code" :src="payCodeSrc" alt="">
					<p class="tip">{{cn ? '请打开手机微信，扫二维码' : 'Please open WeChat on your cell phone, scan QR code to pay'}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from "../api/index.js"
	import wx from 'weixin-js-sdk'
	var timer = null
	export default {
		name: 'buy',
		data() {
			return {
				// 支付方式下标
				activeIndex: '',
				// 是否微信支付
				pay: false,
				// 支付方式
				type: '',
				// 二维码图片地址
				payCodeSrc: '',
				// 支付信息
				payInfo: [],
				// 移动端支付初始化
				hasInit: false,
			}
		},
		computed: {
			// 付款参数
			orderQuery() {
				var obj = {
					"90_vip_price": this.$store.state.payInfo[0],
					"180_vip_price": this.$store.state.payInfo[1],
					"360_vip_price": this.$store.state.payInfo[2],
					"company_purchase_info_price": this.$store.state.payInfo[3],
					"company_id": this.$store.state.payInfo[4]
				}
				return obj
			},
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			// 先检查是否有订单id 重新购买/支付发布公司费用
			// 页面检查是否存在支付参数  为空不能进入支付信息页面
			checkStatus() {
				if (this.$route.query.order_id) {
					return false
				}
				var flag = false
				for (let i = 0; i < this.$store.state.payInfo.length; i++) {
					if (this.$store.state.payInfo[i] != '') {
						flag = true
						break
					}
				}
				if (flag) {
					return false
				}
				setTimeout(() => {
					window.history.go(-1)
				}, 1000);
			},
			// 选择支付方式 暂支持微信支付宝paypal三种
			payMethod(type) {
				if (this.type == type) {
					return false
				}
				clearInterval(timer)
				this.activeIndex = type;
				this.type = type;
				// 1微信
				if (type == 'wx') {
					// 移动支付
					if (window.screen.width <= 750) {
						this.$get(urls.buyMethod, {
							order_id: this.payInfo.order_id,
							type: this.type,
							device_port: "mobile"
						}).then((res) => {
							this.loadEnd()
						}).catch((err) => {
							this.loadEnd();
							if (err.data.code == -1) {
								this.errorToast(err.data.msg)
								return false
							}
							this.payment(err.data)
						})
						return false
					}
					// pc支付
					this.pay = true
					this.$get(urls.buyMethod, {
						order_id: this.payInfo.order_id,
						type: this.type,
						device_port: "pc"
					}).then((res) => {
						this.loadEnd()
					}).catch((err) => {
						this.loadEnd();
						this.payCodeSrc = err.data;
						var second = 0;
						timer = setInterval(() => {
							if (second >= 59) {
								clearInterval(timer)
								this.loadEnd();
								this.cn ? this.errorToast('支付超时，请重新支付') : this.errorToast('Payment timeout, please pay again');
								this.pay = false
								let order_id = this.payInfo.order_id
								this.$router.replace({
									path: '/pay-fail',
									query: {
										order_id: order_id
									}
								})
								return false
							}

							this.$get(urls.paySuccess, {
								order_id: this.payInfo.order_id
							}).then((res) => {
								if (res.data.pay_success) {
									clearInterval(timer)
									this.loadEnd();
									this.pay = false
									let company_id = (this.orderQuery.company_id == '') ? null : this.orderQuery.company_id
									this.$router.replace({
										path: '/pay-success',
										query: {
											company_id: company_id
										}
									})
									return false
								}
							})
							second = second + 1;
						}, 1000)
					})
					return false;
				}
				clearInterval(timer)
				this.pay = false
				if (type == 'ali') {
					// 移动支付
					if (window.screen.width <= 750) {
						this.$router.push({
							path: '/open-in-browser',
							query: {
								order_id: this.payInfo.order_id,
								language: this.cn ? 'cn' : 'en'
							}
						})
						return false
					}
					// pc支付
					this.$get(urls.buyMethod, {
						order_id: this.payInfo.order_id,
						type: this.type,
						device_port: "pc",
					}).then((res) => {
						this.loadEnd()
					}).catch((err) => {
						this.loadEnd()
						const div = document.createElement('div');
						div.innerHTML = (err.data);
						document.body.appendChild(div);
						setTimeout(function() {
							document.forms['alipaysubmit'].submit();
						}, 200)
					})
					return false;
				}
				if (type == 'paypal') {
					this.$get(urls.buyMethod, {
						order_id: this.payInfo.order_id,
						type: this.type,
						device_port: "pc"
					}).then((res) => {
						this.loadEnd()
					}).catch((err) => {
						this.loadEnd()
						window.location.href = err.data
						console.log(err)
					})
					return false;
				}
				// 其他方式暂不支持
				this.cn ? this.errorToast('该支付方式暂不支持') : this.errorToast('This payment method is not supported at this moment')
			},
			// 待处理payInfo 刷新vuex数据丢失
			getPayInfo() {
				console.log(this.orderQuery)
				if (!this.$route.query.order_id) { //没有order_id 正常购买会员 公司
					this.$post(urls.buyOrder, this.orderQuery).then((res) => {
						this.loadEnd()
						this.payInfo = res.data;
					}).catch((err) => {
						this.loadEnd()
						this.cn ? this.errorToast('支付信息已过期') : this.errorToast('Payment information has expired')
					})
				} else { //有order_id 再次购买 / 发布
					this.$get(urls.buyAgain, {
						order_id: this.$route.query.order_id
					}).then((res) => {
						this.loadEnd()
						this.payInfo = res.data;
					}).catch((err) => {
						this.loadEnd()
						this.errorToast(error.data.msg)
					})
				}
			},
			// 移动端支付
			payment(paydata, cb) { //请求支付
				let that = this;
				wx.chooseWXPay({
					appId: paydata.appId,
					timestamp: paydata.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: paydata.nonceStr, // 支付签名随机串，不长于 32 位
					package: paydata.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***
					signType: paydata.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: paydata.paySign, // 支付签名
					success: function(result) {
						let company_id = (that.orderQuery.company_id == '') ? 0 : that.orderQuery.company_id
						that.$router.replace({
							path: '/pay-success',
							query: {
								company_id: company_id
							}
						})
					},
					fail() {
						that.cn ? that.errorToast("支付链接被吃掉了，2秒后刷新请再重试") : that.errorToast(
							'Invalid payment link, refresh in 2 seconds, please try again')
						setTimeout(function() {
							window.location.reload()
						}, 2000)
					},
					cancel() {
						that.cn ? that.errorToast("支付失败") : that.errorToast("Payment Declined")
					}
				})
			},
			//jssdk初始化
			jssdkInit(cb) {
				if (this.hasInit) {
					this.loadEnd()
					wx.ready(function() {})
				} else {
					this.$get(urls.wxsdk, {
							url: window.location.href
						})
						.then(res => {
							let data = res.data
							wx.config({
								// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
								debug: false,
								// 必填，公众号的唯一标识
								appId: data.appId,
								// 必填，生成签名的时间戳
								timestamp: data.timestamp,
								// 必填，生成签名的随机串
								nonceStr: data.nonceStr,
								// 必填，签名，见附录1
								signature: data.signature,
								// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
								jsApiList: ['chooseWXPay']
							})
							this.hasInit = true
							wx.error(function(res) {
								console.log(res)
								return false
							});
							this.loadEnd()
							wx.ready(function() {
								if (cb) {
									// cb(that)
								}
							})
						})
				}
			},

		},
		created() {
			clearInterval(timer)
			this.checkStatus()
			this.getPayInfo()
			if (window.screen.width <= 750) {
				this.jssdkInit()
			}
		},
		beforeDestroy() {
			clearInterval(timer)
		}
	}
</script>

<style>
</style>
