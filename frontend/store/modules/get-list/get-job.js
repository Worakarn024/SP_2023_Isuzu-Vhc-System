export default {
	state: {
		jobresult: [],
		jobListResult: [],
	},
	mutations: {
		setjob(state, job) {
			state.jobresult = job;
		},

		setjoblist(state, arrayOfNames) {
			state.jobListResult = arrayOfNames;
		},
	},
	actions: {
		async getJob({ commit }, state) {
			const jobresponse = await this.$axios.get(`${process.env.VhcUrl}/Master/getoccupation`);
			const jobinput = jobresponse.data;
			const arrayOfNamesAndIDs = jobinput.map((obj) => {
				return {
					Job: obj.Job,
					JobID: obj.JobID,
				};
			});

			commit('setjoblist', arrayOfNamesAndIDs);

			commit('setjob', arrayOfNamesAndIDs);
		},
	},
};
