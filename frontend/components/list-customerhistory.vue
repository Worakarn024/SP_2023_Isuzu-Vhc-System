<template>
	<div>
		<v-card max-width="400" class="container">
			<v-card-text class="textCard">
				<v-container>
					<div class="row rowLineTop">
						<div class="rowTitle col col-4">ทะเบียนรถ:</div>
						<div class="contentRight col col-8 conStart">{{ item.register }}</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">เลขเครื่อง:</div>
						<div class="contentRight col col-8 conStart">{{ item.chassis }}</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">เลขแซลซี:</div>
						<div class="contentRight col col-8 conStart">{{ item.engin_id }}</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">ชื่อเจ้าของรถ:</div>
						<div class="contentRight col col-8 conStart">
							{{ item.Be + ' ' + item.Cus_Name + ' ' + item.Cus_Surename }}
						</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">ชื่อผู้รับบริการ:</div>
						<div class="contentRight col col-8 conStart">{{ item.Updater }}</div>
					</div>
					<div class="row row-line">
						<div class="col col-4">
							<button class="search-edit-btn" @click="getDetail">ข้อมูลลูกค้า</button>
						</div>
						<div class="col col-4">
							<button class="search-edit-btn" @click="carDetail">ข้อมูลรถ</button>
						</div>
						<div class="col col-4">
							<button class="search-vhc-btn" @click="setDataUser">ประวัติ VHC</button>
						</div>
					</div>
				</v-container>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
export default {
	data() {
		return {
			list: '',
		};
	},
	props: {
		item: {
			type: Object,
		},
	},

	methods: {
		async getDetail() {
			await this.$store.dispatch('setCarId', this.item.id);
			console.log('show item :', this.item);
			await this.$store.dispatch('setcusId', this.item.CusNo);
			await this.$store.dispatch('searchCarByOwnerId', this.item.CusNo);
			await this.$router.push('/more-info/info-customer');
		},
		async setDataUser() {
			await this.$store.dispatch('setcarinfo', this.item.id);
			// console.log(this.item.CusNo);
			this.$router.push('/vhc/historyVHC');
		},

		async carDetail() {
			await this.$store.dispatch('setcarinfo', this.item.id);
			this.$router.push('/sum-data/car-summary');
		},
		// getDetailvhc() {
		// 	this.$store.dispatch('setcarId', this.car.CusNo);
		// 	this.$router.push('/more-info/info-customer');
		// },
	},
};
</script>
<style>
.conStart {
	justify-content: flex-start !important;
}
.row-line {
	border-top: 1px solid #ebebeb;
	color: #000;
}
.rowLineTop {
	border-top: 1px solid #ebebeb;
	color: #000;
}
.textCard {
	text-align: center;
}
.container {
	align-items: center;
	margin-top: 25px;
	margin-bottom: 25px;
	border: 0 solid black; /* black border */
}
.search-vhc-btn {
	background-color: #ed1c24;
	color: white !important;
	border-radius: 5px;
	box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
	height: 35px;
	width: 100px;
	color: #ed1c24;
	border: 1px solid #ed1c24;
}
.search-edit-btn {
	background-color: transparent;
	border-radius: 5px;
	box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
	height: 35px;
	width: 100px;
	color: #ed1c24;
	border: 1px solid #ed1c24;
}
.rowTitle {
	text-align: left;
}
.contentRight {
	display: flex;
	justify-content: flex-end;
}
</style>
