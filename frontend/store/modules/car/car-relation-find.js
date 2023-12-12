export default {
	state: {
		carResult: [],
	},
	mutations: {
		setCarResult(state, carResult) {
			state.carResult = carResult;
		},
	},
	actions: {
		async searchCarByOwnerId({ state, commit }, id) {
			try {
				const carRelateResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/relation-owner-of-car?cus_no=` + id);
				const carRelate = await carRelateResponse.data;

				if (carRelate.length !== 0) {
					const carResult = carRelate.map((item) => ({
						register: item.register,
						engin_id: item.engin_id,
						chassis: item.chassis,
						id: item.id,
						fullmodel_name: item.fullmodel_name,
						idRef_vihicle: item.idRef_vihicle,
						ayoung_type_idl: item.ayoung_type_id,
						color_id: item.color_id,
						amodel_id: item.amodel_id,
						model_name: item.model_name,
					}));
					commit('setCarResult', carResult);
					return carResult;
				} else {
					const carResult = {
						register: '',
						engin_id: '',
						chassis: '',
						id: '',
						fullmodel_name: '',
						idRef_vihicle: '',
						ayoung_type_idl: '',
						color_id: '',
						amodel_id: '',
						model_name: '',
					};
					commit('setCarResult', carResult);
					return carResult;
				}
				// console.log('car find : ', carResult);
			} catch (error) {}
		},
	},
};
