<template>
	<div>
		<nav-title :title="pageTitle" />
		<v-container>
			<v-col xs12 md6>
				<div>
					<v-text class="Textcustomer">รูปภาพลูกค้า</v-text>
					<br />
					<div class="picture-distance">
						<upload-picture />
					</div>
					<br />
					<v-row>
						<v-col xs6>
							<v-text-field label="ชื่อ" outlined readonly :value="informationField.Cus_Name" />
						</v-col>
						<v-col xs6>
							<v-text-field label="นามสกุล" outlined readonly :value="informationField.Cus_Surename" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="ชื่อเล่น" outlined readonly :value="informationField.Cus_Nickname" />
						</v-col>
						<v-col xs6>
							<v-text-field label="เพศ" outlined readonly :value="informationField.Sex" />
						</v-col>
					</v-row>
					<v-text-field label="ประเภทลูกค้า" outlined readonly :value="informationField.Cus_Type" />
					<v-text-field label="สถานะภาพ" outlined readonly :value="informationField.Status" />
					<v-text-field label="บัตรประชาชน" outlined readonly :value="informationField.Cus_IDNo" />
					<v-text-field label="วัน/เดือน/ปี เกิด" outlined readonly :value="informationField.DateOfBirth" />
					<v-text-field label="ระดับลูกค้า" outlined readonly :value="informationField.Betype" />
					<v-text-field label="ข้อมูลเพิ่มเติม" outlined readonly :value="informationField.Job_Des" />
					<v-text-field label="เบอร์โทร" outlined readonly :value="informationField.M_Tel" />
					<v-text-field label="อีเมล" outlined readonly :value="informationField.Email" />
					<v-text-field label="พนักงานรับข้อมูล" outlined readonly :value="informationField.Updater" />

					<v-text class="Textcustomer">ข้อมูลส่วนตัว</v-text>
					<v-text-field label="ม.ต้น" outlined readonly :value="informationField.Secondary_Edu" />
					<v-text-field label="หมายเหตุ" outlined readonly :value="informationField.Secondary_Edu_Detail" />
					<v-text-field label="ม.ปลาย" outlined readonly :value="informationField.Highschool_Edu" />
					<v-text-field label="หมายเหตุ" outlined readonly :value="informationField.Highschool_Edu_Detail" />
					<v-text-field label="ปริญญาตรี" outlined readonly :value="informationField.Bachelor" />
					<v-text-field label="หมายเหตุ" outlined readonly :value="informationField.Bachelor_Detail" />
					<v-text-field label="ปริญญาโท" outlined readonly :value="informationField.Master" />
					<v-text-field label="หมายเหตุ" outlined readonly :value="informationField.Master_Detail" />
					<v-text-field label="ปริญญาเอก" outlined readonly :value="informationField.Phd" />
					<v-text-field label="หมายเหตุ" outlined readonly :value="informationField.Phd_Detail" />

					<v-text-field label="อาชีพ" outlined readonly :value="informationField.Job" />
					<v-text-field label="ส่วนขยายอาชีพ" outlined readonly :value="informationField.Job_Des" />

					<v-text class="Textcustomer">ข้อมูลที่อยู่ตามบัตรประชาชน</v-text>
					<hr />
					<v-row>
						<v-col xs6>
							<v-text-field label="ภาค" outlined readonly :value="informationField.C_GEO" />
						</v-col>
						<v-col xs6>
							<v-text-field label="จังหวัด" outlined readonly :value="informationField.C_Pro" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="อำเภอ" outlined readonly :value="informationField.C_Amp" />
						</v-col>
						<v-col xs6>
							<v-text-field label="ตำบล" outlined readonly :value="informationField.C_Tum" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="หมู่บ้าน" outlined readonly :value="informationField.C_Vill" />
						</v-col>
						<v-col xs6>
							<v-text-field label="บ้านเลขที่" outlined readonly :value="informationField.C_Add" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="ละติจูด" outlined readonly :value="informationField.C_AddGPSLatitude" />
						</v-col>
						<v-col xs6>
							<v-text-field label="ลองจิจูด" outlined readonly :value="informationField.C_AddGPSLongtitude" />
						</v-col>
					</v-row>
					<v-text-field label="รหัสไปรษณีย์" outlined readonly :value="informationField.C_Code" />
					<v-text-field label="อธิบายแผนที่" outlined readonly :value="informationField.C_AddMapDescribe" />
					<v-text class="Textcustomer">ข้อมูลที่อยู่ที่ทำงาน</v-text>
					<hr />
					<v-row>
						<v-col xs6>
							<v-text-field label="ภาค" outlined readonly :value="informationField.W_GEO" />
						</v-col>
						<v-col xs6>
							<v-text-field label="จังหวัด" outlined readonly :value="informationField.W_Pro" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="อำเภอ" outlined readonly :value="informationField.W_Amp" />
						</v-col>
						<v-col xs6>
							<v-text-field label="ตำบล" outlined readonly :value="informationField.W_Tum" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="หมู่บ้าน" outlined readonly :value="informationField.W_Vill" />
						</v-col>
						<v-col xs6>
							<v-text-field label="บ้านเลขที่" outlined readonly :value="informationField.W_Add" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="ละติจูด" outlined readonly :value="informationField.Cus_AddGPSLatitude" />
						</v-col>
						<v-col xs6>
							<v-text-field label="ลองจิจูด" outlined readonly :value="informationField.W_AddGPSLongtitude" />
						</v-col>
					</v-row>
					<v-text-field label="รหัสไปรษณีย์" outlined readonly :value="informationField.W_Code" />
					<v-text-field label="อธิบายแผนที่" outlined readonly :value="informationField.W_AddMapDescribe" />
					<v-text class="Textcustomer">ข้อมูลที่อยู่ส่งเอกสาร</v-text>
					<hr />
					<v-row>
						<v-col xs6>
							<v-text-field label="ภาค" outlined readonly :value="informationField.Cus_GEO" />
						</v-col>
						<v-col xs6>
							<v-text-field label="จังหวัด" outlined readonly :value="informationField.Cus_Pro" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="อำเภอ" outlined readonly :value="informationField.Cus_Amp" />
						</v-col>
						<v-col xs6>
							<v-text-field label="ตำบล" outlined readonly :value="informationField.Cus_Tum" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="หมู่บ้าน" outlined readonly :value="informationField.Cus_Vill" />
						</v-col>
						<v-col xs6>
							<v-text-field label="บ้านเลขที่" outlined readonly :value="informationField.Cus_Add" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field label="ละติจูด" outlined readonly :value="informationField.Cus_AddGPSLatitude" />
						</v-col>
						<v-col xs6>
							<v-text-field label="ลองจิจูด" outlined readonly :value="informationField.Cus_AddGPSLongtitude" />
						</v-col>
					</v-row>
					<v-text-field label="รหัสไปรษณีย์" outlined readonly :value="informationField.Cus_Code" />
					<v-text-field label="อธิบายแผนที่" outlined readonly :value="informationField.Cus_AddMapDescribe" />
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
					@click="saveRegister"
					>บันทึก</v-btn
				>
				<v-dialog v-model="dialog" persistent :max-width="300" :max-height="300">
					<v-card>
						<v-card-title class="text-dialog">บันทึกรายการสำเร็จ</v-card-title>
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

				<v-dialog v-model="duplicateDialog" persistent :max-width="300" :max-height="300">
					<v-card>
						<v-card-title class="text-dialog">ทำรายการล้มเหลว<br />เลขบัตรประจำตัวประชาชนซ้ำ</v-card-title>
						<v-card-text class="btn-distance">
							<v-btn
								class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
								style="background: #ed1c24; width: 95px; color: white"
								@click="duplicateDialog = false"
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
// import store from '~/store';
export default {
	data() {
		return {
			dialog: false,
			duplicateDialog: false,
			adFormats: ['นางสาว', 'นาง', 'นาย'],
			radios1: null,
			radios2: null,

			informationField: {
				Be: '',
				Betype: '',
				Cus_Name: '',
				Cus_Surename: '',
				Cus_Nickname: '',
				Sex: '',
				DateOfBirth: '',
				Cus_IDNo: '',
				mary_id: '',
				Updater: '',
				Cus_Type: '',
				M_Tel: '',
				Status: '',
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
				Cus_copy: '',
				Cus_Add: '',
				Cus_Vill: '',
				Cus_Tum: '',
				Cus_Amp: '',
				Cus_Pro: '',
				Cus_GEO: '',
				Cus_Code: '',
				Cus_AddGPSLatitude: '',
				Cus_AddGPSLongtitude: '',
				Cus_AddMapDescribe: '',
				W_copy: '',
				W_Add: '',
				W_Vill: '',
				W_Tum: '',
				W_Amp: '',
				W_Pro: '',
				W_GEO: '',
				W_Code: '',
				W_AddGPSLatitude: '',
				W_AddGPSLongtitude: '',
				W_AddMapDescribe: '',
				W_Name: '',
				Title: '',
				Email: '',
				Primary_Edu: '',
				Secondary_Edu: '',
				Secondary_Edu_Detail: '',
				Highschool_Edu: '',
				Highschool_Edu_Detail: '',
				Bachelor: '',
				Bachelor_Detail: '',
				Master: '',
				Master_Detail: '',
				Phd: '',
				Phd_Detail: '',
				JobID: '',
				Job: '',
				Job_Des: '',
			},
		};
	},
	computed: {
		pageTitle() {
			return 'สรุปข้อมูลลูกค้า';
		},
	},
	mounted() {
		this.informationField = this.$store.state.customersummary.customerSumResult;
		console.log(this.informationField);
	},

	methods: {
		async saveRegister() {
			await this.$store.dispatch('registerCustomer');

			const duplicate = await this.$store.state.customersummary.duplicate;

			if (duplicate === true) {
				this.duplicateDialog = true;
			} else {
				this.duplicateDialog = false;
				this.dialog = true;
			}
		},

		toBack() {
			this.$router.go(-1);
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
	margin-bottom: 15px;
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
.picture-distance {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
