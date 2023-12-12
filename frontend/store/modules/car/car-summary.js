export default {
	state: {
		carSummaryResult: [
			{
				carRegisteration: null,
				VIN: null,
				machineNumber: null,
				ปีที่ผลิต: null,
				วันที่ส่งมอบ: null,
				carBrand: null,
				บริษัทที่จำหน่าย: null,
				cargroup: null,
				กลุ่ม: null,
				เลขDN: null,
				carsize: null,
				carcolor: null,
				modelsvgroup: null,
				กลุ่มรุ่น: null,
				dn_code: null,
				Enginemodel: null,
				Modelgroupsale: null,
				carType: null,
				carowner: null,
			},
		],
	},
	mutations: {
		setCarSummary(state, car) {
			state.carSummaryResult = car;
		},

		clearSetCarSummary(state) {
			state.carSummaryResult = [];
		},
	},
	actions: {
		summarySet({ commit, state }, car) {
			commit('setCarSummary', car);
			// console.log(state.carsummary)
		},

		clearCarSummary({ commit }) {
			commit('clearSetCarSummary');
			// console.log(state.carsummary)
		},
	},
};
