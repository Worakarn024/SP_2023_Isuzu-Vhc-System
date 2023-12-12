<template>
	<div>
		<nav-title :title="pageTitle" />
		<v-container>
			<v-col xs12 md6>
				<div>
					<v-text class="Textcustomer">ข้อมูลรถ</v-text>
					<hr />
					<v-text-field label="ทะเบียน" outlined readonly :value="informationField.register" />
					<v-text-field label="เลขเครื่อง" outlined readonly :value="informationField.engine_Number" />
					<v-text-field label="เลขแชสสี" outlined readonly :value="informationField.chassis_Number" />
					<v-text-field label="เจ้าของรถ" outlined readonly :value="informationField.car_Owner" />
					<v-text-field label="ปีที่ผลิต" outlined readonly :value="informationField.manufacturing_Year" />
					<v-text-field label="วันที่ส่งมอบ" outlined readonly :value="informationField.delivery_Date" />
					<v-text-field label="ยี่ห้อ" outlined readonly :value="informationField.brand" />
					<v-text-field label="บริษัทที่จำหน่าย" outlined readonly :value="informationField.distributor_Company" />
				</div>

				<div>
					<v-text class="Textcustomer">ประเภทรถ/กลุ่มรถ</v-text>
					<hr />
					<v-text-field label="รุ่นรถ" outlined readonly :value="informationField.car_Model" />
					<v-text-field label="กลุ่ม" outlined readonly :value="informationField.group" />
					<v-text-field label="เลข DN" outlined readonly :value="informationField.dn_Number" />
					<v-text-field label="ขนาด" outlined readonly :value="informationField.size" />
					<v-text-field label="สี" outlined readonly :value="informationField.color" />
					<v-text-field label="กลุ่มรุ่นรถ" outlined readonly :value="informationField.car_Model_Group" />
					<v-text-field label="กลุ่มรุ่น" outlined readonly :value="informationField.model_Group" />
					<v-text-field label="D/N" outlined readonly :value="informationField.dn" />
				</div>

				<div>
					<v-text class="Textcustomer">Model</v-text>
					<hr />
					<v-text-field label="Engine model" outlined readonly :value="informationField.engine_Model" />
					<v-text-field label="Model group sale" outlined readonly :value="informationField.model_Group" />
					<v-text-field label="Gear Type" outlined readonly :value="informationField.gear_Type" />
				</div>
			</v-col>

			<div class="button-wrapper">
				<v-btn
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="toBack"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="conditionSave"
					>บันทึก</v-btn
				>
				<v-dialog v-model="dialogRelation" persistent :max-width="300" :max-height="300">
					<v-card>
						<v-card-title class="text-dialog">ทำรายการผูกข้อมูลเสร็จสิ้น</v-card-title>
						<v-card-text class="btn-distance">
							<v-btn
								class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
								style="background: #ed1c24; width: 95px; color: white"
								@click="$router.push('/')"
								>ตกลง</v-btn
							>
						</v-card-text>
					</v-card>
				</v-dialog>

				<v-dialog v-model="dialogSaveCar" persistent :max-width="300" :max-height="300">
					<v-card>
						<v-card-title class="text-dialog">บันทึกรายการเสร็จสิ้น</v-card-title>
						<v-card-text class="btn-distance">
							<v-btn
								class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
								style="background: #ed1c24; width: 95px; color: white"
								@click="$router.push('/')"
								>ตกลง</v-btn
							>
						</v-card-text>
					</v-card>
				</v-dialog>

				<v-dialog v-model="dialogDuplicate" persistent :max-width="300" :max-height="300">
					<v-card>
						<v-card-title class="text-dialog">การบันทึกข้อมูลไม่สำเร็จ<br />เนื่องจากเลขเครื่องซ้ำ </v-card-title>

						<v-card-text class="btn-distance">
							<v-btn
								class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
								style="background: #ed1c24; width: 95px; color: white"
								@click="$router.push('/')"
								>ตกลง</v-btn
							>
						</v-card-text>
					</v-card>
				</v-dialog>
			</div>
		</v-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			dialogRelation: false,
			dialogSaveCar: false,
			dialogDuplicate: false,
			step: 1,
			adFormats: ['นางสาว', 'นาง', 'นาย'],
			radios1: null,
			radios2: null,
			saveState: false,

			informationField: {
				register: '',
				engine_Number: '',
				chassis_Number: '',
				car_Owner: '',
				manufacturing_Year: '',
				delivery_Date: '',
				brand: '',
				distributor_Company: '',
				car_Model: '',
				group: '',
				dn_Number: '',
				size: '',
				color: '',
				car_Model_Group: '',
				model_Group: '',
				dn: '',
				engine_mMdel: '',
				model_Group_Sale: '',
				gear_Type: '',
			},
		};
	},
	computed: {
		pageTitle() {
			return 'สรุปข้อมูลรถ';
		},
	},

	mounted() {
		this.informationField = {
			register: this.$store.state.carsummary.carSummaryResult.carRegisteration,
			engine_Number: this.$store.state.carsummary.carSummaryResult.machineNumber,
			chassis_Number: this.$store.state.carsummary.carSummaryResult.VIN,
			car_Owner: this.$store.state.carsummary.carSummaryResult.carowner,
			manufacturing_Year: this.$store.state.carsummary.carSummaryResult.ปีที่ผลิต,
			delivery_Date: this.$store.state.carsummary.carSummaryResult.วันที่ส่งมอบ,
			brand: this.$store.state.carsummary.carSummaryResult.carBrand,
			distributor_Company: this.$store.state.carsummary.carSummaryResult.บริษัทที่จำหน่าย,
			car_Model: this.$store.state.carsummary.carSummaryResult.cargroup,
			group: this.$store.state.carsummary.carSummaryResult.กลุ่ม,
			dn_Number: this.$store.state.carsummary.carSummaryResult.เลขDN,
			size: this.$store.state.carsummary.carSummaryResult.carsize,
			color: this.$store.state.carsummary.carSummaryResult.carcolor,
			car_Model_Group: this.$store.state.carsummary.carSummaryResult.modelsvgroup,
			model_Group: this.$store.state.carsummary.carSummaryResult.กลุ่มรุ่น,
			dn: this.$store.state.carsummary.carSummaryResult.dn_code,
			engine_Model: this.$store.state.carsummary.carSummaryResult.Enginemodel,
			model_Group_Sale: this.$store.state.carsummary.carSummaryResult.Modelgroupsale,
			gear_Type: this.$store.state.carsummary.carSummaryResult.carType,
		};
	},

	methods: {
		toBack() {
			this.$router.go(-1);
		},

		async checkCondition() {
			const stateCus = await this.$store.state.carRelation.body.cus_no;
			const stateCar = await this.$store.state.carRelation.body.ahistory_id;
			if (stateCus !== '' && stateCar !== '') {
				this.saveState = true;
				console.log('stateCus : ', stateCus);
				console.log('saveState : ', this.saveState);
			} else {
				this.saveState = false;
				console.log('stateCus : ', stateCus);
				console.log('saveState : ', this.saveState);
			}
		},

		async conditionSave() {
			await this.checkCondition();
			if (this.saveState === true) {
				this.savingdata();
				this.dialogRelation = true;
			} else {
				this.savingdata();
				// บันทึกรถ
			}
		},

		async savingdata() {
			try {
				await this.$store.dispatch('saveCar');
				const duplicate = await this.$store.state.carregister.duplicate;
				console.log('saving data called');

				if (duplicate === true) {
					this.dialogDuplicate = true;
				} else {
					this.dialogDuplicate = false;
					this.dialogSaveCar = true;
					this.$store.dispatch('clearCarSummary');
					this.$store.dispatch('clearCarState');
					// this.$router.push('/');
				}

				// this.dialogSaveCar = state;
			} catch (error) {
				this.dialogSaveCar = false;
				// Handle the error here
				// console.error('An error occurred while saving data:', error);
			}
		},
	},
};
</script>

<style>
.button-wrapper {
	text-align: center;
}

.Textcustomer {
	/* border-bottom: 1px solid black; */
	font-weight: bold;
}

hr {
	border: 1px solid black;
	height: 1px;
	margin-bottom: 20px;
	/* Set the hr color */
}

.text-dialog {
	justify-content: center;
	text-align: center;
}

.btn-distance {
	display: flex;
	justify-content: center;
}
</style>
