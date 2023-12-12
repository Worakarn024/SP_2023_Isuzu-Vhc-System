export default {
	state: {
		status: null,
		carResult: [],
		carState: [],
		duplicate: false,

		relationBody: {
			cus_no: '',
			ahistory_id: '',
		},
	},
	mutations: {
		setBody(state, payload) {
			state.relationBody = payload;
		},

		setCarForRelation(state, payload) {
			state.relationBody.ahistory_id = payload;
		},
		clearRelation(state) {
			state.relationBody = {
				cus_no: '',
				ahistory_id: '',
			};
		},
		setCar(state, car) {
			state.carResult = car;
		},

		setCarState(state, car) {
			state.carState = car;
		},

		clearCarState(state) {
			state.carState = [];
			state.carResult = [];
		},

		duplicate(state) {
			state.duplicate = true;
		},

		clearDuplicate(state) {
			state.duplicate = false;
		},
		setStatus(state, bool) {
			state.status = bool;
		},
	},
	actions: {
		setCarState({ commit, state }, car) {
			try {
				commit('setCarState', car);
			} catch (error) {
				commit('carRegisterError', error.message);
			}
		},

		async saveCar({ commit, state }, car) {
			try {
				commit('clearDuplicate');
				const responseStatus = await this.$axios.post(`${process.env.VhcUrl}/Car/addnewcar`, state.carState);
				const saveResponse = responseStatus.data.message;

				const carId = saveResponse[0].id;
				commit('setCarForRelation', carId);
				console.log('saveResponse[0].id : ', carId);
				console.log('state relationBody from saving :', state.relationBody);
				// get Resposne and link
				if (state.relationBody.cus_no !== '' && state.relationBody.ahistory_id !== '') {
					try {
						const response = await this.$axios.post(`${process.env.VhcUrl}/Car/linkownertocar`, state.relationBody);
						const responseStatus = response.data.message;
						if (responseStatus === 'บันทึกเรียบร้อย') {
							commit('setStatus', true);
						} else {
							commit('setStatus', false);
						}
					} catch (error) {}
				}

				if (saveResponse === 'Duplicate Chassis or FullChassis') {
					commit('duplicate');
				} else {
					commit('clearDuplicate');
				}
			} catch (error) {
				commit('carRegisterError', error.message);
			}
		},

		async setSaveAndLinkRelation({ commit }, payload) {
			await commit('setBody', payload);
		},

		clearCarState({ commit }) {
			commit('clearCarState');
		},
	},
};
