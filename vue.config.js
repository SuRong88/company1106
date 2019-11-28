module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'api': '@/api',
				'libs': '@/libs',
				'views': '@/views',
				'img': '@/assets/img',
				'css': '@/assets/css',
				'js': '@/assets/js',
			}
		}
	},
	lintOnSave: false,
	publicPath: '/',
	productionSourceMap: false, // 生产环境是否生成 SourceMap
	devServer: {
		host: '0.0.0.0',
		port: '8080',
		proxy: {
			'/api': { 
				target: 'http://www.gcsgou.com/api/api', // 接口域名
				changeOrigin: true, //是否跨域
				pathRewrite: {
					'^/api': '' //需要rewrite的,
				}
			}
		},
	},
	css: {
		loaderOptions: {
			postcss: {
				plugins: [
					require('postcss-pxtorem')({
						rootValue: 16, // 换算基数
						selectorBlackList: [], // 忽略转换正则匹配项
						propList: ['*'],
					}),
				]
			}
		}
	}
}
