import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import request from "./utils/request";
// import '@/assets/js/resetRem';
import formcheck from '@/assets/js/formcheck';
import layout from '@/assets/js/layout';
import errorCode from '@/assets/js/errorCode';
import formatDate from '@/assets/js/formatDate';
import ElementUI from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css';
import 'css/layout.less';
import 'css/common.less';
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
Vue.use(formcheck);
Vue.use(layout);
Vue.use(errorCode);
Vue.config.productionTip = false;
// 全局日期格式化过滤器
Vue.filter('formatDate', formatDate);
// 未登录 所有允许进入的页面
var allowPages = ['/index', '/login', '/register', '/register-success', '/bind', '/forget', '/reset', '/detail', '/404',
	'/sale', '/case', '/adviser', '/purchase', '/company_purchase_info','/result','/openInBrowser', '/pay-success', '/pay-fail', '/tip', '/buy'
,'bind-fail','bind-success'];
router.beforeEach((to, from, next) => {
	var login = localStorage.getItem('company');
	if (!login && allowPages.indexOf(to.path) < 0) {
		next('/login');
		return false;
	}
	// 百度统计,所有页面
	if (_hmt) {
	    if (to.path) {
	      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
	    }
	}
	next();
});
// 移动端加载更多的时候 屏幕不回滚顶部的页面
var noScrollTopPages1 = ['/purchase', '/result', '/case', '/me/collect', '/me/sale-list', '/me/order-manage', '/adviser']
// pc屏幕不回滚顶部的页面(感滚动到指定位置)
var noScrollTopPages2 = ['/result','/purchase','/adviser','/case']
router.afterEach((to, from) => {
	// 页面不一样 直接滚回顶部
	if(to.path != from.path){
		return window.scrollTo(0, 0);
	}
	// 移动端加载更多不滚回顶部
	if (noScrollTopPages1.indexOf(to.path) >= 0 && window.screen.width <= 750) {
		return false;
	} else {//PC端结果页、购买页、案例列表页、服务列表页不滚回，内面内处理
		(noScrollTopPages2.indexOf(to.path) >= 0 && window.screen.width > 750)?'':window.scrollTo(0, 0);
	}
});
window.vm = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
vm.getToken = function() {
	var token = localStorage.getItem('company') || '';
	return token;
};
console.log=function(){};
