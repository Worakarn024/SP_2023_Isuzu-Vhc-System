<template>
	<div>
		<nav-title :title="pageTitle" />
		<v-container>
			<v-stepper v-model="step">
				<v-stepper-header>
					<v-stepper-step step="1" color="red">ข้อมูลรถ</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="2" color="red">ประเภทรถ/กลุ่มรถ</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="3" color="red">Model</v-stepper-step>
				</v-stepper-header>
			</v-stepper>

			<v-col xs12 md6>
				<div v-if="step === 1">
					<br />
					<v-text class="Textcustomer">ข้อมูลรถ</v-text>
					<hr />
					<v-text-field
						v-model="carRegisteration"
						label="ทะเบียน"
						filled
						:error-messages="carRegisterationErrorMessages"
						:rules="[]"
						append-icon="mdi-magnify"
						@click:append="handlePrependClick"
						@input="clearForms"
					>
						<v-messages
							v-if="carRegisterationErrorMessages.length > 0"
							:error-messages="carRegisterationErrorMessages"
						></v-messages>
					</v-text-field>
					<v-dialog v-model="showCarList" class="dialog-list" max-width="600">
						<v-card>
							<v-toolbar color="#CF1818">
								<v-col class="d-flex justify-space-around">
									<v-toolbar-title class="white--text">เลือกเลขทะเบียน</v-toolbar-title>
								</v-col>
							</v-toolbar>
							<v-row>
								<v-col cols="12">
									<v-row class="ma-2">
										<v-col cols="11">
											<v-text-field
												v-model="carSearch"
												placeholder="ค้นหาเลขทะเบียน"
												single-line
												hide-details
												color="red"
												@keyup.enter="getCarRegister"
											></v-text-field>
										</v-col>
										<v-col cols="1" class="d-flex align-center justify-center">
											<v-icon color="red" @click="getCarRegister">mdi-magnify</v-icon>
										</v-col>
									</v-row>
								</v-col>
							</v-row>

							<v-card-text>
								<v-list>
									<v-list-item
										v-for="car in carList"
										:key="car"
										:outlined="true"
										class="boxline"
										@click="selectCar(car)"
									>
										<v-list-item-content>
											<v-list-item-content>
												{{ car.register }}
											</v-list-item-content>
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-card-text>
						</v-card>
					</v-dialog>

					<v-text-field
						v-model="VIN"
						label="เลขแชสซี"
						filled
						:rules="[numberRule]"
						:error-messages="VINErrorMessages"
						@input="hideAlertTextVINE"
					>
						<v-messages v-if="VINErrorMessages.length > 0" :error-messages="VINErrorMessages"></v-messages>
					</v-text-field>

					<v-text-field
						v-model="machineNumber"
						label="เลขเครื่อง"
						filled
						:rules="[numberRule]"
						:error-messages="machineNumberErrorMessages"
						@input="hideAlertTextmachineNum"
					>
						<v-messages
							v-if="machineNumberErrorMessages.length > 0"
							:error-messages="machineNumberErrorMessages"
						></v-messages>
					</v-text-field>

					<v-text-field
						v-model="listname"
						label="เจ้าของรถ"
						filled
						readonly
						append-icon="mdi-magnify"
						@click:append="showList = true"
					></v-text-field>
					<v-dialog v-model="showList" class="dialog-list" max-width="600">
						<v-card>
							<v-toolbar color="#CF1818">
								<v-col class="d-flex justify-space-around">
									<v-toolbar-title class="white--text">เลือกรายชื่อ</v-toolbar-title>
								</v-col>
							</v-toolbar>
							<v-row>
								<v-col cols="12">
									<v-text-field
										v-model="searchlist"
										append-icon="mdi-magnify"
										placeholder="ค้นหารายชื่อ"
										single-line
										hide-details
										color="red"
										class="ma-2"
										@click:append="getCustomerName"
										@keyup.enter="getCustomerName"
									></v-text-field>
								</v-col>
							</v-row>
							<v-card-text>
								<v-list>
									<v-list-item
										v-for="name in names"
										:key="name"
										:outlined="true"
										class="boxline"
										@click="selectName(name)"
									>
										<v-list-item-content> {{ name.Cus_Name }} {{ name.Cus_Surename }} </v-list-item-content>
									</v-list-item>
								</v-list>
							</v-card-text>
						</v-card>
					</v-dialog>

					<v-select :items="years" v-model="year_of_manufacture" label="ปีที่ผลิต" filled />
					<v-text-field type="date" v-model="delivery_date" label="วันที่ส่งมอบ" filled />
					<v-text-field v-model="carBrand" label="ยี่ห้อ" filled />
					<v-text-field v-model="sale_company" label="บริษัทที่จำหน่าย" filled />
				</div>
			</v-col>

			<v-col xs12 md6>
				<div v-if="step === 2">
					<v-text class="Textcustomer">ประเภทรถ/กลุ่มรถ</v-text>
					<hr />
					<v-text-field v-model="cargroup" label="รุ่นรถ" filled />
					<v-text-field v-model="group" label="กลุ่ม" filled />
					<v-text-field v-model="DN_numer" label="เลข DN" filled />
					<v-text-field v-model="carsize" label="ขนาด" filled />
					<v-text-field v-model="carcolor" label="สี" filled />
					<v-text-field v-model="modelsvgroup" label="กลุ่มรุ่นรถ" filled />
					<v-text-field v-model="groupmodel" label="กลุ่มรุ่น" filled />
					<v-text-field v-model="dn_code" label="D/N" filled />
				</div>
			</v-col>
			<v-col xs12 md6>
				<div v-if="step === 3">
					<v-text class="Textcustomer">Model</v-text>
					<hr />
					<v-text-field v-model="engine_model" label="Engine model" filled />
					<v-text-field v-model="model_group_sale" label="Model group sale" filled />
					<v-text-field v-model="carType" label="Gear Type" filled />
				</div>
			</v-col>

			<v-snackbar v-model="snackbar" :timeout="4000" color="red"> Please fill in required fields. </v-snackbar>

			<div class="button-wrapper">
				<v-btn
					v-if="step == 1"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="toBack"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					v-if="step == 1"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="checkStep"
					>ต่อไป</v-btn
				>

				<v-btn
					v-if="step == 2"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="prevStep"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					v-if="step == 2"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="nextStep"
					>ต่อไป</v-btn
				>

				<v-btn
					v-if="step == 3"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="prevStep"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					v-if="step == 3"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="savingdata"
					>ต่อไป</v-btn
				>
			</div>
		</v-container>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
// import store from '~/store';
export default {
	data() {
		return {
			carRegistration: '',
			isCarRegistrationValid: false,
			// textRule: value => {
			//   const textOnlyRegex = /^[a-zA-Zก-๐\s]*$/;
			//   return textOnlyRegex.test(value) || 'ใส่เฉพาะตัวอักษรเท่านั้น';
			// },
			// numberRule: value => {
			//   const numberOnlyRegex = /^\d+$/;
			//   return numberOnlyRegex.test(value) || 'ใส่เฉพาะตัวเลขเท่านั้น';
			// },
			step: 1,
			adFormats: ['นางสาว', 'นาง', 'นาย'],
			radios1: null,
			radios2: null,
			listname: '',
			carRegisteration: '',
			showList: false,
			showCarList: false,
			carList: [],
			names: [],
			years: [],
			searchlist: [],
			carSearch: '',
			carRegisterationErrorMessages: [],
			VINErrorMessages: [],
			machineNumberErrorMessages: [],
			relation: {
				cus_no: '',
				ahistory_id: '',
			},
		};
	},
	computed: {
		pageTitle() {
			return 'บันทึกข้อมูลรถ';
		},

		watch: {
			carRegistration(value) {
				if (!this.carRegisteration) {
					this.carRegisterationErrorMessages.push('กรุณากรอกข้อมูลให้ครบ');
					this.carRegisterationErrorMessages = [];
				}

				if (!this.VIN) {
					this.VINErrorMessages.push('กรุณากรอกข้อมูลให้ครบ');
					this.VINErrorMessages = [];
				}

				if (!this.machineNumber) {
					this.machineNumberErrorMessages.push('กรุณากรอกข้อมูลให้ครบ');
					this.machineNumberErrorMessages = [];
				}

				if (this.carRegisteration && this.VIN && this.machineNumber) {
					if (this.step < 3) {
						this.step++;
					}
				} else {
					this.snackbar = true;
				}
				this.isCarRegistrationValid = value.length > 0;
			},
		},

		isFormValid() {
			return this.carRegisteration && this.VIN && this.machineNumber;
		},
	},

	mounted() {
		this.getYear();
	},

	methods: {
		...mapActions(['setCar', 'getcar', 'getCarRegister']),

		getYear() {
			const currentYear = new Date().getFullYear();
			const startYear = 1900;
			const yearsArray = [];

			for (let year = currentYear; year >= startYear; year--) {
				yearsArray.push(year);
			}

			this.years = yearsArray;
		},

		handlePrependClick() {
			this.hideAlertTextcarReg();
			this.showCarList = true;
		},

		savingdata() {
			this.setCar();
			this.getcar();
			// this.setCar();
			// this.$router.push('/register/car-sum');
		},

		getcar() {
			const carsum = {
				carRegisteration: this.carRegisteration,
				VIN: this.VIN,
				machineNumber: this.machineNumber,
				ปีที่ผลิต: this.year_of_manufacture,
				วันที่ส่งมอบ: this.delivery_date,
				carBrand: this.carBrand,
				บริษัทที่จำหน่าย: this.sale_company,
				cargroup: this.cargroup,
				กลุ่ม: this.group,
				เลขDN: this.DN_numer,
				carsize: this.carsize,
				carcolor: this.carcolor,
				modelsvgroup: this.modelsvgroup,
				กลุ่มรุ่น: this.groupmodel,
				dn_code: this.dn_code,
				Enginemodel: this.engine_model,
				Modelgroupsale: this.model_group_sale,
				carType: this.carType,
				carowner: this.listname,
			};
			this.$store.dispatch('summarySet', carsum);
			this.setAhistory();
			this.setRelation();
			// console.log(this.$store.state.carsummary.carsummaryresult.carRegisteration)

			this.$router.push('/register/car-sum');
			// console.log(carsum);
		},
		// here
		async getCarRegister() {
			if (this.carSearch !== '') {
				await this.$store.dispatch('getCarRegister', this.carSearch);
				const carRegisterList = await this.$store.state.plainCarRegister.carRegister;
				this.carList = carRegisterList;
			}
		},

		async getCustomerName() {
			if (this.searchlist !== '') {
				await this.$store.dispatch('getCustomerName', this.searchlist);
				const customerNameList = await this.$store.state.plainCustomerName.nameList;
				this.names = customerNameList;
			}
		},

		setCar() {
			const Car = {
				chassis: this.VIN, // เลขแชสซี
				full_chassis: this.full_chassis, //
				full_engin: this.full_engin, // ?
				engin_id: this.machineNumber, // เลขเครื่อง
				register: this.carRegisteration, // ทะเบียน
				dn_code: this.dn_code, // D/N
				register_province: this.register_province, // fix
				carBrand: this.carBrand, // ยี่ห้อ
				carType: this.carType, // geartype
				modelsvgroup: this.modelsvgroup, // กลุ่มรุ่นรถ
				modelcd: this.modelcd, // ?
				cargroup: this.cargroup, // รุ่นรถ
				carsize: this.carsize, // ขนาด
				carcolor: this.carcolor, // สี
				cardealer: this.cardealer, // fix
				emp_id: this.emp_id, // fix
			};
			this.$store.dispatch('setCarState', Car);
		},

		checkStep() {
			this.carRegisterationErrorMessages = [];
			this.VINErrorMessages = [];
			this.machineNumberErrorMessages = [];

			if (!this.carRegisteration) {
				this.carRegisterationErrorMessages.push('กรุณากรอกข้อมูลให้ครบ');
			}

			if (!this.VIN) {
				this.VINErrorMessages.push('กรุณากรอกข้อมูลให้ครบ');
			}

			if (!this.machineNumber) {
				this.machineNumberErrorMessages.push('กรุณากรอกข้อมูลให้ครบ');
			}

			if (this.carRegisteration && this.VIN && this.machineNumber) {
				if (this.step < 3) {
					this.step++;
				}
			} else {
				this.snackbar = true;
			}
		},
		hideAlertTextcarReg() {
			this.carRegisterationErrorMessages = [];
		},
		hideAlertTextVINE() {
			this.VINErrorMessages = [];
		},
		hideAlertTextmachineNum() {
			this.machineNumberErrorMessages = [];
		},

		nextStep() {
			if (this.step < 3) {
				this.step++;
			}
		},
		prevStep() {
			if (this.step > 1) {
				this.step--;
			}
		},
		toBack() {
			this.$router.go(-1);
		},
		selectName(name) {
			this.listname = name.Cus_Name + ' ' + name.Cus_Surename;
			this.showList = false;

			this.relation.cus_no = name.CusNo;
			console.log('this.relation : ', this.relation);
		},

		setAhistory() {
			this.relation.ahistory_id = this.carRegisteration;
		},

		async setRelation() {
			if (this.relation.cus_no !== '' && this.relation.ahistory_id !== '') {
				this.$store.dispatch('setSaveAndLinkRelation', this.relation);
				const statebody = await this.$store.state.carregister.body;
				console.log('relationBody from carregister :', statebody);
			}
		},

		clearForms() {
			this.VIN = '';
			this.machineNumber = '';
			this.year_of_manufacture = '';
			this.delivery_date = '';
			this.carBrand = '';
			this.sale_company = '';
			this.listname = '';

			// Page 2
			this.cargroup = '';
			this.group = '';
			this.DN_numer = '';
			this.carsize = '';
			this.carcolor = '';
			this.modelsvgroup = '';
			this.groupmodel = '';
			this.dn_code = '';

			// Page 3
			this.engine_model = '';
			this.model_group_sale = '';
			this.carType = '';
			this.$store.dispatch('clearRelation');
		},

		async selectCar(car) {
			this.$store.dispatch('clearRelation');
			this.carRegisteration = car.register;
			await this.$store.dispatch('getCarDetail', car.car_id);
			this.relation.ahistory_id = car.car_id;
			this.showCarList = false;
			this.relation.cus_no = '';
			this.setRelation();
			this.filledFromSelect();
		},
		filledFromSelect() {
			this.VIN = this.$store.state.cardetail.carDetail.chassis; // เลขแชสซี
			this.machineNumber = this.$store.state.cardetail.carDetail.engin_id; // เลขเครื่อง
			this.year_of_manufacture = this.$store.state.cardetail.carDetail.year; // ปีผลิต
			this.delivery_date = this.$store.state.cardetail.carDetail.deliver_day; // ปีส่งมอบ
			this.carBrand = this.$store.state.cardetail.carDetail.brand_name; // ยี่ห้อ
			this.sale_company = this.$store.state.cardetail.carDetail.company_sell_name; // บริษัทที่จำหน่าย

			if (this.$store.state.cardetail.carDetail.cusNo !== '') {
				this.listname =
					this.$store.state.cardetail.customerResults.Cus_Name +
					' ' +
					this.$store.state.cardetail.customerResults.Cus_Surename;
				// +
				// ' ' +
				// this.$store.state.cardetail.customerResults.Cus_Surename;
			} else {
				this.listname = '';
			}

			// Page 2
			this.cargroup = this.$store.state.cardetail.carDetail.model;
			this.group = this.$store.state.cardetail.carDetail.group_name;
			this.DN_numer = this.$store.state.cardetail.carDetail.dn_code; // fix
			this.carsize = '';
			this.carcolor = this.$store.state.cardetail.carDetail.color_name;
			this.modelsvgroup = this.$store.state.cardetail.carDetail.ModelGroupSale;
			this.groupmodel = this.$store.state.cardetail.carDetail.fullmodel_name;
			this.dn_code = this.$store.state.cardetail.carDetail.dn_code;

			// Page 3
			this.engine_model = this.$store.state.cardetail.carDetail.enginemodel;
			this.model_group_sale = this.$store.state.cardetail.carDetail.ModelGroupSale;
			this.carType = this.$store.state.cardetail.carDetail.GearType;
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

.v-dialog {
	max-width: 600px;
	overflow-x: hidden;
	overflow-y: auto;
}

.textname-navbar {
	text-align: center;
}

.boxline {
	border: 1px solid #c5c5c5;
	border-radius: 5px;
	margin-bottom: 5px;
}
</style>
