<template>
	<div>
		<nav-title :title="pageTitle" />
		<v-container>
			<v-col xs12 md6>
				<div>
					<v-text class="Textcustomer">ข้อมูลรถ</v-text>
					<hr />
					<v-text-field v-model="register" label="ทะเบียน" outlined :readonly="!editable" />
					<v-text-field v-model="idRef_vihicle" label="เลขเครื่อง" outlined :readonly="!editable" />
					<v-text-field v-model="chassis" label="เลขแชสสี" outlined :readonly="!editable" />
					<v-btn v-if="editable" class="infoOwnerSelect" @click="showOwnerList">เลือกลูกค้าจากระบบ</v-btn>

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

					<v-text-field v-model="customerName" label="เจ้าของรถ" outlined readonly />
					<v-text-field v-model="year" label="ปีที่ผลิต" outlined :readonly="!editable" />
					<v-text-field v-model="appoint_day" label="วันที่ส่งมอบ" outlined :readonly="!editable" />
					<v-text-field v-model="brand_name" label="ยี่ห้อ" outlined :readonly="!editable" />
					<v-text-field v-model="company_sell_name" label="บริษัทที่จำหน่าย" outlined :readonly="!editable" />
				</div>

				<div>
					<v-text class="Textcustomer">ประเภทรถ/กลุ่มรถ</v-text>
					<hr />
					<v-text-field v-model="fullmodel_name" label="รุ่นรถ" outlined :readonly="!editable" />
					<v-text-field v-model="group_name" label="กลุ่ม" outlined :readonly="!editable" />
					<v-text-field v-model="dn_code" label="เลข DN" outlined :readonly="!editable" />
					<v-text-field v-model="MDL_CD" label="ขนาด" outlined :readonly="!editable" />
					<v-text-field v-model="color_name" label="สี" outlined :readonly="!editable" />
					<v-text-field v-model="agroup_id" label="กลุ่มรุ่นรถ" outlined :readonly="!editable" />
					<v-text-field v-model="group_name" label="กลุ่มรุ่น" outlined :readonly="!editable" />
					<v-text-field v-model="dn_code" label="D/N" outlined :readonly="!editable" />
				</div>

				<div>
					<v-text class="Textcustomer">Model</v-text>
					<hr />
					<v-text-field v-model="enginemodel" label="Engine model" outlined :readonly="!editable" />
					<v-text-field v-model="ModelGroupSale" label="Model group sale" outlined :readonly="!editable" />
					<v-text-field v-model="GearType" label="Gear Type" outlined :readonly="!editable" />
				</div>

				<div>
					<v-text class="Textcustomer">ประวัติการซ่อม</v-text>
					<hr />
					<v-data-table :headers="headers" :items="repairHistory" :items-per-page="5">
						<template v-slot:item="{ item }">
							<tr>
								<td v-for="(header, index) in headers" :key="index" class="column-cell">
									<template v-if="header.value === 'detailPdf' && index === headers.length - 1">
										<div class="center-content">
											<v-btn
												class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark button-wrapper-C"
												style="background-color: #58c1eb; width: 105px; color: white; padding: 3px; border-radius: 5px"
												@click="viewPDF(item.id)"
											>
												แสดง PDF
											</v-btn>
										</div>
									</template>
									<template v-else>
										{{ item[header.value] }}
									</template>
								</td>
							</tr>
						</template>
					</v-data-table>
				</div>
			</v-col>

			<div class="button-wrapper">
				<v-btn
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="toBack"
				>
					ย้อนกลับ
				</v-btn>
				<v-btn
					v-if="editable == false && fromSelect == false"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: #ed1c24; width: 95px; color: white"
					@click="toggleEdit"
				>
					{{ editable ? 'บันทึก' : 'แก้ไข' }}
				</v-btn>
				<v-btn
					v-if="editable == true || fromSelect == true"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="confirmDialog()"
				>
					แก้ไขข้อมูล
				</v-btn>

				<v-dialog v-model="dialog" persistent :max-width="300" :max-height="300">
					<!-- Dialog content -->
				</v-dialog>

				<v-dialog v-model="saveDialog" persistent :max-width="300" :max-height="300">
					<v-card>
						<v-card-title class="saveDialogMessage"> {{ dialogMessage }} </v-card-title>

						<v-card-text class="saveDialogMessage">
							<v-btn
								class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
								style="background: transparent; border: 1px solid"
								@click="closeDialog()"
								>ยกเลิก</v-btn
							>
							<v-btn
								class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
								style="background: #ed1c24; width: 95px; color: white"
								@click="contoller()"
								>ยืนยัน</v-btn
							>
						</v-card-text>
					</v-card>
				</v-dialog>

				<v-dialog v-model="alertDialog" persistent :max-width="300" :max-height="300">
					<v-card>
						<v-card-title class="saveDialogMessage"> {{ dialogMessage }} </v-card-title>

						<v-card-text class="saveDialogMessage">
							<v-btn
								class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
								style="background: transparent; border: 1px solid"
								@click="closeDialog()"
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
			showList: false,
			dialog: false,
			saveDialog: false,
			editable: false,
			validatestate: true,
			fromSelect: false,
			alertDialog: false,
			carResults: {},
			customerResult: {
				CusNo: '',
				Date_Receive: '',
				CusNo_Old: '',
				Picture: '',
				Be: '',
				BeType: '',
				company_type: '',
				Cus_Name: '',
				Cus_Surename: '',
				Cus_Nickname: '',
				cus_branch_id: '',
				cus_branch_txt: '',
				Cus_Big_Picture: '',
				Cus_Small_Picture: '',
				Sex: '',
				DateOfBirth: '',
				Cus_IDNo: '',
				Primary_Edu: '',
				Secondary_Edu: '',
				Highschool_Edu: '',
				Bachelor: '',
				Master: '',
				Phd: '',
				Status: '',
				mary_id: '',
				C_copy: '',
				C_Add: '',
				C_Vill: '',
				C_Tum: '',
				C_Amp: '',
				C_Pro: '',
				C_GEO: '',
				C_Code: '',
				C_AddGPSLatitude: '',
				C_AddGPSLongtitude: '',
				C_AddMapDescribe: '',
				Cus_Coppy: '',
				Cus_Add: '',
				Cus_Vil: '',
				Cus_Tum: '',
				Cus_Amp: '',
				Cus_Pro: '',
				Cus_GEO: '',
				Cus_Code: '',
				Cus_AddGPSLatitude: '',
				Cus_AddGPSLongtitude: '',
				Cus_AddMapDescribe: '',
				NotMail: '',
				H_Tel: '',
				JobID: '',
				Job: '',
				JobSegmentGroup: '',
				Job_Des: '',
				W_Name: '',
				Title: '',
				W_Coppy: '',
				W_Add: '',
				W_Vill: '',
				W_Tum: '',
				W_Amp: '',
				W_Pro: '',
				W_GEO: '',
				W_Code: '',
				W_Tel: '',
				W_Fax: '',
				W_Email: '',
				Cus_WGPSLatitude: '',
				Cus_WGPSLongtitude: '',
				Cus_WMapDescribe: '',
				Pagger: '',
				M_Tel: '',
				Email: '',
				Cus_Type: '',
				Data_Received: '',
				Data_Received_Num: '',
				Remark: '',
				Updater: '',
				UpdaterNO: '',
				UpdateT: '',
				Resperson: '',
				Resperson_posCode: '',
				respon_date: '',
				Time_for_talk: '',
				Pleasure_value: '',
				rcheck: '',
				cleansing_status: '',
				cleansing_date: '',
				status_up: '',
				Primary_Edu_Detail: '',
				Secondary_Edu_Detail: '',
				Highschool_Edu_Detail: '',
				Bachelor_Detail: '',
				Master_Detail: '',
				Phd_Detail: '',
			},
			customerName: '',
			commitStatus: '',
			dialogMessage: '',
			names: [],
			headers: [
				{
					text: 'ศูนย์บริการ',
					value: 'branch_id',
					align: 'center black--text',
					sortable: false,
					divider: true,
					class: 'red lighten-1 white--text',
				},
				{
					text: 'เลขที่ใบซ่อม',
					value: 'cvhc_main_id',
					align: 'center black--text',
					sortable: false,
					divider: true,
					class: 'red lighten-1 white--text',
				},
				{
					text: 'วันที่รับรถเข้า',
					value: 'start_time_vhc',
					align: 'center black--text',
					sortable: false,
					divider: true,
					class: 'red lighten-1 white--text',
				},
				{
					text: 'วันที่ส่งรถออก',
					value: null,
					align: 'center black--text',
					sortable: false,
					divider: true,
					class: 'red lighten-1 white--text',
				},
				{
					text: 'สถานะ',
					value: 'is_complete',
					align: 'center black--text',
					sortable: false,
					divider: true,
					class: 'red lighten-1 white--text',
				},
				{
					text: 'Action',
					value: 'detailPdf',
					align: 'center black--text',
					sortable: false,
					divider: true,
					class: 'red lighten-1 white--text',
				},
			],
			repairHistory: [
				{
					id: '',
					vhc_date: '',
					vhc_time: '',
					ahistory_id: '',
					amodel_id: '',
					model_name: '',
					mile_in: '',
					running_queue: '',
					vhc_model_id: '',
					cus_id: '',
					engin_id: '',
					chassis: '',
					comment: '',
					time_delivery: '',
					start_time_vhc: '',
					end_time_vhc: '',
					clocking_time_vhc: '',
					is_body_damage: '',
					PDF_file: '',
					record_status: '',
					create_by: '',
					update_by: '',
					create_date: '',
					update_date: '',
					branch_id: '',
					cvhc_main_id: '',
					customer_signature: '',
					sa_vhc_signature: '',
					customer_recieve_signature: '',
					sa_delivery_signature: '',
					radio_pole: '',
					hbg_sticker: '',
					hbg_sticker_current: '',
					blame_rainy: '',
					blame_dust: '',
					blame_drop: '',
					cus_type: '',
					is_complete: '',
					path_customer_signature: '',
					path_sa_signature: '',
				},
			],
		};
	},
	computed: {
		pageTitle() {
			return this.editable ? 'แก้ไขข้อมูลรถ' : 'ข้อมูลรถ';
		},
	},
	mounted() {
		this.carResults = this.$store.state.cardetail.carResults;
		this.customerResult = this.$store.state.cardetail.customerResults;
		this.setCarDetail();
		this.getRepairHistory();
	},

	methods: {
		setCustomerName() {
			console.log('CusResult : ', this.customerResult);
			if (
				this.customerResult.Cus_Name !== undefined &&
				this.customerResult.Cus_Name !== '' &&
				this.customerResult.Cus_Name !== null
			) {
				this.customerName = this.customerResult.Cus_Name + ' ' + this.customerResult.Cus_Surename;
			} else {
				this.customerName = 'ไม่มีเจ้าของ';
			}
		},

		async getRepairHistory() {
			await this.$store.dispatch('getVhcHistory', this.carResults.id);
			const vhcResult = this.$store.state.vhcHistory.vhcHistoryResult;
			this.repairHistory = vhcResult;
			console.log('vhcHistory : ', this.repairHistory);
		},

		viewPDF(vhcMainid) {
			if (vhcMainid) {
				console.log(vhcMainid);
				this.$router.push({
					path: '/pdf/pdf',
					query: { id: 'VHC-' + vhcMainid + '.pdf' },
				});
			} else {
				// Error Dialog
			}
		},
		toggleEdit() {
			this.editable = !this.editable;
		},
		toBack() {
			this.$router.go(-1);
		},
		editCar() {
			const updateCarDetail = {
				register: this.register,
				idRef_vihicle: this.idRef_vihicle,
				chassis: this.chassis,
				year: this.year,
				appoint_day: this.appoint_day,
				MDL_CD: this.MDL_CD,
				brand_name: this.brand_name,
				company_sell_name: this.company_sell_name,
				fullmodel_name: this.fullmodel_name,
				group_name: this.group_name,
				dn_code: this.dn_code,
				color_name: this.color_name,
				agroup_id: this.agroup_id,
				enginemodel: this.enginemodel,
				ModelGroupSale: this.ModelGroupSale,
				GearType: this.GearType,
			};
			const updatedObject = { ...this.carResults, ...updateCarDetail };
			console.log('begin edit with :', updatedObject);

			this.$store.dispatch('editCarDetail', updatedObject);
			this.editable = false;
		},

		setCarDetail() {
			// console.log('call on ', this.carResults);
			// this.customerName = this.customerResult.Cus_Name + ' ' + this.customerResult.Cus_Surename;
			this.setCustomerName();
			this.register = this.carResults.register;
			this.idRef_vihicle = this.carResults.idRef_vihicle;
			this.chassis = this.carResults.chassis;
			this.MDL_CD = this.carResults.MDL_CD;
			this.year = this.carResults.year;
			this.appoint_day = this.carResults.appoint_day;
			this.brand_name = this.carResults.brand_name;
			this.company_sell_name = this.carResults.company_sell_name;
			this.fullmodel_name = this.carResults.fullmodel_name;
			this.group_name = this.carResults.group_name;
			this.dn_code = this.carResults.dn_code;
			this.color_name = this.carResults.color_name;
			this.agroup_id = this.carResults.agroup_id;
			this.enginemodel = this.carResults.enginemodel;
			this.ModelGroupSale = this.carResults.ModelGroupSale;
			this.GearType = this.carResults.GearType;

			this.editable = false;
		},

		showOwnerList() {
			this.showList = true;
			console.log('showOwnerList called');
		},

		async getCustomerName() {
			if (this.searchlist !== '') {
				await this.$store.dispatch('getCustomerName', this.searchlist);
				const customerNameList = await this.$store.state.plainCustomerName.nameList;
				this.names = customerNameList;
			}
		},

		async selectName(name) {
			this.showList = false;
			this.fromSelect = true;
			this.editable = false;
			this.setCarDetail();

			await this.$store.dispatch('setCustomerInfo', name.CusNo);
			const store = await this.$store.state.customerinfo.customerResults;
			this.customerResult = store;

			this.customerName = this.customerResult.Cus_Name + ' ' + this.customerResult.Cus_Surename;
		},

		tranfersCarOwner() {
			if (this.fromSelect === true) {
				this.commitStatus = 'realation';
				this.saveRelation();
			}
		},

		async saveRelation() {
			console.log('saveRelation called');
			let relationBody = {
				cus_no: '',
				ahistory_id: '',
			};

			if (this.customerResults !== '') {
				relationBody = { cus_no: this.customerResult.CusNo, ahistory_id: this.carResults.id };
			} else {
				relationBody = { cus_no: this.cusNo, ahistory_id: this.carResults.id };
			}
			// check if body correct then make relation
			if (typeof relationBody.cus_no !== 'undefined' && typeof relationBody.ahistory_id !== 'undefined') {
				await this.$store.dispatch('setRelation', relationBody);
				await this.$store.dispatch('linkownertocar');
				this.$store.dispatch('clearRelation');

				// check if success
				const status = this.$store.state.carRelation.status;
				if (status === true) {
					this.alertDialog = true;
					this.dialogMessage = 'บันทึกเสร็จสิ้น';
				} else {
					this.alertDialog = true;
					this.dialogMessage = 'บันทึกไม่สำเร็จ';
				}
				// this.alertDialog = true;
			}
		},

		confirmDialog() {
			console.log('fromselect : ', this.fromSelect);
			if (this.fromSelect === true) {
				this.dialogMessage = 'คุณต้องการเปลี่ยนเจ้าของรถยนต์ ' + this.carResults.register + ' ใช่หรือไม่';
				this.saveDialog = true;
			}

			if (this.fromSelect === false) {
				this.dialogMessage = 'คุณต้องการแก้ไขข้อมูลรถยนต์ ' + this.carResults.register + ' ใช่หรือไม่';
				this.saveDialog = true;
			}
		},

		contoller() {
			if (this.fromSelect === true) {
				this.commitStatus = 'realation';
				this.tranfersCarOwner();
				this.closeDialog();
				this.editable = false;
				this.fromSelect = false;
			}

			if (this.fromSelect === false) {
				this.commitStatus = 'editCar';
				console.log('commitStatus : ', this.commitStatus);
				if (this.validatestate === true) {
					this.editCar();
					this.closeDialog();
					this.editable = false;
					this.fromSelect = false;
				} else {
					console.log('fail');
					this.closeDialog();
					this.editable = false;
					this.fromSelect = false;
				}
			}
		},

		closeDialog() {
			this.saveDialog = false;
			this.alertDialog = false;
		},
	},
};
</script>

<style>
.button-wrapper-T {
	padding: 3px;
	margin-left: 1px;
	background-color: rgb(106, 228, 106);
}

.button-wrapper-C {
	padding: 3px;
	margin: 0 auto;
	/* Center the button horizontally */
	background-color: #f93b3b;
}

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
}

.btn-distance {
	display: flex;
	justify-content: center;
}

.infoOwnerSelect {
	margin-bottom: 20px;
	flex: auto;
	background-color: rgb(27, 200, 131) !important;
	color: white !important;
}
.column-cell {
	border-right: 1px solid #ddd; /* เส้นแบ่งคอลัมน์ */
	padding: 10px; /* ปรับขอบของแต่ละ cell */
}

.center-content {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
}
</style>
