// import axios from 'axios';
// import { API_BASE_URL } from '../../config';

// axios.defaults.headers.common['x-api-key'] = 'u0T&nzoRpnWycpk6t8nX4IOa7Wv3iY6zzKVPZfC2pwnbgZX';

// const getBase64 = (file) => {
// 	return new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result);
// 		reader.onerror = (error) => reject(error);
// 	});
// };

// export default {
// 	state: {
// 		todoList: [],

// 		fileData: null,
// 		uploadStatus: '',

// 		sticker: [],
// 		button1: [],
// 		list: [],
// 	},
// 	mutations: {
// 		SET_COMMENT_STEP(state, step) {
// 			state.stepList.push(step);
// 		},
// 		SET_ADDITIONAL_STEP(state, step) {
// 			state.todoList.push(step);
// 		},
// 		SET_PICTURE_STEP(state, step) {
// 			state.picture8List.push(step);
// 		},

// 		SET_CHECK_LIST_13(state, list) {
// 			state.list = list;
// 		},
// 		SET_CHECK_LIST_CAR(state, button1) {
// 			state.button1 = button1;
// 		},
// 		SET_CHECK_STICKER(state, sticker) {
// 			state.sticker = sticker;
// 		},

// 		SET_FILE_DATA(state, fileData) {
// 			state.fileData = fileData;
// 		},
// 		SET_UPLOAD_STATUS(state, status) {
// 			state.uploadStatus = status;
// 		},
// 	},
// 	actions: {
// 		uploadFile: async ({ commit }, file) => {
// 			try {
// 				const base64Data = await getBase64(file);

// 				const bodyFormData = new FormData();
// 				bodyFormData.append('file', base64Data);

// 				const response = await axios.post(API_BASE_URL + '/vhc_v2/savevhc', bodyFormData);
// 				commit('SET_UPLOAD_STATUS', 'อัปโหลดสำเร็จ');

// 				// Perform actions with the response data as needed
// 				console.log(response.data);
// 			} catch (error) {
// 				console.error(error);
// 				// Perform actions when an API error occurs
// 				commit('SET_UPLOAD_STATUS', 'เกิดข้อผิดพลาดในการอัปโหลด');
// 			}
// 		},
// 		setcommentStep: ({ commit }, payload) => {
// 			try {
// 				commit('SET_COMMENT_STEP', payload);
// 			} catch (error) {
// 				commit('vhcAddError', error.message);
// 			}
// 		},
// 		setpictureStep: ({ commit }, payload) => {
// 			try {
// 				payload.forEach((element) => {
// 					commit('SET_PICTURE_STEP', element);
// 				});
// 			} catch (error) {
// 				commit('vhcAddError', error.message);
// 			}
// 		},
// 		setadditionalStep: ({ commit }, payload) => {
// 			try {
// 				payload.forEach((element) => {
// 					commit('SET_ADDITIONAL_STEP', element);
// 				});
// 			} catch (error) {
// 				commit('vhcAddError', error.message);
// 			}
// 		},

// 		checkListcar: async ({ commit }, checkcar) => {
// 			try {
// 				await commit('SET_CHECK_LIST_CAR', checkcar);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		},
// 		checkStickercar: async ({ commit }, checksticker) => {
// 			try {
// 				await commit('SET_CHECK_STICKER', checksticker);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		},
// 		check13List: async ({ commit }, list13) => {
// 			try {
// 				await commit('SET_CHECK_LIST_13', list13);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		},

// 		clearVhcAdd({ commit }) {
// 			commit('clearVhcAdd');
// 		},
// 	},
// };
