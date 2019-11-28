import Vue from "vue";
import Vuex from "vuex";
// import urls from '../api/index.js';
Vue.use(Vuex);
// url参数查询
function getQuery(param) {
	var query = window.location.search.substring(1)
	var pairs = query.split('&')
	for (let i = 0; i < pairs.length; i++) {
		let pair = pairs[i].split('=')
		if (param == pair[0]) {
			return pair[1]
		}
	}
	return false
}
// url语言参数校验
var lang = getQuery('lang')
var langArr = ['cn','en']
langArr.includes(lang)?localStorage.setItem('language',lang) : ''
var language = localStorage.getItem('language') || 'cn'
document.getElementsByTagName('html')[0].lang = ((language== 'en')?'en':'zh-cmn-Hans')
export default new Vuex.Store({
	state: {
		language: language,
		userName: '',
		userInfo: {},
		// 下单信息
		payInfo: ['', '', '', '', ''],
		icp: 'copyright',
		ico_path: '',
		logo_path: ''
	},
	mutations: {
		// 语言切换
		changeLanguage(state) {
			state.language = (state.language == 'cn' ? 'en' : 'cn')
			let query = JSON.parse(JSON.stringify(vm.$route.query))
			query.lang = state.language
			vm.$router.push({
				query: query
			});
			localStorage.setItem('language', state.language)
			window.location.reload();
		},
		// 获取用户信息
		getUserInfo(state) {
			if (localStorage.getItem('company')) {
				vm.$get(urls.info, {}).then(res => {
					vm.loadEnd();
					state.userName = res.data.member_name;
					state.userInfo = res.data;
				});
			} else {
				return false
			}
		},
		// 每次成功之后清空下单信息
		clearPayInfo(state) {
			state.payInfo = ['', '', '', '', '']
		},
		// 登出
		logout(state) {
			localStorage.removeItem('company');
			sessionStorage.removeItem('index')
			sessionStorage.removeItem('subIndex')
			state.userInfo = null;
			state.userName = '';
		}
	},
	actions: {
		getUserInfoHandle(context) {
			context.commit('getUserInfo')
		},

	}
});
