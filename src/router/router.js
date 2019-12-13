import Vue from "vue";
import Router from "vue-router";
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);
export default new Router({
	mode: 'history',
	linkActiveClass: 'active',
	routes: [{
			path: '/',
			redirect: '/index'
		},
		{
			path: "/",
			name: "home",
			component: resolve => require(['views/home.vue'], resolve),
			children: [{
				name: 'index',
				path: 'index',
				component: resolve => require(['views/index.vue'], resolve)
			}, {
				name: 'example',
				// path: 'example',
				path:'case',
				component: resolve => require(['views/example.vue'], resolve)
			}, {
				name: 'result',
				path: 'result',
				component: resolve => require(['views/result.vue'], resolve)
			}, {
				name: 'purchase',
				// path: 'purchase',
				path:'purchase',
				component: resolve => require(['views/purchase.vue'], resolve)
			},{
				name: 'information',
				// path: 'information',
				path:'company_purchase_info',
				component: resolve => require(['views/information.vue'], resolve)
			}, {
				name: 'sale',
				path: 'sale',
				// path: 'company_sell_info',
				component: resolve => require(['views/sale.vue'], resolve)
			}, {
				name: 'service',
				// path: 'service',
				path:'adviser',
				component: resolve => require(['views/service.vue'], resolve)
			}, {
				name: 'detail',
				path: 'detail',
				// path: 'service',
				component: resolve => require(['views/detail.vue'], resolve)
			}, {
				name: 'login',
				path: 'login',
				component: resolve => require(['views/login.vue'], resolve)
			}, {
				name: 'register',
				path: 'register',
				component: resolve => require(['views/register.vue'], resolve)
			},
			{
				name: 'registerSuccess',
				path: 'register-success',
				component: resolve => require(['views/register-success.vue'], resolve)
			}, {
				name: 'bind',
				path: 'bind',
				component: resolve => require(['views/bind.vue'], resolve)
			}, {
				name: 'forget',
				path: 'forget',
				component: resolve => require(['views/forget.vue'], resolve)
			}, {
				name: 'reset',
				path: 'reset',
				component: resolve => require(['views/reset.vue'], resolve)
			}, {
				name: 'buy',
				path: 'buy',
				component: resolve => require(['views/buy.vue'], resolve)
			},
			{
				name: 'bind-success',
				path: 'bind-success',
				component: resolve => require(['views/bind-success.vue'], resolve)
			},
			{
				name: 'bind-fail',
				path: 'bind-fail',
				component: resolve => require(['views/bind-fail.vue'], resolve)
			},
			{
				name: 'pay-success',
				path: 'pay-success',
				component: resolve => require(['views/pay-success.vue'], resolve)
			},
			{
				name: 'pay-fail',
				path: 'pay-fail',
				component: resolve => require(['views/pay-fail.vue'], resolve)
			},
			{
				name: 'offline',
				path: 'offline',
				component: resolve => require(['views/offline.vue'], resolve)
			},
			{
				name: 'edit',
				path: 'edit',
				component: resolve => require(['views/edit.vue'], resolve)
			},{
				name: 'me',
				path: 'me',
				component: resolve => require(['views/me.vue'], resolve),
				children:[
					{
						name:'info',
						path:'info',
						component:resolve => require(['views/me/info.vue'], resolve),
					},
					{
						name:'safety',
						path:'safety',
						component:resolve => require(['views/me/safety.vue'], resolve),
					},
					
					{
						name:'salePublish',
						path:'sale-publish',
						component:resolve => require(['views/me/sale-publish.vue'], resolve),
					},
					{
						name:'saleEdit',
						path:'sale-edit',
						component:resolve => require(['views/me/sale-edit.vue'], resolve),
					},
					
					{
						name:'saleList',
						path:'sale-list',
						component:resolve => require(['views/me/sale-list.vue'], resolve),
					},
					{
						name:'saleInfo',
						path:'sale-info',
						component:resolve => require(['views/me/sale-info.vue'], resolve),
					},
					{
						name:'orderManage',
						path:'order-manage',
						component:resolve => require(['views/me/order-manage.vue'], resolve),
					},
					{
						name:'orderInfo',
						path:'order-info',
						component:resolve => require(['views/me/order-info.vue'], resolve),
					},
					{
						name:'collect',
						path:'collect',
						component:resolve => require(['views/me/collect.vue'], resolve),
					},
					{
						name:'vipInfo',
						path:'vip-info',
						component:resolve => require(['views/me/vip-info.vue'], resolve),
					}
				]
			},
			{
				name:'publishSuccess',
				path:'publish-success',
				component:resolve => require(['views/publish-success.vue'], resolve),
			}]
			
		},
		{
			name:'tip',
			path:'/tip',
			component: resolve => require(['views/tip.vue'], resolve)
		},
		{	
			name:'openInBrowser',
			path:'/open-in-browser',
			component: resolve => require(['views/open-in-browser.vue'], resolve)
		},
		{
			name:'404',
			path:'/404',
			component: resolve => require(['views/404.vue'], resolve)
		},
		{
			path:'*',
			redirect:'/404'
		}
	]
});
