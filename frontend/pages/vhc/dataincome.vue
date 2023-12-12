<template>
	<div>
		<nav-title :title="pageTitle" />
		<v-container>
			<v-col xs12 md6>
				<div>
					<v-row justify="end" align="center">
						<v-col cols="left">
							<v-text class="Textcustomer">ข้อมูลลูกค้า</v-text>
						</v-col>
						<v-col cols="3">
							<v-text-field
								:value="getCurrentDate()"
								label="วันที่"
								readonly
								small
								dense
								class="smallText"
							></v-text-field>
						</v-col>
						<v-col cols="3">
							<v-text-field
								:value="getCurrentTime()"
								label="เวลา"
								readonly
								small
								dense
								class="smallText"
							></v-text-field>
						</v-col>
					</v-row>
					<hr />
				</div>

				<br />
				<v-card>
					<v-row>
						<v-col xs6>
							<v-select
								class="card-with-marginfront"
								label="คำนำหน้า"
								:items="Title"
								:error-messages="nameTitleErrorMessages"
								:value="$store.state.vhcUploadStep.userDetail.Be"
								:readonly="!editable"
							>
								<v-messages
									v-if="nameTitleErrorMessages.length > 0"
									:error-messages="nameTitleErrorMessages"
								></v-messages>
							</v-select>
						</v-col>
						<v-col xs6>
							<v-text-field
								label="ชื่อ"
								:rules="[textRule]"
								:error-messages="FirstnameErrorMessages"
								:value="$store.state.vhcUploadStep.userDetail.Cus_Name"
								:readonly="!editable"
							>
								<v-messages
									v-if="FirstnameErrorMessages.length > 0"
									:error-messages="FirstnameErrorMessages"
								></v-messages>
							</v-text-field>
						</v-col>
						<v-col xs6>
							<v-text-field
								class="card-with-marginback"
								label="นามสกุล"
								:rules="[textRule]"
								:error-messages="LastnameErrorMessages"
								:value="$store.state.vhcUploadStep.userDetail.Cus_Surename"
								:readonly="!editable"
							>
								<v-messages
									v-if="LastnameErrorMessages.length > 0"
									:error-messages="LastnameErrorMessages"
								></v-messages>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row> </v-row>
					<v-row>
						<v-col xs6>
							<v-text-field
								class="card-with-marginfront"
								label="เบอร์โทร"
								:rules="[numberRule]"
								:value="$store.state.vhcUploadStep.userDetail.M_Tel"
								:readonly="!editable"
							/>
						</v-col>
						<v-col xs6>
							<v-text-field class="card-with-marginback" label="วันเกิด" :value="formattedDate" :readonly="!editable" />
						</v-col>
					</v-row>
					<br />
				</v-card>
				<br />
				<v-text class="Textcustomer">ข้อมูลรถ</v-text>
				<hr />
				<br />
				<v-card>
					<v-row
						><v-col xs6>
							<v-text-field
								class="card-with-marginfront"
								label="ทะเบียน"
								:readonly="!editable"
								:value="$store.state.vhcUploadStep.userDetail.register"
							/>
						</v-col>
						<v-col xs6>
							<v-text-field
								class="card-with-marginback"
								label="รุ่นรถ"
								:readonly="!editable"
								:value="$store.state.vhcUploadStep.userDetail.fullmodel_name"
							/>
						</v-col>
					</v-row>
					<v-row
						><v-col xs6>
							<v-text-field
								class="card-with-marginfront"
								label="เลขเครื่อง"
								:readonly="!editable"
								:value="$store.state.vhcUploadStep.userDetail.idRef_vihicle"
						/></v-col>
						<v-col xs6
							><v-text-field
								class="card-with-marginback"
								label="เลขแชสสี"
								:readonly="!editable"
								:value="$store.state.vhcUploadStep.userDetail.color_id"
						/></v-col>
					</v-row>

					<v-select
						v-model="modelCar"
						class="card-with-marginfront-back"
						label="* Model รถยนต์"
						:items="Model"
						:error-messages="ModelErrorMessages"
						@input="hideAlertTextModel"
					>
						<v-messages v-if="ModelErrorMessages.length > 0" :error-messages="ModelErrorMessages"></v-messages>
					</v-select>

					<v-text-field
						v-model="MileCar"
						class="card-with-marginfront-back"
						label="* เลขกิโลเมตร"
						maxlength="10"
						:rules="[numberRule, digitLimitRule]"
						:error-messages="MileErrorMessages"
						inputmode="numeric"
						@input="hideAlertTextMile"
					>
						<v-messages v-if="MileErrorMessages.length > 0" :error-messages="MileErrorMessages"></v-messages>
					</v-text-field>

					<v-select
						v-model="idCard"
						class="card-with-marginfront-back"
						label="* ลูกค้านัดหมาย"
						:items="CardType"
						:error-messages="IDCardErrorMessages"
						@input="hideAlertTextType"
					>
						<v-messages v-if="IDCardErrorMessages.length > 0" :error-messages="IDCardErrorMessages"></v-messages>
					</v-select>
				</v-card>
				<br />
			</v-col>

			<v-snackbar v-model="snackbar" :timeout="2000" color="red"> กรุณากรอกข้อมูลให้ครบ </v-snackbar>
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
					@click="checkStep1"
					>ต่อไป</v-btn
				>
			</div>
		</v-container>
	</div>
</template>

<script>
export default {
	data() {
		return {
			editable: false,
			textRule: (value) => {
				const textOnlyRegex = /^[a-zA-Zก-๐\s]*$/;
				return textOnlyRegex.test(value) || 'ใส่เฉพาะตัวอักษรเท่านั้น';
			},
			numberRule: (value) => {
				const numberOnlyRegex = /^\d+$/;
				return numberOnlyRegex.test(value) || 'ใส่เฉพาะตัวเลขเท่านั้น';
			},
			step: 1,
			Title: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ'],
			CardType: ['ลูกค้าทั่วไป', 'ลูกค้านัดหมาย'],
			Model: ['spark(หัวเดี่ยว)', 'space cab(แค็ป)', 'Cab 4(4 ประตู)', 'SUV(รถนั่งเอนกประสงค์)'],
			nameTitleErrorMessages: [],
			FirstnameErrorMessages: [],
			LastnameErrorMessages: [],
			IDCardErrorMessages: [],
			ModelErrorMessages: [],
			MileErrorMessages: [],

			DateOfBirth: null,
			snackbar: false,
			cardnumber: null,
			radios1: null,
			radios2: null,
		};
	},

	// $store.state.customerinfo.customerResults

	created() {
		console.log(this.getCurrentDate());
		console.log(this.$store.state.vhcUploadStep.userDetail);
		// console.log(this.$store.state.vhcUploadStep.carDetail);
	},

	computed: {
		formattedDate() {
			if (this.$store.state.vhcUploadStep.userDetail.DateOfBirth) {
				const [year, month, day] = this.$store.state.vhcUploadStep.userDetail.DateOfBirth.split('-');
				return `${day}-${month}-${year}`;
			}
			return 'ไม่พบข้อมูล';
		},
		pageTitle() {
			return 'ข้อมูลเบื้องต้น';
		},
		modelCarError() {
			return this.ModelErrorMessages.length > 0 && !this.modelCar;
		},
	},

	mounted() {
		this.$store.dispatch('setcarinfo');
	},

	methods: {
		getCurrentDate() {
			const currentDate = new Date();
			return currentDate.toLocaleDateString();
		},
		getCurrentTime() {
			const currentTime = new Date();
			return currentTime.toLocaleTimeString();
		},
		hideAlertTextType() {
			this.IDCardErrorMessages = [];
		},
		hideAlertTextMile() {
			this.MileErrorMessages = [];
		},
		hideAlertTextModel() {
			this.ModelErrorMessages = [];
		},

		checkStep1() {
			this.IDCardErrorMessages = [];
			this.ModelErrorMessages = [];
			this.MileErrorMessages = [];

			let hasError = false;

			if (!this.idCard) {
				this.IDCardErrorMessages.push('กรุณาเลือกประลูกค้า');
				hasError = true;
				this.isidCardFilled = false;
			} else {
				this.isidCardFilled = true;
			}

			if (!this.modelCar) {
				this.ModelErrorMessages.push('กรุณาเลือก Model รถยนต์');
				hasError = true;
				this.isModelCarFilled = false;
			} else {
				this.isModelCarFilled = true;
			}

			if (!this.MileCar) {
				this.MileErrorMessages.push('กรุณากรอกเลขกิโลเมตร');
				hasError = true;
				this.isMileCarFilled = false;
			} else {
				this.isMileCarFilled = true;
			}

			if (hasError) {
				this.snackbar = true;
			} else {
				// Data is correct, hide the alert and navigate to the next step
				this.snackbar = false;

				const dataAdditional = {
					model: this.modelCar,
					mile: this.MileCar,
					idCard: this.idCard,
				};

				this.$store.dispatch('setCarDetail', dataAdditional);

				this.$router.push('/vhc/vhc-upload-picture');
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
	},
};
</script>
<style>
.card-with-marginfront-back {
	margin-left: 20px;
	margin-right: 20px;
}
.card-with-marginfront {
	margin-left: 20px;
}
.card-with-marginback {
	margin-right: 20px;
}

.button-wrapper {
	text-align: center;
}

.Textcustomer {
	font-weight: bold;
}

hr {
	border: 1px solid black;
	height: 1px;
	/* Set the hr color */
}

.mailAddrCopyIDAddr {
	margin-right: 30px;
}

.picture-distance {
	display: flex;
	justify-content: center;
	align-items: center;
}
.date-col {
	display: flex;
	align-items: center;
}

.time-col {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.custom-text-fields {
	display: flex;
	align-items: center;
}

.smallText {
	font-size: 14px;
	padding: 1px;
}
</style>
