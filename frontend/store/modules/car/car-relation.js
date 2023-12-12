export default {
	state: {
		status: null,
		body: {
			cus_no: '',
			ahistory_id: '',
		},
	},
	mutations: {
		setBody(state, payload) {
			state.body = payload;
		},
		clearRelation(state) {
			state.body = {
				cus_no: '',
				ahistory_id: '',
			};
		},

		setStatus(state, bool) {
			state.status = bool;
		},
	},
	actions: {
		async linkownertocar({ commit, state }) {
			try {
				const response = await this.$axios.post(`${process.env.VhcUrl}/Car/linkownertocar`, state.body);
				const responseStatus = response.data.message;
				if (responseStatus === 'บันทึกเรียบร้อย') {
					commit('setStatus', true);
				} else {
					commit('setStatus', false);
				}
			} catch (error) {}
		},

		async setRelation({ commit }, payload) {
			await commit('setBody', payload);
		},

		clearRelation({ commit }) {
			commit('clearRelation');
		},
	},
};
