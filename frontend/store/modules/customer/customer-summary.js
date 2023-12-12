export default {
	state: {
		duplicate: false,
		responseCusno: {},
		customerSumResult: [
			{
				Be: '',
				Betype: '',
				Cus_Name: '',
				Cus_Surename: '',
				Cus_Nickname: '',
				Sex: '',
				DateOfBirth: '',
				Cus_IDNo: '',
				mary_id: '',
				Updater: '',
				Cus_Type: '',
				M_Tel: '',
				Status: '',
				C_copy: '',
				C_Add: '',
				C_Vill: '',
				C_Tum: '',
				C_Amp: '',
				C_Pro: '',
				C_GEO: '',
				C_Code: '',
				C_AddGPSLatitude: '',
				C_AddGPSLongtitude: '',
				C_AddMapDescribe: '',
				Cus_copy: '',
				Cus_Add: '',
				Cus_Vill: '',
				Cus_Tum: '',
				Cus_Amp: '',
				Cus_Pro: '',
				Cus_GEO: '',
				Cus_Code: '',
				Cus_AddGPSLatitude: '',
				Cus_AddGPSLongtitude: '',
				Cus_AddMapDescribe: '',
				W_copy: '',
				W_Add: '',
				W_Vill: '',
				W_Tum: '',
				W_Amp: '',
				W_Pro: '',
				W_GEO: '',
				W_Code: '',
				W_AddGPSLatitude: '',
				W_AddGPSLongtitude: '',
				W_AddMapDescribe: '',
				W_Name: '',
				Title: '',
				Email: '',
				Primary_Edu: '',
				Secondary_Edu: '',
				Secondary_Edu_Detail: '',
				Highschool_Edu: '',
				Highschool_Edu_Detail: '',
				Bachelor: '',
				Bachelor_Detail: '',
				Master: '',
				Master_Detail: '',
				Phd: '',
				Phd_Detail: '',
				JobID: '',
				Job: '',
				Job_Des: '',
			},
		],
		status: [],
	},
	mutations: {
		customerSummarySet(state, customer) {
			state.customerSumResult = customer;
		},

		clearCustomerState(state) {
			state.customerSumResult = [];
		},

		setAddStatus(state, status) {
			state.status = [status];
		},

		saveRegister(state, status) {
			state.status = [status];
		},
		duplicateID(state) {
			state.duplicate = true;
		},

		clearduplicateID(state) {
			state.duplicate = false;
		},

		setMessageResponse(state, Response) {
			state.responseCusno = Response;
		},
	},
	actions: {
		customerSummarySet({ commit }, customer) {
			commit('customerSummarySet', customer);
		},

		clearCarSummary({ commit }) {
			commit('clearCustomerState');
		},

		addSet({ commit }, status) {
			commit('setAddStatus', status);
		},

		async registerCustomer({ state, commit }) {
			try {
				commit('clearduplicateID');
				const regisCustomerResponse = await this.$axios.post(
					`${process.env.VhcUrl}/Car/addnewcarowner`,
					state.customerSumResult
				);
				const cusnoRes = await regisCustomerResponse.data.message.MainCusData;
				const errorResponse = await regisCustomerResponse.data.message;

				commit('setMessageResponse', cusnoRes);
				if (errorResponse === 'Duplicate ID Card') {
					commit('duplicateID');
				} else {
					commit('clearduplicateID');
				}
			} catch (error) {}
		},
	},
};
