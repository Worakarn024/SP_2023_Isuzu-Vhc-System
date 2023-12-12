<template>
	<div>
		<nav-title :title="pageTitle" />
		<div class="messenger-distance">
			<h3>Dashboard ยังไม่สามารถทำได้ เนื่องจากยังไม่มีตัว API เพื่อดึงข้อมูลมาใช้</h3>
		</div>
	</div>
</template>
<style>
.messenger-distance {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
</style>

<script>
export default {
	computed: {
		pageTitle() {
			return 'Dashboard';
		},
	},
	async mounted() {
		console.log('~~~~~~~~~~~~~~~~ Dashboard Page ~~~~~~~~~~~~~~~~');
		console.log('ENV NODE_ENV', process.env.NODE_ENV);
		console.log('ENV apiUrl', process.env.apiUrl);

		console.log('======================== GET JOB ===================');
		const jobs = await this.$store.dispatch('modules/master-data/getJobList');
		console.log(jobs);
	},
	methods: {
		toBack() {
			this.$router.go(-1);
		},
	},
};
</script>
