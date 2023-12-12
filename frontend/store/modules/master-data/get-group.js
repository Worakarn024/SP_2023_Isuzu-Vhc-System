export default {
	state: {
		group: [
			{
				id: '',
				abrand_id: '',
				tis_name: '',
				name: '',
			},
		],
	},
	mutations: {
		saveGroup(state, group) {
			state.group = group;
		},
	},
	actions: {
		async getGroupByBrandId({ commit }, id) {
			const groupResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/getgroup_by_brand_id?abrand_id=${id}`);
			const group = await groupResponse.data.message;
			commit('saveGroup', group);
		},
	},
};
