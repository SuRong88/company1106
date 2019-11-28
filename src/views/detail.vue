<template>
	<div class="detail">
		<v-search></v-search>
		<div class="wrapper" v-if="article_title">
			<el-breadcrumb v-if="html_template != 'detail'" class="el-breadcrumb" separator-class="el-icon-d-arrow-right">
				<el-breadcrumb-item :to="{ path: '/index' }">{{ cn ? '首页' : 'Home' }}</el-breadcrumb-item>
				<el-breadcrumb-item v-if="html_template == 'adviser'">{{ cn ? '服务详情' : 'Service Details' }}</el-breadcrumb-item>
				<el-breadcrumb-item v-if="html_template == 'case'">{{ cn ? '案例详情' : 'Case details' }}</el-breadcrumb-item>
			</el-breadcrumb>
			<h1 class="title">{{ article_title }}</h1>
			<p class="info" v-if="html_template != 'detail'">
				{{ cn ? '上传日期' : 'Date' }}：
				<span clanumss="date">{{ create_time | formatDate('yyyy-MM-dd') }}</span>
				{{ cn ? '浏览次数' : 'visit' }}：
				<span class="">{{ visits }}</span>
			</p>
			<div class="edit_textBox" v-html="detail"></div>
			<img v-for="item in imgs" class="img" :src="item.img_path" alt="" />
		</div>
		<div class="no-result" v-else>{{ cn ? '抱歉~内容为空' : 'No information' }}</div>
	</div>
</template>

<script>
	// import urls from '../api/index.js';
	import vSearch from 'components/common/search.vue';
	export default {
		name: 'detail',
		components: {
			vSearch
		},
		data() {
			return {
				html_template: '',
				article_id: '',
				article_title: '',
				create_time: '',
				visits: '',
				detail: '',
				imgs: [],
				visits: 0
			};
		},
		watch: {
			$route: {
				handler() {
					this.getDetail();
				},
				deep: true
			}
		},
		computed: {
			cn() {
				return this.$store.state.language == 'cn';
			}
		},
		methods: {
			getDetail() {
				if (!(this.$route.query.html_template && this.$route.query.article_id)) {
					this.cn ? this.errorToast('参数缺失') : this.errorToast('Parameters missing');
					return false;
				}
				this.html_template = this.$route.query.html_template;
				this.article_id = this.$route.query.article_id;
				this.$get(urls.postDetail, {
					html_template: this.$route.query.html_template,
					article_id: this.$route.query.article_id
				}).then(res => {
					this.loadEnd();
					if (!res.data.case && !res.data.adviser && !res.data.detail) {
						this.article_id = '';
						this.article_title = '';
						this.create_time = '';
						this.visits = 0;
						this.detail = '';
						this.imgs = [];
						this.visits = 0;
						return false;
					}
					this.article_id = '';
					this.article_title = '';
					this.create_time = '';
					this.visits = 0;
					this.detail = '';
					this.imgs = [];
					this.visits = 0;
					switch (this.html_template) {
						// 对应模板跳转，详情id为lists.jump_value
						case 'case':
							this.article_title = res.data.case.article_title;
							this.create_time = res.data.case.create_time;
							this.detail = res.data.case.detail;
							this.imgs = res.data.case.imgs;
							this.visits = res.data.case.visits;
							break;

						case 'adviser':
							this.article_title = res.data.adviser.article_title;
							this.create_time = res.data.adviser.create_time;
							this.detail = res.data.adviser.detail;
							this.imgs = res.data.adviser.imgs;
							this.visits = res.data.adviser.visits;
							break;

						case 'detail':
							this.article_title = res.data.detail.article_title;
							this.detail = res.data.detail.detail;
							break;
					}
				});
			}
		},
		created() {
			console.log('触发create');
			this.getDetail();
		}
	};
</script>

<style></style>
