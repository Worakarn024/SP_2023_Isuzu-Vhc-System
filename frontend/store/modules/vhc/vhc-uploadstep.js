import axios from 'axios';
import { API_BASE_URL } from '../../config';

axios.defaults.headers.common['x-api-key'] = 'u0T&nzoRpnWycpk6t8nX4IOa7Wv3iY6zzKVPZfC2pwnbgZX';

// const getBase64 = (file) => {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result);
// 		reader.onerror = (error) => reject(error);
// 	});
// };

export default {
	state: {
		carDetail: [],
		userDetail: [],
		stepList: [],
		todoList: [],
		picture8List: [],
		fileData: null,
		uploadStatus: '',
		imgstep1: [],
		imgstep2: [],
		imgstep3: [],
		imgstep4: [],
		imgstep5: [],
		imgstep6: [],
		commore: [],
		sticker: [],
		button1: [],
		list: [],
	},
	mutations: {
		SET_USER_DETAIL(state, step) {
			state.userDetail = step;
		},
		SET_CAR_DETAIL(state, step) {
			state.carDetail = step;
		},
		SET_IMG_STEP_1(state, imgstep1) {
			state.imgstep1 = imgstep1;
		},
		SET_COMMENT_STEP(state, step) {
			state.stepList = step;
		},
		SET_ADDITIONAL_STEP(state, step) {
			state.todoList = step;
		},
		SET_PICTURE_STEP(state, step) {
			state.picture8List = step;
		},
		SET_IMG_STEP_2(state, imgstep2) {
			state.imgstep2 = imgstep2;
		},
		SET_IMG_STEP_3(state, imgstep3) {
			state.imgstep3 = imgstep3;
		},
		SET_IMG_STEP_4(state, imgstep4) {
			state.imgstep4 = imgstep4;
		},
		SET_IMG_STEP_5(state, imgstep5) {
			state.imgstep5 = imgstep5;
		},
		SET_IMG_STEP_6(state, imgstep6) {
			state.imgstep6 = imgstep6;
		},
		SET_CHECK_LIST_13(state, list) {
			state.list = list;
		},
		SET_CHECK_LIST_CAR(state, button1) {
			state.button1 = button1;
		},
		SET_CHECK_STICKER(state, sticker) {
			state.sticker = sticker;
		},

		SET_FILE_DATA(state, fileData) {
			state.fileData = fileData;
		},
		SET_UPLOAD_STATUS(state, status) {
			state.uploadStatus = status;
		},

		clearCarState(state) {
			state.imgstep1 = [];
			state.imgstep2 = [];
			state.imgstep3 = [];
			state.imgstep4 = [];
			state.imgstep5 = [];
			state.imgstep6 = [];
		},
	},
	actions: {
		generatepdf: async ({ commit }, data) => {
			try {
				console.log('test', data);
				const response = await axios.get('https://hornbillsolution.net/mfu/api/v2/vhc' + '/generate/pdf/' + data.id);

				// Perform actions with the response data as needed
				console.log(response.data);
				return response.data;
			} catch (error) {
				console.error(error);
				// Perform actions when an API error occurs
				commit('SET_UPLOAD_STATUS', 'เกิดข้อผิดพลาดในการอัปโหลด');
				return false;
			}
		},
		insertDataVHC: async ({ commit }, file) => {
			try {
				// const base64Data = await getBase64(file);

				// const bodyFormData = new FormData();
				// bodyFormData.append('file', base64Data);

				const response = await axios.post(API_BASE_URL + '/vhc_v2/savevhc', file);
				commit('SET_UPLOAD_STATUS', 'อัปโหลดสำเร็จ');

				// Perform actions with the response data as needed
				console.log(response.data);
				return response.data;
			} catch (error) {
				console.error(error);
				// Perform actions when an API error occurs
				commit('SET_UPLOAD_STATUS', 'เกิดข้อผิดพลาดในการอัปโหลด');
				return false;
			}
		},
		setCarDetail: ({ commit }, payload) => {
			try {
				commit('SET_CAR_DETAIL', payload);
			} catch (error) {
				console.error(error);
				// commit('vhcAddError', error.message);
			}
		},
		setUserDetail: ({ commit }, payload) => {
			try {
				commit('SET_USER_DETAIL', payload);
			} catch (error) {
				console.error(error);
				// commit('vhcAddError', error.message);
			}
		},
		setcommentStep: ({ commit }, payload) => {
			try {
				commit('SET_COMMENT_STEP', payload);
			} catch (error) {
				console.error(error);
				// commit('vhcAddError', error.message);
			}
		},
		setpictureStep: ({ commit }, payload) => {
			try {
				commit('SET_PICTURE_STEP', payload);
			} catch (error) {
				console.error(error);
				// commit('vhcAddError', error.message);
			}
		},
		setadditionalStep: ({ commit }, payload) => {
			try {
				commit('SET_ADDITIONAL_STEP', payload);
			} catch (error) {
				console.error(error);
				// commit('vhcAddError', error.message);
			}
		},
		setimgStep: ({ commit }, payload) => {
			try {
				if (payload.step === 1) {
					commit('SET_IMG_STEP_1', payload.data);
				} else if (payload.step === 2) {
					commit('SET_IMG_STEP_2', payload.data);
				} else if (payload.step === 3) {
					commit('SET_IMG_STEP_3', payload.data);
				} else if (payload.step === 4) {
					commit('SET_IMG_STEP_4', payload.data);
				} else if (payload.step === 5) {
					commit('SET_IMG_STEP_5', payload.data);
				} else if (payload.step === 6) {
					commit('SET_IMG_STEP_6', payload.data);
				}
			} catch (error) {
				commit('vhcAddError', error.message);
			}
		},

		checkListcar: async ({ commit }, checkcar) => {
			try {
				await commit('SET_CHECK_LIST_CAR', checkcar);
			} catch (error) {
				console.error(error);
			}
		},
		checkStickercar: async ({ commit }, checksticker) => {
			try {
				await commit('SET_CHECK_STICKER', checksticker);
			} catch (error) {
				console.error(error);
			}
		},
		check13List: async ({ commit }, list13) => {
			try {
				await commit('SET_CHECK_LIST_13', list13);
			} catch (error) {
				console.error(error);
			}
		},

		clearVhcAdd({ commit }) {
			commit('clearVhcAdd');
		},
	},
};
