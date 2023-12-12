export default {
	state: {
		model: [
			{
				id: '',
				abrand_id: '',
				agroup_id: '',
				model: '',
				MDL_CD: '',
				name: '',
				Abbreviation: '',
			},
		],

		modelById: [
			{
				model: '',
				name: '',
			},
		],
	},
	mutations: {
		saveModelByGroupId(state, model) {
			state.modelById = model;
		},

		saveModel(state, model) {
			state.model = model;
		},
	},
	actions: {
		async getModelByGroupId({ commit }, id) {
			const modelResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/getmodel_by_group_id?agroup_id=${id}`);
			const model = await modelResponse.data.message;
			commit('saveModelByGroupId', model);
		},

		async getModel({ commit }) {
			const modelResponse = await this.$axios.get(
				`${process.env.VhcUrl}/Car/getmodel?abrand_id=1&agroup_id=4&model=210`
			);
			const model = await modelResponse.data.message;
			commit('saveModel', model);
		},
	},
};
