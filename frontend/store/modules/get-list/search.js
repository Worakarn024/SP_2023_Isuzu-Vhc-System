export default {
	state: () => ({
		searchCus: null,
		searchCar: null,
		SearchCusNo: [{}],
		searchResults: [
			{
				car_id: null,
				fullmodel_name: null,
				owner_id: null,
				user_id: null,
				cus_id: null,
				driver_id: null,
				chassis: null,
				full_chassis: null,
				engin_id: null,
				full_engine: null,
				register: null,
				register_province: null,
			},
		],
		searchdetailResults: [
			{
				id: null,
				abrand_id: null,
				asell_com_id: null,
				agroup_id: null,
				amodel_id: null,
				model_name: null,
				model: null,
				MDL_CD: null,
				fullmodel_name: null,
				ayoung_type_id: null,
				aunit_class_id: null,
				car_flash: null,
				owner_id: null,
				user_id: null,
				cus_id: null,
				driver_id: null,
				cus_repair: null,
				cus_receive_car: null,
				register_status: null,
				chassis: null,
				full_chassis: null,
				engin_id: null,
				full_engine: null,
				register: null,
				register_province: null,
				dn_code: null,
				deliver_day: null,
				color_id: null,
				lotno: null,
				year: null,
				data_type: null,
				level: null,
				mile_avg: null,
				mile_last: null,
				comment_car: null,
				emp_id: null,
				add_time: null,
				status: null,
				status_new: null,
				cvhc_list: null,
				chk: null,
				type_add: null,
				time_edit: null,
				type_company: null,
				appoint_day: null,
				appoint_num_day: null,
				appoint_active: null,
				appoint_work3: null,
				cusNo: null,
				cusNo_user: null,
				cusNo_owner: null,
				cusNo_driver: null,
				idRef_vihicle: null,
				idref_cusno_e_tax: null,
				act_date: null,
				insurance_date: null,
				vehicle_regis_date: null,
				brand_name: null,
				company_sell_name: null,
				group_name: null,
				color_name: null,
				enginemodel: null,
				ModelGroupSale: null,
				GearType: null,
			},
		],
		cuntomerResult: [
			{
				CusNo: null,
				Date_Receive: null,
				CusNo_Old: null,
				Picture: null,
				Be: null,
				BeType: null,
				company_type: null,
				Cus_Name: null,
				Cus_Surename: null,
				Cus_Nickname: null,
				cus_branch_id: null,
				cus_branch_txt: null,
				Cus_Big_Picture: null,
				Cus_Small_Picture: null,
				Sex: null,
				DateOfBirth: null,
				Cus_IDNo: null,
				Primary_Edu: null,
				Secondary_Edu: null,
				Highschool_Edu: null,
				Bachelor: null,
				Master: null,
				Phd: null,
				Status: null,
				mary_id: null,
				C_copy: null,
				C_Add: null,
				C_Vill: null,
				C_Tum: null,
				C_Amp: null,
				C_Pro: null,
				C_GEO: null,
				C_Code: null,
				C_AddGPSLatitude: null,
				C_AddGPSLongtitude: null,
				C_AddMapDescribe: null,
				Cus_Coppy: null,
				Cus_Add: null,
				Cus_Vil: null,
				Cus_Tum: null,
				Cus_Amp: null,
				Cus_Pro: null,
				Cus_GEO: null,
				Cus_Code: null,
				Cus_AddGPSLatitude: null,
				Cus_AddGPSLongtitude: null,
				Cus_AddMapDescribe: null,
				NotMail: null,
				H_Tel: null,
				JobID: null,
				Job: null,
				JobSegmentGroup: null,
				Job_Des: null,
				W_Name: null,
				Title: null,
				W_Coppy: null,
				W_Add: null,
				W_Vill: null,
				W_Tum: null,
				W_Amp: null,
				W_Pro: null,
				W_GEO: null,
				W_Code: null,
				W_Tel: null,
				W_Fax: null,
				W_Email: null,
				Cus_WGPSLatitude: null,
				Cus_WGPSLongtitude: null,
				Cus_WMapDescribe: null,
				Pagger: null,
				M_Tel: null,
				Email: null,
				Cus_Type: null,
				Data_Received: null,
				Data_Received_Num: null,
				Remark: null,
				Updater: null,
				UpdaterNO: null,
				UpdateT: null,
				Resperson: null,
				Resperson_posCode: null,
				respon_date: null,
				Time_for_talk: null,
				Pleasure_value: null,
				rcheck: null,
				cleansing_status: null,
				cleansing_date: null,
				status_up: null,
			},
		],
		vhcresult: [],
		finalListResult: [
			{
				CusNo: '',
				Be: '',
				Cus_Name: '',
				Cus_Surename: '',
				Updater: '',
				register: '',
				engin_id: '',
				chassis: '',
				id: '',
			},
		],

		loading: false,
		error: null,
	}),
	mutations: {
		// car
		searchStarted(state) {
			state.searchCar = true;
			state.searchCus = false;
			state.loading = true;
			state.error = null;
			state.searchResults = [];
			state.searchdetailResults = [];
		},
		searchSuccess(state, searchResults) {
			state.loading = false;
			state.searchResults = searchResults;
		},
		searchError(state, error) {
			state.loading = false;
			state.error = error;
		},

		// detail
		searchDetailSuccess(state, searchdetailResults) {
			state.loading = false;
			state.searchdetailResults = searchdetailResults;
		},

		// customer
		customersearch(state, cuntomerResult) {
			state.loading = false;
			state.cuntomerResult = cuntomerResult;
		},
		searchCusStarted(state) {
			state.searchCus = true;
			state.searchCar = false;
		},

		// vhc
		vhcsearch(state, cuntomerResult) {
			state.vhcresult = cuntomerResult;
		},

		setFinal(state, Final) {
			state.finalListResult = Final;
			state.SearchCusNo = [];
		},
		clearFinal(state) {
			state.finalListResult = [];
		},
		setSearchCusNo(state, SearchCusNo) {
			state.finalListResult = [];
			state.SearchCusNo = SearchCusNo;
		},
	},

	actions: {
		async searchCusByName({ commit, dispatch }, name) {
			commit('searchCusStarted');
			commit('clearFinal');
			let customerarray = [];
			const customerResult = [];
			let searchCusNo;

			// find customer number list
			for (let i = 0; i < name.length; i++) {
				const cusResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/searchcarbyowner?terms=${name[i]}`);
				const cusIdList = cusResponse.data.map((item) => item.CusNo);

				if (i === 0) {
					customerarray = cusIdList;
				}
				searchCusNo = cusIdList.filter((element) => customerarray.includes(element));
			}

			// find customer information
			for (let i = 0; i < searchCusNo.length; i++) {
				const cusResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/getcarowner?CusNo=${searchCusNo[i]}`);
				const listCusNo = cusResponse.data;

				const customerObj = {
					CusNo: listCusNo.CusNo,
					Be: listCusNo.Be,
					Cus_Name: listCusNo.Cus_Name,
					Cus_Surename: listCusNo.Cus_Surename,
					Updater: listCusNo.Updater,
					UpdaterNo: listCusNo.UpdaterNo,
				};

				// get car detail of that CusNo
				const carRelate = await dispatch('searchCarByOwnerId', customerObj.CusNo);

				if (carRelate.register !== '') {
					for (let y = 0; y < carRelate.length; y++) {
						const mergeCusCar = { ...listCusNo, ...carRelate[y] };
						customerResult.push(mergeCusCar);
					}
				} else {
					const mergeCusCar = { ...listCusNo, ...carRelate };
					customerResult.push(mergeCusCar);
				}
				// commit('setFinal', customerResult);
			}

			// result
			commit('setFinal', customerResult);
			// console.log('customerResult : ', customerResult);
		},

		async searchcar({ commit, state }, searchTerm) {
			commit('searchStarted');
			try {
				const response = await this.$axios.get(`${process.env.VhcUrl}/Car/searchcar?terms=${searchTerm}`);
				commit('searchSuccess', response.data);

				const carIds = state.searchResults.map((result) => result.car_id);

				const detailResponses = await Promise.all(
					carIds.map(async (item) => {
						try {
							const carDetailResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/getcardetail?id=${item}`);
							return carDetailResponse.data;
						} catch (error) {
							console.error(`Error fetching car detail for carId ${item}:`, error);
							return null; // or handle the error as needed
						}
					})
				);

				const carDetailOjb = detailResponses.reduce((accumulator, currentArray) => {
					return accumulator.concat(currentArray);
				}, []);

				commit('searchDetailSuccess', carDetailOjb);
				// finish car

				const cusIds = state.searchdetailResults.map((result) => result.cusNo);
				const customerResponses = await Promise.all(
					cusIds.map(async (item) => {
						try {
							if (item !== '' || null) {
								const carOwnerResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/getcarowner?CusNo=${item}`);
								return carOwnerResponse.data;
							} else {
								const empty = { CusNo: '', Be: '', Cus_Name: '', Cus_Surename: '', Updater: '' };
								return empty;
							}
						} catch (error) {
							console.error(`Error fetching car detail for carId ${item}:`, error);
							return null; // or handle the error as needed
						}
					})
				);
				const carOwnerDetailOjb = customerResponses.reduce((accumulator, currentArray) => {
					return accumulator.concat(currentArray);
				}, []);
				commit('customersearch', carOwnerDetailOjb);

				const carDetailArray = state.searchdetailResults;
				const carOwnerArray = state.cuntomerResult;

				const mergedArray = carDetailArray.map((carDetail) => {
					const matchingOwner = carOwnerArray.find((owner) => owner && owner.CusNo.toString() === carDetail.cusNo);

					// in case when car isn't own by any owner
					const emptyOwnerObject = {
						CusNo: '',
						Be: '',
						Cus_Name: '',
						Cus_Surename: '',
						Updater: '',
					};

					if (matchingOwner) {
						return { ...carDetail, ...matchingOwner };
					} else {
						return { ...carDetail, ...emptyOwnerObject };
					}
				});

				commit('setFinal', mergedArray);
			} catch (error) {
				commit('searchError', error.message);
			}
		},

		clearfinalListResult({ commit }) {
			commit('clearFinal');
		},
	},
};
