import moment from 'moment';

export default {
	state: {
		carResults: [
			{
				id: '',
				abrand_id: '',
				asell_com_id: '',
				agroup_id: '',
				amodel_id: '',
				model_name: '',
				model: '',
				MDL_CD: '',
				fullmodel_name: '',
				ayoung_type_id: '',
				aunit_class_id: '',
				car_flash: '',
				owner_id: '',
				user_id: '',
				cus_id: '',
				driver_id: '',
				cus_repair: '',
				cus_receive_car: '',
				register_status: '',
				chassis: '',
				full_chassis: '',
				engin_id: '',
				full_engine: '',
				register: '',
				register_province: '',
				dn_code: '',
				deliver_day: '',
				color_id: '',
				lotno: '',
				year: '',
				data_type: '',
				level: '',
				mile_avg: '',
				mile_last: '',
				comment_car: '',
				emp_id: '',
				add_time: '',
				status: '',
				status_new: '',
				cvhc_list: '',
				chk: '',
				type_add: '',
				time_edit: '',
				type_company: '',
				appoint_day: '',
				appoint_num_day: '',
				appoint_active: '',
				appoint_work3: '',
				cusNo: '',
				cusNo_user: '',
				cusNo_owner: '',
				cusNo_driver: '',
				idRef_vihicle: '',
				idref_cusno_e_tax: '',
				act_date: '',
				insurance_date: '',
				vehicle_regis_date: '',
				brand_name: '',
				company_sell_name: '',
				group_name: '',
				color_name: '',
				enginemodel: '',
				ModelGroupSale: '',
				GearType: '',
			},
		],
		customerResults: [
			{
				CusNo: '',
				Date_Receive: '',
				CusNo_Old: '',
				Picture: '',
				Be: '',
				BeType: '',
				company_type: '',
				Cus_Name: '',
				Cus_Surename: '',
				Cus_Nickname: '',
				cus_branch_id: '',
				cus_branch_txt: '',
				Cus_Big_Picture: '',
				Cus_Small_Picture: '',
				Sex: '',
				DateOfBirth: '',
				Cus_IDNo: '',
				Primary_Edu: '',
				Secondary_Edu: '',
				Highschool_Edu: '',
				Bachelor: '',
				Master: '',
				Phd: '',
				Status: '',
				mary_id: '',
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
				Cus_Coppy: '',
				Cus_Add: '',
				Cus_Vil: '',
				Cus_Tum: '',
				Cus_Amp: '',
				Cus_Pro: '',
				Cus_GEO: '',
				Cus_Code: '',
				Cus_AddGPSLatitude: '',
				Cus_AddGPSLongtitude: '',
				Cus_AddMapDescribe: '',
				NotMail: '',
				H_Tel: '',
				JobID: '',
				Job: '',
				JobSegmentGroup: '',
				Job_Des: '',
				W_Name: '',
				Title: '',
				W_Coppy: '',
				W_Add: '',
				W_Vill: '',
				W_Tum: '',
				W_Amp: '',
				W_Pro: '',
				W_GEO: '',
				W_Code: '',
				W_Tel: '',
				W_Fax: '',
				W_Email: '',
				Cus_WGPSLatitude: '',
				Cus_WGPSLongtitude: '',
				Cus_WMapDescribe: '',
				Pagger: '',
				M_Tel: '',
				Email: '',
				Cus_Type: '',
				Data_Received: '',
				Data_Received_Num: '',
				Remark: '',
				Updater: '',
				UpdaterNO: '',
				UpdateT: '',
				Resperson: '',
				Resperson_posCode: '',
				respon_date: '',
				Time_for_talk: '',
				Pleasure_value: '',
				rcheck: '',
				cleansing_status: '',
				cleansing_date: '',
				status_up: '',
			},
		],

		carDetail: [
			{
				id: '',
				abrand_id: '',
				asell_com_id: '',
				agroup_id: '',
				amodel_id: '',
				model_name: '',
				model: '',
				MDL_CD: '',
				fullmodel_name: '',
				ayoung_type_id: '',
				aunit_class_id: '',
				car_flash: '',
				owner_id: '',
				user_id: '',
				cus_id: '',
				driver_id: '',
				cus_repair: '',
				cus_receive_car: '',
				register_status: '',
				chassis: '',
				full_chassis: '',
				engin_id: '',
				full_engine: '',
				register: '',
				register_province: '',
				dn_code: '',
				deliver_day: '',
				color_id: '',
				lotno: '',
				year: '',
				data_type: '',
				level: '',
				mile_avg: '',
				mile_last: '',
				comment_car: '',
				emp_id: '',
				add_time: '',
				status: '',
				status_new: '',
				cvhc_list: '',
				chk: '',
				type_add: '',
				time_edit: '',
				type_company: '',
				appoint_day: '',
				appoint_num_day: '',
				appoint_active: '',
				appoint_work3: '',
				cusNo: '',
				cusNo_user: '',
				cusNo_owner: '',
				cusNo_driver: '',
				idRef_vihicle: '',
				idref_cusno_e_tax: '',
				act_date: '',
				insurance_date: '',
				vehicle_regis_date: '',
				brand_name: '',
				company_sell_name: '',
				group_name: '',
				color_name: '',
				enginemodel: '',
				ModelGroupSale: '',
				GearType: '',
			},
		],
	},
	mutations: {
		getCarSuccess(state, carResults) {
			state.loading = false;
			state.carResults = carResults;
		},
		getCustomerSuccess(state, customerResults) {
			state.loading = false;
			state.customerResults = customerResults;
		},
		setDetail(state, carDetail) {
			state.carDetail = carDetail;
		},
		clearAll(state) {
			state.carDetail = [];
			state.customerResults = [];
		},
	},
	actions: {
		async setcarinfo({ commit, state }, carid) {
			try {
				commit('clearAll');
				const carId = await this.$axios.get(`${process.env.VhcUrl}/Car/getcardetail?id=${carid}`);
				const carRsponse = carId.data[0];
				commit('getCarSuccess', carRsponse);
				if (carRsponse.cusNo !== '' || null) {
					const carinfo = await this.$axios.get(`${process.env.VhcUrl}/Car/getcarowner?CusNo=${carRsponse.cusNo}`);
					commit('getCustomerSuccess', carinfo.data);
				}
			} catch (error) {}
		},

		async getCarDetail({ commit, state }, car) {
			// commit('clearAll');
			const carDetailResponse = await this.$axios.get(`${process.env.VhcUrl}/Car/getcardetail?id=${car}`);
			const mkTime = carDetailResponse.data[0].deliver_day; // Assuming mkTime is the property containing the MK time

			const formattedTime = moment.unix(mkTime).format('DD-MM-YYYY');
			carDetailResponse.data[0].deliver_day = formattedTime;
			await commit('setDetail', carDetailResponse.data[0]);
			// console.log(''carDetailResponse.data[0]);

			if (state.carDetail.cusNo !== null || state.carDetail.cusNo !== '') {
				const customerinfo = await this.$axios.get(
					`${process.env.VhcUrl}/Car/getcarowner?CusNo=${state.carDetail.cusNo}`
				);
				commit('getCustomerSuccess', customerinfo.data);
			}
		},

		async editCarDetail({ commit, state }, car) {
			// Update car detail
			const updateCarRespone = await this.$axios.put(`${process.env.VhcUrl}/Car/updatecar?id=${car.id}`, car);
			console.log(updateCarRespone);
		},
	},
};
