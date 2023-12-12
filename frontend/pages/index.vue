<template>
	<v-container class="d-flex justify-center align-center">
		<div>
			<div class="container">
				<div class="grid">
					<button class="button" @click="navigateTo(searchData)">
						<img width="76px" hight="79px" radius="25" src="../assets/img/Homepage Icon/search-data.png" />
						<br />
						ค้นหาข้อมูลลูกค้า
					</button>

					<button class="button" @click="showDialog">
						<img width="76px" hight="79px" radius="25" src="../assets/img/Homepage Icon/create-new.png" />
						<br />
						ทำรายการใหม่
					</button>
					<PopupRegister :visible="dialogVisible" @close="hideDialog" />

					<button class="button" @click="navigateTO(historyVHC)">
						<img width="76px" hight="79px" radius="25" src="../assets/img/Homepage Icon/history.png" />
						<br />
						ประวัติ VHC
					</button>

					<button class="button" @click="navigateToVHC(VHC)">
						<img width="76px" hight="79px" radius="25" src="../assets/img/Homepage Icon/VHC.png" />
						<div class="">VHC</div>
					</button>
				</div>
			</div>
		</div>
	</v-container>
</template>

<script>
export default {
	layout: 'home-layout',
	data() {
		return {
			title: 'My Page Title',
			dialogVisible: false,
		};
	},

	async mounted() {
		await console.log('start');
		await this.$store.dispatch('getCustomerGroup');
		this.getJob();

		// await this.$store.dispatch('getModelByGroupId', 3);
		// console.log(this.$store.state.getModel.modelById);
	},

	methods: {
		async getJob() {
			await this.$store.dispatch('getJob');
		},

		navigateTo(searchData) {
			this.$router.push('/search/search-data');
		},

		navigateTO(historyVHC) {
			this.$router.push('/search/search-history');
		},
		navigateToVHC(VHC) {
			this.$router.push('/vhc/vhc');
		},

		showDialog() {
			this.dialogVisible = true;
		},
		hideDialog() {
			this.dialogVisible = false;
		},
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

.button {
	width: 130px;
	height: 125px;
	color: rgb(0, 0, 0);
	margin: 10px;
	padding: 1px 1px;
	border: 4px solid #dadada;
	border-radius: 10px;
	font-family: 'Kanit', sans-serif;
	flex: 1;
	cursor: pointer;
	text-align: center;
	background-color: #ffffff;
}

.container {
	justify-content: center;
}

.grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: repeat(2, 1fr);
	gap: 10px;
}

@media (max-width: 300px) {
	.grid {
		flex: auto;
		grid-template-columns: repeat(1, 1fr);
		grid-template-rows: repeat(4, 1fr);
	}
}
</style>
