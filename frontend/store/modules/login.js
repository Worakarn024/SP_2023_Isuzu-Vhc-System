export default {
	state: () => ({
		loginResult: [
			{
				Code: null,
				DataNo: null,
				ID_Card: null,
				Name: null,
				Nickname: null,
				Pictures_HyperL: null,
				Surname: null,
			},
		],

		positionResult: [
			{
				position_code: null,
				position_name: null,
			},
		],

		loading: false,
		error: null,
	}),
	mutations: {
		// login
		loginStart(state) {
			state.loading = true;
			state.error = null;
			state.loginResult = [];
		},
		loginSuccess(state, loginResult) {
			state.loading = false;
			state.loginResult = loginResult;
		},

		// position
		positionSuccess(state, positionResult) {
			state.loading = false;
			state.positionResult = positionResult;
		},
	},

	actions: {
		async login({ commit, state }) {
			commit('loginStart');
			try {
				const loginResponse = await this.$axios.get(
					`${process.env.VhcUrl}/Login/checklogin?username=จิราพร&password=112233&position=SSSV103302`
				);
				commit('loginSuccess', loginResponse.data);

				const posResponse = await this.$axios.get(`${process.env.VhcUrl}/Login/getposition?username=จิราพร`);
				commit('positionSuccess', posResponse.data[0]);
			} catch (error) {
				commit('loginError', error.message);
			}
		},
	},
};
