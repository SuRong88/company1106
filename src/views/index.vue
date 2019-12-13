<template>
	<div class="index">
		<v-search></v-search>
		<div class="nice wrapper">
			<div class="title">{{ cn ? recommendList[0].recommend_name : recommendList[0].recommend_name_en }}</div>
			<ul>
				<li v-for="item in recommendList[0].lists" @click="jumpCase(item.recommend_relation_id)">
					<div class="img-box">
						<img class="img" :src="item.recommend_relation_img_path" alt="" />
						<div class="price">{{ cn ? '出售价格' : 'Selling Price' }}：{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</div>
					</div>
					<div class="name">{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</div>
				</li>
			</ul>
		</div>
		<div class="new" v-if="recommendList[1]">
			<div class="">
				<div class="title">{{ cn ? recommendList[1].recommend_name : recommendList[1].recommend_name_en }}</div>
				<swiper :options="swiperOption1" ref="mySwiper1" class="swiper-container swiper-01">
					<swiper-slide v-for="item in recommendList[1].lists">
						<router-link class="item" :to="'/company_purchase_info?company_id=' + item.recommend_relation_id">
							<div class="info">
								<ul>
									<li>
										<img class="address-icon" src="../assets/img/pc/icon01.png" alt="" />
										{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en }}
									</li>
									<li>{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</li>
									<li class="about hide-m">
										{{ cn ? '出售价格' : 'Selling Price' }}:
										<i>{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</i>
									</li>
								</ul>
							</div>
							<div class="pic-box">
								<img class="pic" :src="item.recommend_relation_img_path" alt="" />
								<div class="price hide-p">{{ cn ? '出售价格' : 'Selling Price' }}:{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</div>
							</div>
						</router-link>
					</swiper-slide>
					<div id="swiper-button-prev1" class="swiper-button-prev hide-m" slot="button-prev"></div>
					<div id="swiper-button-next1" class="swiper-button-next hide-m" slot="button-next"></div>
				</swiper>
				<div id="swiperP01" class="swiper-pagination hide-p"></div>
			</div>
		</div>
		<div class="physical" v-if="recommendList[2]">
			<div class="wrapper">
				<div class="title">{{ cn ? recommendList[2].recommend_name : recommendList[2].recommend_name_en }}</div>
				<div class="content">
					<swiper :options="swiperOption2" ref="mySwiper2" class="swiper-container swiper-02">
						<swiper-slide v-for="(item, index) in recommendList[2].lists">
							<router-link class="item" :to="'/company_purchase_info?company_id=' + item.recommend_relation_id">
								<template v-if="index % 2 == 1">
									<img class="pic" :src="item.recommend_relation_img_path" alt="" />
									<div class="info">
										<ul>
											<li>
												<img class="address-icon" src="../assets/img/pc/icon02.png" alt="" />
												<span class="name">{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en }}</span>
											</li>
											<li>{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</li>
											<li class="about">
												{{ cn ? '出售价格' : 'Selling Price' }}:
												<span>{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</span>
											</li>
										</ul>
									</div>
								</template>
								<template v-else>
									<div class="info">
										<ul>
											<li>
												<img class="address-icon" src="../assets/img/pc/icon02.png" alt="" />
												<span class="name">{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en }}</span>
											</li>
											<li>{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</li>
											<li class="about">
												{{ cn ? '出售价格' : 'Selling Price' }}:
												<span>{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</span>
											</li>
										</ul>
									</div>
									<img class="pic" :src="item.recommend_relation_img_path" alt="" />
								</template>
							</router-link>
						</swiper-slide>
					</swiper>
				</div>
				<div id="swiperP02" class="swiper-pagination"></div>
				<div class="recommend" :class="{ en: !cn }" @click="showMore(recommendList[2].business_type_lists, recommendList[2].industry_type_lists)">
					{{ cn ? '查看更多推荐>' : 'View More Company Recommendations' }}
				</div>
			</div>
		</div>
		<div class="empty" v-if="recommendList[3]">
			<div class="wrapper">
				<div class="title">{{ cn ? recommendList[3].recommend_name : recommendList[3].recommend_name_en }}</div>
				<div class="empty-box">
					<div class="left" @click="jumpTarget(recommendList[3].lists[activeIndex].recommend_relation_id)">
						<img :src="recommendList[3].lists[activeIndex].recommend_relation_img_path" alt="" />
						<div class="price">
							<p>
								{{ cn ? '出售价格' : 'Selling Price' }}:
								<span>
									{{ cn ? recommendList[3].lists[activeIndex].recommend_relation_price : recommendList[3].lists[activeIndex].recommend_relation_price_en }}
								</span>
							</p>
						</div>
					</div>
					<div class="right">
						<div class="arrow-prev" @click="activeReduce"><img class="aicon" src="../assets/img/pc/arrow-prev.png" alt="" /></div>
						<ul class="scroll-bar" v-if="recommendList[3].lists.length > 0">
							<li v-for="(item, index) in recommendList[3].lists" class="scroll-item" :class="{ active: activeIndex == index }"
							 :index="index" @click="activeIndex = index">
								<div class="item-c">
									<p class="p-first">
										<img v-if="activeIndex == index" class="address-icon" src="../assets/img/pc/icon02.png" alt="" />
										<img v-else class="address-icon" src="../assets/img/pc/address-icon.png" alt="" />
										<span class="address1">
											{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en
											}}{{ cn ? item.recommend_relation_region_name : item.recommend_relation_region_name_en }}
										</span>
									</p>
									<p class="address2">{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</p>
								</div>
							</li>
						</ul>
						<div class="arrow-next" @click="activeAdd"><img class="aicon" src="../assets/img/pc/arrow-next.png" alt="" /></div>
					</div>
				</div>
				<div class="recommend" :class="{ en: !cn }" @click="showMore(recommendList[3].business_type_lists, recommendList[3].industry_type_lists)">
					{{ cn ? '查看更多推荐>' : 'View More Company Recommendations' }}
				</div>
			</div>
		</div>
		<div class="finance" v-if="recommendList[4]">
			<div class="wrapper">
				<div class="title">{{ cn ? recommendList[4].recommend_name : recommendList[4].recommend_name_en }}</div>
				<div class="swiper-box">
					<swiper :options="swiperOption3" ref="mySwiper2019" class="swiper-container swiper-04">
						<swiper-slide v-for="item in recommendList[4].lists">
							<router-link class="finance-slide" :to="'/company_purchase_info?company_id=' + item.recommend_relation_id">
								<div class="img">
									<img :src="item.recommend_relation_img_path" alt="" />
									<div class="place-mask">
										<div class="content hide-m">
											<img class="address-icon" src="../assets/img/pc/icon01.png" alt="" />
											<span>{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en }}</span>
										</div>
									</div>
								</div>
								<div class="detail">
									<div class="company">{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</div>
									<div class="about">
										{{ cn ? '出售价格' : 'Selling Price' }}:
										<span>{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</span>
									</div>
									<div class="add-m hide-p">
										<img class="address-icon" src="../assets/img/pc/icon02.png" alt="" />
										<span>{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en }}</span>
									</div>
								</div>
							</router-link>
						</swiper-slide>
					</swiper>
					<div id="swiperP03" class="swiper-pagination hide-p"></div>
					<div @click="goPrev" id="" class="button-prev hide-m" slot="button-prev"></div>
					<div @click="goNext" id="" class="button-next hide-m" slot="button-next"></div>
				</div>
				<div class="recommend" :class="{ en: !cn }" @click="showMore(recommendList[4].business_type_lists, recommendList[4].industry_type_lists)">
					{{ cn ? '查看更多推荐>' : 'View More Company Recommendations' }}
				</div>
			</div>
		</div>
		<div class="medical" v-if="recommendList[5]">
			<div class="wrapper">
				<div class="title">{{ cn ? recommendList[5].recommend_name : recommendList[5].recommend_name_en }}</div>
				<swiper :options="swiperOption4" ref="mySwiper4" class="swiper-container swiper-05">
					<swiper-slide v-for="item in recommendList[5].lists">
						<router-link class="img" :to="'/company_purchase_info?company_id=' + item.recommend_relation_id">
							<img class="company-img" :src="item.recommend_relation_img_path" alt="" />
							<div class="place-mask">
								<div class="content">
									<img class="address-icon" src="../assets/img/pc/icon01.png" alt="" />
									<span>{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en }}</span>
									<div class="detail">
										<div class="company">{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</div>
										<div class="about hide-m">
											{{ cn ? '出售价格' : 'Selling Price' }}:
											<span style="color: #fff!important;">
												<i>{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</i>
											</span>
										</div>
									</div>
									<div class="about hide-p">
										{{ cn ? '出售价格' : 'Selling Price' }}:
										<span style="color: #fff!important;">
											<i>{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</i>
										</span>
									</div>
								</div>
							</div>
						</router-link>
					</swiper-slide>
				</swiper>
				<div id="swiperP05" class="swiper-pagination"></div>
				<div class="recommend" :class="{ en: !cn }" @click="showMore(recommendList[5].business_type_lists, recommendList[5].industry_type_lists)">
					{{ cn ? '查看更多推荐>' : 'View More Company Recommendations' }}
				</div>
			</div>
		</div>
		<div class="new" v-if="recommendList[6]">
			<div class="">
				<div class="title">{{ cn ? recommendList[6].recommend_name : recommendList[6].recommend_name_en }}</div>
				<swiper :options="swiperOption11" ref="mySwiper11" class="swiper-container swiper-01 swiper-11">
					<swiper-slide v-for="item in recommendList[6].lists">
						<router-link class="item" :to="'/company_purchase_info?company_id=' + item.recommend_relation_id">
							<div class="item">
								<div class="info">
									<ul>
										<li>
											<img class="address-icon" src="../assets/img/pc/icon01.png" alt="" />
											{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en }}
										</li>
										<li>{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</li>
										<li class="about hide-m">
											{{ cn ? '出售价格' : 'Selling Price' }}:
											<i>{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</i>
										</li>
									</ul>
								</div>
								<div class="pic-box">
									<img class="pic" :src="item.recommend_relation_img_path" alt="" />
									<div class="price hide-p">
										{{ cn ? '出售价格' : 'Selling Price' }}:{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}
									</div>
								</div>
							</div>
						</router-link>
					</swiper-slide>
					<div id="swiper-button-prev11" class="swiper-button-prev hide-m" slot="button-prev"></div>
					<div id="swiper-button-next11" class="swiper-button-next hide-m" slot="button-next"></div>
				</swiper>
				<div id="swiperP011" class="swiper-pagination hide-p"></div>
				<div class="recommend" :class="{ en: !cn }" @click="showMore(recommendList[6].business_type_lists, recommendList[6].industry_type_lists)">
					{{ cn ? '查看更多推荐>' : 'View More Company Recommendations' }}
				</div>
			</div>
		</div>
		<div class="physical" v-if="recommendList[7]">
			<div class="wrapper">
				<div class="title">{{ cn ? recommendList[7].recommend_name : recommendList[7].recommend_name_en }}</div>
				<div class="content">
					<swiper :options="swiperOption22" ref="mySwiper22" class="swiper-container swiper-02 swiper-22">
						<swiper-slide v-for="(item, index) in recommendList[7].lists">
							<router-link :to="'/company_purchase_info?company_id=' + item.recommend_relation_id">
								<template v-if="index % 2 == 1">
									<img class="pic" :src="item.recommend_relation_img_path" alt="" />
									<div class="info">
										<ul>
											<li>
												<img class="address-icon" src="../assets/img/pc/icon02.png" alt="" />
												<span class="name">{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en }}</span>
											</li>
											<li>{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</li>
											<li class="about">
												{{ cn ? '出售价格' : 'Selling Price' }}:
												<span>
													<i>{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</i>
												</span>
											</li>
										</ul>
									</div>
								</template>
								<template v-else>
									<div class="info">
										<ul>
											<li>
												<img class="address-icon" src="../assets/img/pc/icon02.png" alt="" />
												<span class="name">{{ cn ? item.recommend_relation_country_name : item.recommend_relation_country_name_en }}</span>
											</li>
											<li>{{ cn ? item.recommend_relation_name : item.recommend_relation_name_en }}</li>
											<li class="about">
												{{ cn ? '出售价格' : 'Selling Price' }}:
												<span>
													<i>{{ cn ? item.recommend_relation_price : item.recommend_relation_price_en }}</i>
												</span>
											</li>
										</ul>
									</div>
									<img class="pic" :src="item.recommend_relation_img_path" alt="" />
								</template>
							</router-link>
						</swiper-slide>
					</swiper>
				</div>
				<div id="swiperP022" class="swiper-pagination"></div>
				<div class="recommend" :class="{ en: !cn }" @click="showMore(recommendList[7].business_type_lists, recommendList[7].industry_type_lists)">
					{{ cn ? '查看更多推荐>' : 'View More Company Recommendations' }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import vSearch from 'components/common/search.vue';
	import Bus from '@/bus/event.js'
	// import urls from '../api/index.js';
	let slidesPerView01 = 3;
	let slidesPerColumn01 = 1;
	let slidesPerView02 = 2;
	let slidesPerColumn02 = 1;
	let spaceBetween01 = '5%';
	let spaceBetween02 = '5%';
	let noSwiping = true;
	if (window.screen.width <= 750) {
		slidesPerView01 = 1;
		slidesPerColumn01 = 3;
		slidesPerView02 = 1;
		slidesPerColumn02 = 2;
		spaceBetween01 = 20;
		spaceBetween02 = 25;
		noSwiping = false;
	} else {}
	console.log(slidesPerColumn01);
	export default {
		name: 'index',
		components: {
			vSearch
		},
		data() {
			// 速度控制
			// autoplay: {
			//     delay: 3000,
			//     stopOnLastSlide: false,
			//     disableOnInteraction: true,
			//     },
			return {
				swiperOption1: {
					loop: true,
					speed: 900,
					notNextTick: true,
					autoplay: true,
					preloadImages: false,
					spaceBetween: 4,
					pagination: {
						el: '#swiperP01',
						clickable: true
					},
					navigation: {
						nextEl: '#swiper-button-next1',
						prevEl: '#swiper-button-prev1'
					},
					noSwiping: noSwiping,
					noSwipingSelector: '.swiper-01'
				},
				swiperOption11: {
					loop: true,
					speed: 900,
					notNextTick: true,
					autoplay: true,
					preloadImages: false,
					spaceBetween: 4,
					pagination: {
						el: '#swiperP011',
						clickable: true
					},
					navigation: {
						nextEl: '#swiper-button-next11',
						prevEl: '#swiper-button-prev11'
					},
					noSwiping: noSwiping,
					noSwipingSelector: '.swiper-11'
				},
				swiperOption2: {
					loop: true,
					speed: 900,
					notNextTick: true,
					autoplay: true,
					preloadImages: false,
					spaceBetween: 4,
					slidesPerView: 2,
					slidesPerGroup: 2,
					loopFillGroupWithBlank: true,
					pagination: {
						el: '#swiperP02',
						clickable: true
					},
					noSwiping: noSwiping,
					noSwipingSelector: '.swiper-02'
				},
				swiperOption22: {
					loop: true,
					speed: 900,
					notNextTick: true,
					autoplay: true,
					preloadImages: false,
					slidesPerView: 2,
					slidesPerGroup: 2,
					spaceBetween: 4,
					loopFillGroupWithBlank: true,
					pagination: {
						el: '#swiperP022',
						clickable: true
					},
					noSwiping: noSwiping,
					noSwipingSelector: '.swiper-22'
				},
				swiperOption3: {
					// loop: true,
					speed: 900,
					notNextTick: true,
					autoplay: true,
					preloadImages: false,
					slidesPerGroup: 3,
					slidesPerView: slidesPerView01,
					slidesPerColumn: slidesPerColumn01,
					slidesPerColumnFill: 'column',
					loopFillGroupWithBlank: true,
					spaceBetween: spaceBetween01,
					pagination: {
						el: '#swiperP03',
						clickable: true
					},
					navigation: {
						nextEl: '#swiper-button-next3',
						prevEl: '#swiper-button-prev3'
					},
					noSwiping: noSwiping,
					noSwipingSelector: '.swiper-04'
				},
				swiperOption4: {
					// loop: true,
					speed: 900,
					notNextTick: true,
					autoplay: true,
					preloadImages: false,
					slidesPerView: slidesPerView02, //一行显示个
					slidesPerColumn: slidesPerColumn02, //显示行
					slidesPerColumnFill: 'column',
					slidesPerGroup: 2,
					loopFillGroupWithBlank: true,
					spaceBetween: spaceBetween02,
					pagination: {
						el: '#swiperP05',
						clickable: true
					},
					noSwiping: noSwiping,
					noSwipingSelector: '.swiper-05'
				},
				activeIndex: 0,
				recommendList: [{
					recommend_name: '推荐名',
					lists: []
				}]
			};
		},
		watch: {},
		computed: {
			cn() {
				this.getRecommendList();
				return this.$store.state.language == 'cn';
			},
			swiper() {
				return this.$refs.mySwiper2019.swiper;
			}
		},
		methods: {
			goPrev() {
				console.log('prev');
				this.swiper.slidePrev();
			},
			goNext() {
				console.log('next');
				this.swiper.slideNext();
			},
			// 查看更多推荐
			showMore(p1, p2) {
				console.log('p1');
				console.log(p1, p2);
				if (!p1) {
					p1 = '[]';
				}
				if (!p2) {
					p2 = '[]';
				}
				this.$router.push({
					path: '/purchase',
					query: {
						page: 1,
						limit: 12,
						business_type_lists: p1,
						industry_type_lists: p2
					}
				});
			},
			// 案例详情
			jumpCase(articleId) {
				console.log(articleId);
				Bus.$emit('getNavIndex', -1, -1);
				this.$router.push({
					path: '/detail',
					query: {
						html_template: 'case',
						article_id: articleId
					}
				});
			},
			// 公司详情
			jumpTarget(companyId) {
				console.log(companyId);
				this.$router.push({
					path: '/company_purchase_info',
					query: {
						company_id: companyId
					}
				});
			},
			activeHandle(index) {
				this.activeIndex = index;
			},
			activeAdd() {
				if (this.activeIndex == this.recommendList[3].lists.length - 1) {
					return this.recommendList[3].lists.length - 1;
				}
				this.activeIndex++;
			},
			activeReduce() {
				if (this.activeIndex == 0) {
					return 0;
				}
				this.activeIndex--;
			},
			getRecommendList() {
				this.$get(urls.recommendList).then(res => {
					this.recommendList = res.data;
					console.log(res.data);
				});
			}
		},
		created() {
			this.getRecommendList();
			Bus.$emit('getNavIndex', 0, -1)
		},
		mounted() {}
	};
</script>

<style></style>
