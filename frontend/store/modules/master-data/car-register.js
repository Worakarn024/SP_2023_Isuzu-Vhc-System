export default {
	state: {
		carRegister: [
			{
				register: null,
				car_id: null,
			},
		],
	},
	mutations: {
		setCarRegister(state, register) {
			state.carRegister = register;
		},
	},
	actions: {
		async getCarRegister({ commit, state }, searchRegister) {
			const carRegisterResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/searchcar?terms=${searchRegister}`);
			const carRegister = carRegisterResponse.data;

			commit('setCarRegister', carRegister);
		},
	},
};
