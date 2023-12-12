export default {
	state: {
		nameList: [{ CusNo: null, Cus_Name: null, Cus_Surename: null, M_Tel: null }],
	},
	mutations: {
		setCustomerName(state, name) {
			state.nameList = name;
		},
	},
	actions: {
		async getCustomerName({ commit, state }, searchRegister) {
			const custumerNameResponse = await this.$axios.get(
				`${process.env.VhcUrl}/Car/searchcarbyowner?terms=${searchRegister}`
			);
			const customerData = custumerNameResponse.data;

			commit('setCustomerName', customerData);
		},
	},
};
