export default {
	state: {
		vhcHistoryResult: [
			{
				id: '',
				vhc_date: '',
				vhc_time: '',
				ahistory_id: '',
				amodel_id: '',
				model_name: '',
				mile_in: '',
				running_queue: '',
				vhc_model_id: '',
				cus_id: '',
				engin_id: '',
				chassis: '',
				comment: '',
				time_delivery: '',
				start_time_vhc: '',
				end_time_vhc: '',
				clocking_time_vhc: '',
				is_body_damage: '',
				PDF_file: '',
				record_status: '',
				create_by: '',
				update_by: '',
				create_date: '',
				update_date: '',
				branch_id: '',
				cvhc_main_id: '',
				customer_signature: '',
				sa_vhc_signature: '',
				customer_recieve_signature: '',
				sa_delivery_signature: '',
				radio_pole: '',
				hbg_sticker: '',
				hbg_sticker_current: '',
				blame_rainy: '',
				blame_dust: '',
				blame_drop: '',
				cus_type: '',
				is_complete: '',
				path_customer_signature: '',
				path_sa_signature: '',
			},
		],
	},
	mutations: {
		setHistory(state, response) {
			state.vhcHistoryResult = response;
		},
	},
	actions: {
		async getVhcHistory({ commit }, id) {
			try {
				const vhcHistoryResponse = await this.$axios.get(`${process.env.InVhcUrl}/vhc-master/ahistory/${id}`);
				const response = vhcHistoryResponse.data;

				response.forEach((item) => {
					// Check if item.is_complete is 0 or 1
					if (item.is_complete === 0) {
						item.is_complete = 'ดำเนินการ';
					} else if (item.is_complete === 1) {
						item.is_complete = 'เสร็จสิ้น';
					} else {
						// Handle other cases if needed
						console.error('Invalid value for is_complete:', item.is_complete);
					}
					if (item.start_time_vhc) {
						const date = new Date(item.start_time_vhc);
						const formattedDate = date.toLocaleDateString('en-GB'); // Adjust the locale as needed
						item.start_time_vhc = formattedDate;
					}
				});

				commit('setHistory', response);
			} catch (error) {
				console.log(error);
			}
		},
	},
};
