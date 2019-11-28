<template>
	<div class="footer">
		<div class="back-top hide-p" @click="scrollTop">
			<span class="icon el-icon el-icon-arrow-up"></span>
			<span>{{ cn ? '回到顶部' : 'Back to top' }}</span>
		</div>
		<div class="about wrapper">
			<div class="logo-box">
				<router-link to='/index' style="display: block;width: 100%;height: 100%;">
					<img :src="logo_path" alt="" class="logo" />
				</router-link>
			</div>
			<div class="other-box">
				<!-- 联系我们固定死id38 -->
				<router-link tag="span" to="/detail?html_template=detail&article_id=38">
					<img src="../../assets/img/m/btn01.png" alt="" />
					<p>{{ cn ? '联系我们' : 'Contact Us' }}</p>
				</router-link>
				<router-link tag="span" to="/sale">
					<img src="../../assets/img/m/btn02.png" alt="" />
					<p>{{ cn ? '出售公司' : 'Selling Companies' }}</p>
				</router-link>
				<router-link tag="span" to="/purchase?page=1&limit=12">
					<img src="../../assets/img/m/btn03.png" alt="" />
					<p>{{ cn ? '购买公司' : 'Buying Companies' }}</p>
				</router-link>
			</div>
		</div>
		<div class="copyright">{{ icp }}</div>
	</div>
</template>

<script>
	// import urls from '../../api/index.js';
	export default {
		name: 'vfooter',
		data() {
			return {
				ico_path: ''
			};
		},
		computed: {
			icp() {
				return this.$store.state.icp;
			},
			logo_path() {
				return this.$store.state.logo_path;
			},
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			scrollTop() {
				window.scroll(0, 0);
			}
		},
		created() {

		}
	};
</script>

<style></style>
