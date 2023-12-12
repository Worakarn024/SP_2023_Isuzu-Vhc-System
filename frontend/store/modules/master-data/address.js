export default {
	state: {
		geographyResult: [
			{
				geo_id: '',
				geo_name: '',
			},
		],
		provinceResult: [
			{
				province_id: '',
				province_code: '',
				province_name: '',
				geo_id: '',
			},
		],
		amphurResult: [
			{
				amphur_id: '',
				amphur_code: '',
				amphur_name: '',
				province_id: '',
			},
		],
		tumbonResult: [
			{
				district_id: '',
				district_code: '',
				district_name: '',
				amphur_id: '',
				province_id: '',
				GEO_id: '',
			},
		],
	},
	mutations: {
		setGeography(state, geography) {
			state.geographyResult = geography;
		},
		setProvince(state, province) {
			state.provinceResult = province;
		},
		setAmphur(state, amphur) {
			state.amphurResult = amphur;
		},
		setTumbon(state, tumbon) {
			state.tumbonResult = tumbon;
		},
	},
	actions: {
		// Geography
		async getGeography({ commit, state }) {
			const geographyResponse = await this.$axios.get(`${process.env.VhcUrl}/Master/getgeography`);
			const geography = geographyResponse.data;
			commit('setGeography', geography);
		},

		// Province
		async getProvince({ commit, state }, id) {
			const provinceResponse = await this.$axios.get(`${process.env.VhcUrl}/Master/getprovincebygeoid?geo_id=${id}`);
			const province = provinceResponse.data;
			await commit('setProvince', province);
		},

		// Amphur
		async getAmphur({ commit, state }, id) {
			const amphurResponse = await this.$axios.get(
				`${process.env.VhcUrl}/Master/getamphurbyprovinceid?province_id=${id}`
			);
			const amphur = amphurResponse.data;
			await commit('setAmphur', amphur);
		},

		// Tumbon
		async getTumbon({ commit, state }, id) {
			const tumbonResponse = await this.$axios.get(`${process.env.VhcUrl}/Master/gettumbonbyamphurid?amphur_id=${id}`);
			const tumbon = tumbonResponse.data;
			await commit('setTumbon', tumbon);
		},
	},
};
