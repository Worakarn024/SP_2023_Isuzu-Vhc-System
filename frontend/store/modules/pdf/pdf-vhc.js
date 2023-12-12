/* eslint-disable no-console */
export default {
	state: () => ({
		dataPDF: [
			{
				id: null,
				branch_id: null,
				vhc_model_id: null,
				model_name: null,
				mile_in: null,
				engin_id: null,
				chassis: null,
				cus_id: null,
				running_queue: null,
				comment: null,
				create_by: null,
				update_by: null,
				vhc_date: null,
				vhc_time: null,
				cus_type: null,
				is_body_damage: null,
				PDF_file: null,
				customer_signature: null,
				sa_vhc_signature: null,
				customer_recieve_signature: null,
				sa_delivery_signature: null,
				radio_pole: null,
				hbg_sticker: null,
				blame_rainy: null,
				blame_dust: null,
				blame_drop: null,
				is_complete: null,
				register: null,
				company_name: null,
				Cus_Name: null,
				Cus_Surename: null,
				M_Tel: null,
				DateOfBirth: null,
			},
		],
		checkListPDF: [
			{
				option_id: 1,
				option_name: 'ระบบส่องสว่างภายใน/ระบบไฟฟ้ามาตรวัด',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 2,
				option_name: 'ระดับน้ำมันเครื่อง',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 3,
				option_name: 'ระดับน้ำมันพวงมาลัยพาวเวอร์',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 4,
				option_name: 'ระดับน้ำฉีดกระจก',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 5,
				option_name: 'สภาพแบตเตอร์รี่',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 6,
				option_name: 'ระดับน้ำกลั่น',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 7,
				option_name: 'สภาพสายพานหน้าเครื่อง/สายพานแอร์',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 8,
				option_name: 'ระดับของเหลวหล่อเย็น(Coolant)',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 9,
				option_name: 'สภาพท่อยางหม้อน้ำ',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 10,
				option_name: 'ระดับน้ำมันเบรก/คลัตซ์',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 11,
				option_name: 'เครื่องยนต์(การรั่วซึม ความเสียหาย)',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 12,
				option_name: 'สภาพยางปัดน้ำฝน L,R',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
			{
				option_id: 13,
				option_name: 'สภาพยางรถยนต์',
				option_value: null,
				option_massage: null,
				option_image: null,
			},
		],
		showAddressVhc: [
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
		stickerData: [{ hbg_sticker: null }],

		loading: false,
		error: null,
	}),
	mutations: {
		setDataVhc(state, dataPDF) {
			state.loading = false;
			state.dataPDF = dataPDF;
		},
		setVhcList(state, checkListPDF) {
			state.loading = false;
			state.checkListPDF = checkListPDF;
		},
		setAddress(state, showAddressVhc) {
			state.loading = false;
			state.showAddressVhc = showAddressVhc;
		},
		setSticker(state, stickerData) {
			state.loading = false;
			state.stickerData = stickerData;
		},
	},

	actions: {
		async showDataPDF({ commit, state }) {
			try {
				const pdfResponse = await this.$axios.get(`${process.env.VhcUrl}/vhc_v2/getVhcbyid?cvhc_main_id=420261`);
				commit('setDataVhc', pdfResponse.data[0]);
				console.log(state.dataPDF);

				const addressResponse = await this.$axios.get(
					`${process.env.VhcUrl}/Car/getcarowner?CusNo=` + state.dataPDF.cus_id
				);
				commit('setAddress', addressResponse.data);
				console.log(addressResponse.data);
			} catch (error) {
				commit('pdfError', error.message);
			}
		},
		async showCheckListPDF({ commit, state }) {
			try {
				const checkListResponse = await this.$axios.get(
					`${process.env.VhcUrl}/vhc_v2/getChecklist?cvhc_main_id=420261`
				);
				commit('setVhcList', checkListResponse.data);
				const listInput = checkListResponse.data;
				const arrayOfValue = listInput.map((obj) => obj.option_value);
				// commit('setVhcList', arrayOfNames)
				console.log(state.checkListPDF);
				const optionResult = arrayOfValue.map((value) => (value ? 'ไม่ปกติ' : 'ปกติ'));
				commit('setVhcList', optionResult);
			} catch (error) {
				commit('pdfError', error.message);
			}
		},
		async showStickerData({ commit, state }) {
			try {
				const stickerResponse = await this.$axios.get(`${process.env.VhcUrl}/vhc_v2/getVhcbyid?cvhc_main_id=420261`);
				commit('setSticker', stickerResponse.data);

				const stickerValue = stickerResponse.data;
				const stickerResult = stickerValue === 0 ? 'ไม่ติดสติ๊กเกอร์นก' : 'ติดสติ๊กเกอร์นก';

				commit('setSticker', stickerResult);
				console.log(state.stickerData);
			} catch (error) {
				commit('pdfError', error.message);
			}
		},
	},
};
