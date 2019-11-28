<template>
	<div class="sale">
		<v-search></v-search>
		<div class="wrapper">
			<h1 class="title">{{ cn ? '出售公司' : 'Selling Companies' }}</h1>
			<div class="content">
				<!-- <h1 class="subtitle">{{ cn ? '发布流程' : 'Publish Procedures' }}</h1> -->
				<div class="edit_textBox" v-html="content"></div>
				<router-link class="publish-btn" tag="div" to="/me/sale-publish">{{ cn ? '马上去发布' : 'Publish Right Away' }}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from '../api/index.js';
	import vSearch from 'components/common/search.vue';
	export default {
		name: 'sale',
		data() {
			return {
				content: ''
			};
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		components: {
			vSearch
		},
		methods: {
			getSellProcess() {
				this.$get(urls.sellProcess, {})
					.then(res => {
						this.content = res.data.content;
					})
					.catch(err => {
						this.loadEnd();
					});
			}
		},
		created() {
			this.getSellProcess();
		}
	};
</script>

<style></style>
