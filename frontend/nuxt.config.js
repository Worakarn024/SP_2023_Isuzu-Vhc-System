/* eslint-disable nuxt/no-cjs-in-config */
const colors = require('vuetify/es5/util/colors').default;
const { apiUrl, MobileConnect } = require('./nuxt.api.config');
require('dotenv').config();

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head

	head: {
		// titleTemplate: '%s - VHC-App',
		titleTemplate: '%s ',
		title: 'VHC-App',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
			},
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap',
			},
		],
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#ff9800' },

	loadingIndicator: {
		name: 'circle',
		color: '#046d25',
		background: '#ffffff',
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['~/plugins/axios', '~/plugins/moment.js','~/plugins/vue-signature-pad.js'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/vuetify
		'@nuxtjs/vuetify',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/dotenv',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		proxy: true, // Can be also an object with default options
	},
	/*
	 ** integrate Axios with Proxy Module. This is highly recommended to prevent CORS and production/deployment problems.
	 */
	proxy: {
		// '/opt/': {
		//   target: 'https://verifyapi.sc4msg.com/v1/verify',
		//   pathRewrite: { '^/opt/': '' },
		//   changeOrigin: true
		// }
	},
	/*
	 ** Define the source directory of your Nuxt.js application
	 */
	srcDir: '',
	/*
	 ** Configure the generation of your universal web application to a static web application.
	 */
	generate: {
		fallback: false,
	},

	// Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: false,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** Add axios globally
		 */
		vendor: ['axios'],
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {
			// Run ESLint on save
			// if (ctx.isDev && ctx.isClient) {
			// 	config.module.rules.push({
			// 		enforce: 'pre',
			// 		test: /\.(js|vue)$/,
			// 		loader: 'eslint-loader',
			// 		exclude: /(node_modules)/,
			// 	});
			// }
		},
	},
	/*
	 ** The router property lets you customize Nuxt.js router
	 ** The base URL of the app. For example, if the entire single page application is served under /app/, then base should use the value '/app/'
	 ** Default: '/'
	 */
	router: {
		base: process.env.ROUTER_BASE_URL,
	},
	/*
	 ** lets you create environment variables client side, also to be shared from server side.
	 */
	env: {
		apiUrl,
		baseUrl: process.env.BASE_URL + process.env.ROUTER_BASE_URL,
		xapiKey: process.env.XAPI_KEY,
		VhcUrl:  process.env.APIURL_VHC,
		InVhcUrl: process.env.Internal,
		VhcTimeOut: process.env.TimeOut_Limit,
	},
	ssr: false,
};
