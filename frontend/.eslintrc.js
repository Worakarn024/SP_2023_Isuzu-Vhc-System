module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: '@babel/eslint-parser',
		requireConfigFile: false,
	},
	globals: {
		liff: true,
	},
	// extends: ['@nuxtjs', 'prettier', 'prettier/vue', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
	extends: ['@nuxtjs', 'prettier', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
	plugins: ['prettier'],
	// add your custom rules here
	rules: {
		'max-len': ['error', { code: 200 }],
		'vue/comment-directive': 'off',
		'vue/no-v-html': 0,
	},
};
