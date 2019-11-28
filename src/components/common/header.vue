<template>
	<div class="header">
		<div class="nav wrapper">
			<router-link to='/index' class="logo hide-m">
				<img :src="logo_path" style="display: block;width: 100%;height: 100%;" alt="" />
			</router-link>
			<div class="navbar">
				<ul class="nav-menu flex-lg">
					<li @click="handleSelect(index)" class="nav-item" :class="{ active: currentIndex == index }" v-for="(item, index) in lists"
					 v-if="lists && !item.lists">{{ item.nav_name }}</li>
					<li v-else class="nav-item" :class="{ active: currentIndex == index }">
						{{ item.nav_name }}
						<ul class="subnav">
							<li @click="handleSelect(index,index2)" class="subnav-item" :class="{ 'active': currentIndex == index && subIndex == index2 }"
							 v-for="(items, index2) in item.lists">
								{{ items.nav_name }}
							</li>
						</ul>
					</li>
				</ul>
				<!-- 英文 -->
				<div v-if="$store.state.language == 'cn'" class="lang" @click="changeLang">
					<img class="lang-img" src="../../assets/img/pc/zhong.png" alt="" />
					<p>中文</p>
				</div>
				<!-- 中文 -->
				<div v-else class="lang" @click="changeLang">
					<img class="lang-img" src="../../assets/img/pc/ying.png" alt="" />
					<p>EN</p>
				</div>
				<div v-if="!userName" class="login hide-m">
					<div @click="login">{{ cn ? '登录' : 'Login' }}</div>
				</div>
				<div v-else class="logined hide-m flex-lg">
					<router-link tag="span" class="name" to="/me/info" @click.native="currentIndex = 'me'">{{ userName }}</router-link>
					<span class="line"></span>
					<span class="logout" @click="logout">{{ cn ? '退出' : 'Logout' }}</span>
				</div>
				<router-link to='/index' class="m-logo hide-p">
					<img style="display: block;width: 100%;height: 100%;" :src="logo_path" alt="" />
				</router-link>
				<img @click="showM = !showM" class="tab-icon hide-p" src="../../assets/img/m/tab.png" alt="" />
			</div>
		</div>
		<div v-show="showM" class="navbar-box hide-p">
			<div class="navbar-box2">
				<ul class="nav-m">
					<template v-for="(item, index) in lists" v-if="lists">
						<!-- 没子级 -->
						<li v-if="!item.lists" class="nav-item-m" :class="{ spread: currentIndex == index, green: index == 3 }" @click="changeli1(index, item)">
							<span class="item-txt">{{ item.nav_name }}</span>
						</li>
						<!-- 有子级 -->
						<li v-else class="nav-item-m" @click="changeli2(index, item)">
							<!-- 在这里打印出boll值方便查看 -->
							<span class="item-txt" :class="{ spread: currentIndex == index }">
								{{ item.nav_name }}
								<i class="icon-m el-icon el-icon-caret-bottom"></i>
							</span>
							<!-- 判断当前这条数据的bool值如果是true就打开二级菜单,如果是false就关闭二级菜单 -->
							<ul v-show="item.show">
								<!-- 循环二级菜单数据并使用.stop阻止冒泡 -->
								<li class="nav-subitem-m" :class="{ active: currentIndex == index && subIndex == subindex }" v-for="(subitem, subindex) in item.lists"
								 v-on:click.stop="doThis(index, subindex)">
									{{ subitem.nav_name }}
								</li>
							</ul>
						</li>
					</template>
				</ul>
				<div class="login-box">
					<div @click="login" v-if="!userName" class="login-m">{{ cn ? '登录' : 'Login' }}</div>
					<template v-else class="logined hide-m flex-lg">
						<div @click="meInfo" class="name-m">{{ userName }}</div>
						<div class="logout-m" @click="logout">{{ cn ? '退出' : 'Logout' }}</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	// import urls from 'api/index.js';
	import Bus from '@/bus/event.js'
	export default {
		created() {
			this.getNav();
			Bus.$on('getNavIndex', (currentIndex, subIndex) => {
				console.log(currentIndex, subIndex);
				this.currentIndex = currentIndex;
				this.subIndex = subIndex;
				sessionStorage.setItem('index', currentIndex)
				sessionStorage.setItem('subIndex', subIndex)
			});
		},
		data() {
			return {
				lists: [],
				currentIndex: -1,
				subIndex: -1,
				showM: false
			};
		},
		methods: {
			// 移动
			changeli1(ind, item) {
				this.showM = !this.showM;
				// 先循环数据中的show将其全部置为false,此时模板里的v-if判断生效关闭全部二级菜单,并移除样式
				this.lists.forEach(i => {
					if (i.show !== this.lists[ind].show) {
						i.show = false;
					}
				});
				// 取反(true或false)
				if (this.lists[ind].show) {
					if (this.lists[ind].lists) {
						this.$delete(this.lists[ind], 'show');
					} else {}
				} else {
					this.$delete(this.lists[ind], 'show');
					this.$set(this.lists[ind], 'show', !this.lists[ind].show);
				}
				this.currentIndex = ind;
				console.log(item.nav_name);
				sessionStorage.setItem('index', ind);
				let lists = this.lists[ind];
				switch (lists.page_type) {
					case 'index':
						this.$router.push({
							path: '/index'
						});
						break;

						// 文章列表
					case 'lists':
						switch (lists.html_template) {
							// 对应模板跳转，详情id为lists.jump_value
							case 'case':
								// statements_1
								this.$router.push({
									path: '/case',
									query: {
										page: 1,
										limit: 12,
										// listName: lists.nav_name,
										html_template: lists.html_template,
										jump_value: lists.jump_value
									}
								});
								break;

							case 'adviser':
								// statements_1
								this.$router.push({
									path: '/adviser',
									query: {
										page: 1,
										limit: 12,
										// listName: lists.nav_name,
										html_template: lists.html_template,
										jump_value: lists.jump_value
									}
								});
								break;

							case 'detail':
								// statements_1
								break;
						}
						break;
						// 自定义页
					case 'custom':
						switch (lists.html_template) {
							// 详情页id为lists.jump_value
							// 购买公司
							case 'company_purchase_info':
								// statements_1
								this.$router.push({
									path: '/purchase?page=1&limit=12'
								});
								break;
								// 出售公司
							case 'company_sell_info':
								// statements_1
								this.$router.push({
									path: '/sale'
								});
								break;
						}
						break;
						// 站内文章
					case 'article':
						switch (lists.html_template) {
							// 对应模板跳转，详情id为lists.jump_value
							case 'case':
								// statements_1
								break;
							case 'adviser':
								// statements_1
								break;
							case 'detail':
								// statements_1
								this.$router.push({
									path: '/detail',
									query: {
										html_template: lists.html_template,
										article_id: lists.jump_value
									}
								});
								break;
						}
						break;

						// 外部链接
					case 'external':
						window.location.href = lists.jump_value;
						break;
				}
			},
			changeli2(ind, item) {
				// 先循环数据中的show将其全部置为false,此时模板里的v-if判断生效关闭全部二级菜单,并移除样式
				this.lists.forEach(i => {
					if (i.show !== this.lists[ind].show) {
						i.show = false;
					}
				});
				// 取反(true或false)
				if (this.lists[ind].show) {
					if (this.lists[ind].lists) {
						this.$delete(this.lists[ind], 'show');
					} else {}
				} else {
					this.$delete(this.lists[ind], 'show');
					this.$set(this.lists[ind], 'show', !this.lists[ind].show);
				}
			},
			// idx  一级下标  index二级下标
			doThis(ind, index) {
				this.currentIndex = ind;
				this.showM = !this.showM;
				this.subIndex = index;
				sessionStorage.setItem('subIndex', index);
				let lists = this.lists[this.currentIndex].lists[index];
				switch (lists.page_type) {
					case 'index':
						this.$router.push({
							path: '/index'
						});
						break;
						// 文章列表
					case 'lists':
						switch (lists.html_template) {
							// 对应模板跳转，详情id为lists.jump_value
							case 'case':
								// statements_1
								this.$router.push({
									path: '/case',
									query: {
										page: 1,
										limit: 12,
										html_template: lists.html_template,
										jump_value: lists.jump_value
									}
								});
								break;

							case 'adviser':
								// statements_1
								this.$router.push({
									path: '/adviser',
									query: {
										page: 1,
										limit: 12,
										html_template: lists.html_template,
										jump_value: lists.jump_value
									}
								});
								break;

							case 'detail':
								// statements_1
								break;
						}
						break;
						// 自定义页
					case 'custom':
						switch (lists.html_template) {
							// 详情页id为lists.jump_value
							// 购买公司
							case 'company_purchase_info':
								// statements_1
								this.$router.push({
									path: '/purchase?page=1&limit=12'
								});
								break;
								// 出售公司
							case 'company_sell_info':
								// statements_1
								this.$router.push({
									path: '/sale'
								});
								break;
						}
						break;
						// 站内文章
					case 'article':
						switch (lists.html_template) {
							// 对应模板跳转，详情id为lists.jump_value
							case 'case':
								// statements_1
								break;

							case 'adviser':
								// statements_1
								break;

							case 'detail':
								// statements_1
								this.$router.push({
									path: '/detail',
									query: {
										html_template: lists.html_template,
										article_id: lists.jump_value
									}
								});
								break;
						}
						break;
						// 外部链接
					case 'external':
						window.location.href = lists.jump_value;
						break;
				}
			},
			login() {
				this.showM = false;
				this.currentIndex = -1;
				this.subIndex = -1;
				this.$router.push({
					path: '/login'
				});
			},
			// pc+mobile
			// 语言切换
			changeLang() {
				this.$store.commit('changeLanguage');
			},
			// 待
			meInfo(path) {
				this.showM = false;
				this.currentIndex = -1;
				this.subIndex = -1;
				this.$router.push({
					path: '/me/info'
				});
			},
			// 获取导航栏
			getNav() {
				this.$get(urls.common, {}).then(res => {
					this.loadEnd();
					this.currentIndex = sessionStorage.getItem('index') || -1;
					this.subIndex = sessionStorage.getItem('subIndex') || -1;
					this.lists = res.data.top_nav.lists;
					this.lists.forEach(i => {
						i.show = false;
					});
					this.$store.state.icp = res.data.icp.text;
					this.$store.state.ico_path = res.data.ico_path;
					this.$store.state.logo_path = res.data.top_nav.logo_path;
				});
			},
			// 登出
			logout() {
				this.showM = !this.showM;
				this.$router.push('/login');
				this.currentIndex = -1;
				this.subIndex = -1;
				localStorage.removeItem('index');
				localStorage.removeItem('subIndex');
				this.$store.commit('logout');
			},
			// 导航切换
			handleSelect(index, subIndex = -1) {
				this.currentIndex = index
				this.subIndex = subIndex
				console.log(this.currentIndex)
				console.log(this.subIndex)
				sessionStorage.setItem('index', index);
				sessionStorage.setItem('subIndex', subIndex);
				let lists = this.lists[index];
				if (subIndex == -1) {
					// 这里只有一级
					lists = this.lists[index];
				} else {
					// 这里是二级
					lists = this.lists[index].lists[subIndex];
				}
				switch (lists.page_type) {
					case 'index':
						this.$router.push({
							path: '/index'
						});
						break;
						// 文章列表
					case 'lists':
						switch (lists.html_template) {
							// 对应模板跳转，详情id为lists.jump_value
							case 'case':
								// statements_1
								this.$router.push({
									path: '/case',
									query: {
										page: 1,
										limit: 12,
										// listName: lists.nav_name,
										html_template: lists.html_template,
										jump_value: lists.jump_value
									}
								});
								break;

							case 'adviser':
								// statements_1
								this.$router.push({
									path: '/adviser',
									query: {
										page: 1,
										limit: 12,
										html_template: lists.html_template,
										jump_value: lists.jump_value
									}
								});
								break;

							case 'detail':
								// statements_1
								break;
						}

						break;

						// 自定义页
					case 'custom':
						switch (lists.html_template) {
							// 详情页id为lists.jump_value
							// 购买公司
							case 'company_purchase_info':
								// statements_1
								this.$router.push({
									path: '/purchase?page=1&limit=12'
								});
								break;
								// 出售公司
							case 'company_sell_info':
								// statements_1
								this.$router.push({
									path: '/sale'
								});
								break;
						}
						break;

						// 站内文章
					case 'article':
						switch (lists.html_template) {
							// 对应模板跳转，详情id为lists.jump_value
							case 'case':
								// statements_1
								break;

							case 'adviser':
								// statements_1
								break;

							case 'detail':
								// statements_1
								this.$router.push({
									path: '/detail',
									query: {
										html_template: lists.html_template,
										article_id: lists.jump_value
									}
								});
								break;
						}
						break;

						// 外部链接
					case 'external':
						window.location.href = lists.jump_value;
						break;
				}
			}
		},
		computed: {
			userName() {
				return this.$store.state.userName;
			},
			cn() {
				return this.$store.state.language == 'cn';
			},
			logo_path() {
				return this.$store.state.logo_path;
			}
		}
	};
</script>

<style lang="less" scoped>
	.home-en {
		.nav-item {
			margin: 0 0.9rem !important;
			padding: 0 0.5rem !important;
		}
	}

	.header {

		// 一级菜单
		.nav-menu {
			display: flex;
			flex-wrap: wrap;
		}

		// 一级item
		.nav-item {
			cursor: pointer;
			line-height: 7.5rem;
			margin: 0 1.5rem;
			color: #fff;
			font-size: 1rem;
			padding: 0 0.6rem;
			flex-shrink: 0;
			position: relative;

			&:hover {
				color: #289dfd;

				.subnav {
					transform: scaleY(1) translateX(-50%);
					-webkit-transform: scaleY(1) translateX(-50%);
					-o-transform: scaleY(1) translateX(-50%);
					-moz-transform: scaleY(1) translateX(-50%);
					
				}
			}

			&.active {
				color: #289dfd;
				&:after {
					content: "";
					display: block;
					width: 100%;
					height: 0.125rem;
					background-color: #409eff;
					position: absolute;
					left: 0;
					bottom: 0;
				}
			}
		}

		// 二级菜单
		.subnav {
			position: absolute;
			top: 7.5rem;
			left: 50%;
			transition: all 0.2s;
			transform: scaleY(0) translateX(-50%);
			transform-origin:50% 0;
			-webkit-transition: all 0.2s;
			-webkit-transform: scaleY(0) translateX(-50%);
			-webkit-transform-origin:50% 0;
			-moz-transition: all 0.2s;
			-moz-transform: scaleY(0) translateX(-50%);
			-moz-transform-origin:50% 0;
			-o-transition: all 0.2s;
			-o-transform: scaleY(0) translateX(-50%);
			-o-transform-origin:50% 0;
			z-index: 99;
			padding: 0.625rem 2.1875rem;
			box-shadow: 0 0.125rem 0.75rem 0 rgba(0, 0, 0, 0.1);
			background-color: #fff;
			flex-direction: column;
			white-space: nowrap;
			-webkit-border-radius: 0 0 3px 3px;
			-moz-border-radius: 0 0 3px 3px;
			-ms-border-radius: 0 0 3px 3px;
			-o-border-radius: 0 0 3px 3px;
			border-radius: 0 0 3px 3px;

		}

		// 二级item
		.subnav-item {
			cursor: pointer;
			background: #fff;
			font-size: 0.875rem;
			height: 3.125rem;
			line-height: 3.125rem;
			color: #444;
			text-align: center;
			border-bottom: 1px solid #cacaca;

			&:last-child {
				border-bottom: 0;
			}

			&:hover {
				color: #289dfd;
			}

			&.active {
				color: #289dfd;
			}
		}
	}
</style>
