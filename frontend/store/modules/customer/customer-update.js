export default {
	state: {
		updateResponse: '',
		result: '',
	},
	mutations: {
		responseSet(state, response) {
			state.updateResponse = response;
		},

		resultSet(state, response) {
			state.result = response;
		},
	},
	actions: {
		async updateCustomer({ commit, state }, updateObj) {
			try {
				const updateCustomerResponse = await this.$axios.put(`${process.env.VhcUrl}/Car/updatecarowner`, updateObj);
				commit('responseSet', updateCustomerResponse);

				const result = state.updateResponse.data.results;
				if (result === 'Successfully') {
					commit('resultSet', result);
				} else {
					commit('resultSet', 'Failed');
				}
			} catch (error) {
				console.log(error);
			}
		},
	},
};
