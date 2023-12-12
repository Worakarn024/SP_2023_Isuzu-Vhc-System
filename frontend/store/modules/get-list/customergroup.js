export default {
	state: {
		CustomerGroupList: [
			{
				CUS_TYPE_LEVEL_DESC: null,
			},
		],
	},
	mutations: {
		setCustomerGroup(state, group) {
			state.CustomerGroupList = group;
		},
	},
	actions: {
		async getCustomerGroup({ commit }, state) {
			const groupResponse = await this.$axios.get(`${process.env.VhcUrl}/Master/getcustomergroup`);
			const CustomerList = groupResponse.data;
			const groupNames = CustomerList.map((obj) => obj.CUS_TYPE_LEVEL_DESC);
			const groupNamesJson = JSON.parse(JSON.stringify(groupNames));

			commit('setCustomerGroup', groupNamesJson);
		},
	},
};
