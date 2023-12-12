// eslint-disable-next-line prettier/prettier
export default ({ store, app: { $axios }, redirect }) => {
	$axios.onRequest((config) => {
		return config;
	});

	$axios.defaults.headers.common['x-api-key'] = process.env.xapiKey;

	$axios.defaults.timeout = process.env.VhcTimeOut;
	$axios.defaults.maxContentLength = Infinity;
	$axios.defaults.maxBodyLength = Infinity;

	console.log($axios.defaults);

	$axios.onError(() => {
		// logger.error(error.response.data.message || error.response || error);
	});
};
