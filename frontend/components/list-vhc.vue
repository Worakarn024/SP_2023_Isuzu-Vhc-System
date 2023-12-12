<template>
	<div>
		<v-card max-width="400" class="container">
			<v-card-text class="TextCard">
				<v-container>
					<div class="row rowLineTop">
						<div class="rowTitle col col-4">ทะเบียนรถ:</div>
						<div class="contentRight col col-8 conStart">{{ car.register || 'ไม่พบข้อมูล' }}</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">ชื่อเจ้าของรถ:</div>
						<div class="contentRight col col-8 conStart">
							{{ fullName }}
						</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">ชื่อผู้รับบริการ:</div>
						<div class="contentRight col col-8 conStart">{{ car.Updater || 'ไม่พบข้อมูล' }}</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">เบอร์ลูกค้า:</div>
						<div class="contentRight col col-8 conStart">{{ car.M_Tel || 'ไม่พบข้อมูล' }}</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">วันเกิดลูกค้า:</div>
						<div class="contentRight col col-8 conStart">{{ formattedDate }}</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">วันที่:</div>
						<div class="contentRight col col-8 conStart">30-03-2565</div>
						<div class="rowTitle col col-4">เวลา:</div>
						<div class="contentRight col col-8 conStart">10:00:00</div>
					</div>
					<div class="row row-line">
						<div class="rowTitle col col-4">สถานะ E-Tax:</div>
						<div class="contentRight col col-8 conStart">{{ car.idref_cusno_e_tax || 'ไม่พบข้อมูล' }}</div>
					</div>
					<div class="row row-line">
						<div class="col col-4">
							<button class="vhc-edit-btn" @click="getDetail">ข้อมูลลูกค้า</button>
						</div>
						<div v-if="car.register !== ''" class="col col-4">
							<button class="vhc-edit-btn" @click="carDetail">ข้อมูลรถ</button>
						</div>
						<div class="col col-4">
							<button class="vhc-vhc-btn" @click="setDataUser">ทำ VHC</button>
						</div>
					</div>
				</v-container>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	props: {
		car: {
			type: Object,
			required: true,
		},
	},
	computed: {
		formattedDate() {
			if (this.car.DateOfBirth) {
				const [year, month, day] = this.car.DateOfBirth.split('-');
				return `${day}-${month}-${year}`;
			}
			return 'ไม่พบข้อมูล';
		},
		fullName() {
			if (!this.car.Cus_Name && !this.car.Cus_Surename) {
				return 'ไม่พบข้อมูล';
			} else if (!this.car.Cus_Name) {
				return 'ไม่พบข้อมูล';
			} else if (!this.car.Cus_Surename) {
				return 'ไม่พบข้อมูล';
			} else {
				return this.car.Be + ' ' + this.car.Cus_Name + ' ' + this.car.Cus_Surename;
			}
		},
	},
	methods: {
		async getDetail() {
			await this.$store.dispatch('setCarId', this.car.id);
			console.log(this.car);
			await this.$store.dispatch('setcusId', this.car.CusNo);
			await this.$router.push('/more-info/info-customer');
		},
		setDataUser() {
			this.$store.dispatch('setUserDetail', this.car);
			this.$router.push('/vhc/dataincome');
			console.log('this car', this.car);
		},
		async carDetail() {
			await this.$store.dispatch('setcarinfo', this.car.id);
			this.$router.push('/sum-data/car-summary');
		},
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
.TextCard {
	text-align: center;
}
.container {
	align-items: center;
	margin-top: 30px;
	margin-bottom: 30px;
	border: 0 solid black; /* black border */
}
.vhc-vhc-btn {
	background-color: #ed1c24;
	color: white !important;
	border-radius: 5px;
	box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
	height: 35px;
	width: 100px;
	color: #ed1c24;
	border: 1px solid #ed1c24;
}
.vhc-edit-btn {
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
