<template>
	<div class="home" :class="{ 'home-en': !cn }">
		<v-Header></v-Header>
		<router-view></router-view>
		<v-footer></v-footer>
		<div id="go-top" class="go-top" @click="scrollTop"><img class="top-icon" src="../assets/img/pc/btn01.png" alt="" /></div>
	</div>
</template>

<script>
	import vHeader from 'components/common/header.vue';
	import vFooter from 'components/common/footer.vue';
	window.onscroll = function() {
		if (window.screen.width < 750) {
			return false;
		}
		if (document.documentElement.scrollTop < 1000) {
			document.getElementById('go-top').style.display = 'none';
		} else {
			document.getElementById('go-top').style.display = 'flex';
		}
	};
	export default {
		name: 'home',
		data() {
			return {};
		},
		components: {
			vHeader,
			vFooter
		},
		methods: {
			getInfo() {
				this.$store.dispatch('getUserInfoHandle');
			},
			scrollTop() {
				window.scroll(0, 0);
			}
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		created() {
			localStorage.getItem('company') ? this.getInfo() : '';
		},
		beforeDestroy() {}
	};
</script>

<style></style>
