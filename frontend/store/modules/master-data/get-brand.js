export default {
	state: {
		brand: [
			{
				id: '',
				name: '',
				idRef_vihicle: '',
			},
		],
	},
	mutations: {
		saveBrand(state, brand) {
			state.brand = brand;
		},
	},
	actions: {
		async getBrand({ commit }) {
			const brandResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/getbrand`);
			const brand = await brandResponse.data.message;
			commit('saveBrand', brand);
		},
	},
};
