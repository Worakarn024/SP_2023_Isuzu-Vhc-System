export const state = () => ({
	JobID: null,
	SegmentGroup: null,
	Job: null,
	Job_Describe: null,
	TIS_ID_REF: null,
	TYPE_OF_CUS: null,
	Job_Old: null,
	status: null,
});

export const getters = {
	getJob: (state) => state,
};

export const mutations = {
	SET_JOB(state, data) {
		state = {
			...state,
			...data,
		};
	},
};

export const actions = {
	setJobList({ commit }, data) {
		commit('SET_JOB', data);
	},

	getJobList({ commit }) {
		console.log('========== getJobList ===============');
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve, reject) => {
			try {
				const jobs = await this.$axios.$get(`${process.env.VhcUrl}/Master/getoccupation`);
				resolve(jobs);
			} catch (error) {
				reject(error);
			}
		});
	},
	nuxtServerInit({ commit, state }, { req }) {
		//
	},
};
