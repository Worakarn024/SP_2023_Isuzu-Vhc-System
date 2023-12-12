<template>
	<div>
		<nav-title :title="pageTitle" />
		<v-container>
			<v-stepper v-model="step">
				<v-stepper-header>
					<v-stepper-step step="1" color="red">ข้อมูลผู้ใช้</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="2" color="red">ประวัติการศึกษา/อาชีพ</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="3" color="red">ข้อมูลที่อยู่</v-stepper-step>
				</v-stepper-header>
			</v-stepper>
			<v-col xs12 md6>
				<div v-if="step === 1">
					<v-text class="Textcustomer">รูปภาพลูกค้า</v-text>
					<hr />
					<br />
					<div class="picture-distance">
						<upload-picture />
					</div>
					<br />
					<v-text class="Textcustomer">ข้อมูลส่วนตัว</v-text>
					<hr />
					<br />
					<v-select
						v-model="nameTitle"
						label="* คำนำหน้า"
						filled
						:items="Title"
						:error-messages="nameTitleErrorMessages"
					>
						<v-messages v-if="nameTitleErrorMessages.length > 0" :error-messages="nameTitleErrorMessages"></v-messages>
					</v-select>
					<v-row>
						<v-col xs6>
							<v-text-field
								v-model="firstName"
								label="* ชื่อ"
								filled
								:rules="[textRule]"
								:error-messages="FirstnameErrorMessages"
								@blur="validateFirstName"
							>
								<v-messages
									v-if="FirstnameErrorMessages.length > 0"
									:error-messages="FirstnameErrorMessages"
								></v-messages>
							</v-text-field>
						</v-col>
						<v-col xs6>
							<v-text-field
								v-model="lastName"
								label="* นามสกุล"
								filled
								:rules="[textRule]"
								:error-messages="LastnameErrorMessages"
								@blur="validateLastname"
							>
								<v-messages
									v-if="LastnameErrorMessages.length > 0"
									:error-messages="LastnameErrorMessages"
								></v-messages>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field v-model="nickname" label="ชื่อเล่น" filled :rules="[textRule]" />
						</v-col>
						<v-col xs6>
							<v-select v-model="gender" label="เพศ" filled :items="genders" />
						</v-col>
					</v-row>
					<v-select
						v-model="customerType"
						label="* ประเภทลูกค้า"
						filled
						:items="TypeList"
						:error-messages="CustomerTypeErrorMessages"
					>
						<v-messages
							v-if="CustomerTypeErrorMessages.length > 0"
							:error-messages="CustomerTypeErrorMessages"
						></v-messages>
					</v-select>
					<v-select
						v-model="idCard"
						label="* ประเภทเลขบัตร"
						filled
						:items="CardType"
						:error-messages="IDCardErrorMessages"
					>
						<v-messages v-if="IDCardErrorMessages.length > 0" :error-messages="IDCardErrorMessages"></v-messages>
					</v-select>
					<v-text-field
						v-model.number="cardnumber"
						label="บัตรประชาชน"
						filled
						:rules="[numberRule]"
						:error-messages="CitizenIdErrorMessages"
						maxlength="13"
						@blur="validateCitizenId(cardnumber)"
					/>
					<v-select v-model="Status" label="สถานภาพ" filled :items="status" />
					<v-text-field v-model="DateOfBirth" type="date" label="วัน/เดือน/ปี เกิด" filled />
					<v-select v-model="cuslevel" label="ระดับลูกค้า" filled :items="rankcustomer" />
					<v-text-field v-model="Addinfo" label="ข้อมูลเพิ่มเติม" filled />

					<v-text-field
						v-model="phone"
						label="* เบอร์โทร"
						filled
						:rules="[numberRule]"
						maxlength="10"
						:error-messages="PhoneErrorMessages"
						@blur="validatePhone"
					>
						<v-messages
							v-if="PhoneErrorMessages.length > 0 || PhoneErrorMessages.length !== 10"
							:error-messages="PhoneErrorMessages"
						></v-messages>
					</v-text-field>

					<v-text-field
						v-model="email"
						label="* อีเมล"
						filled
						:rules="[rules.email]"
						:error-messages="EmailErrorMessages"
						@blur="validateEmail"
					>
						<v-messages v-if="EmailErrorMessages.length > 0" :error-messages="EmailErrorMessages"></v-messages>
					</v-text-field>

					<v-text-field v-model="Updater" label="พนักงานรับข้อมูล" filled :rules="[textRule]" />
				</div>
			</v-col>

			<v-col xs12 md6>
				<div v-if="step === 2">
					<v-text class="Textcustomer">ข้อมูลส่วนตัว</v-text>
					<hr />
					<br />
					<v-text-field v-model="Secondary_Edu" label="ม.ต้น" filled />
					<v-text-field
						v-model="Secondary_EduDetail"
						label="ข้อมูลเพิ่มเติม ม.ต้น"
						filled
						:error-messages="Secondary_EduDetailErrorMessages"
					/>
					<v-text-field v-model="Highschool_Edu" label="ม.ปลาย" filled />
					<v-text-field
						v-model="Highschool_EduDetail"
						label="ข้อมูลเพิ่มเติม ม.ปลาย"
						filled
						:error-messages="Highschool_EduDetailErrorMessages"
					/>
					<v-text-field v-model="Bachelor" label="ปริญญาตรี" filled />
					<v-text-field
						v-model="BachelorDetail"
						label="ข้อมูลเพิ่มเติม  ปริญญาตรี"
						filled
						:error-messages="BachelorDetailErrorMessages"
					/>
					<v-text-field v-model="Master" label="ปริญญาโท" filled />
					<v-text-field
						v-model="MasterDetail"
						label="ข้อมูลเพิ่มเติม ปริญญาโท"
						filled
						:error-messages="MasterDetailErrorMessages"
					/>
					<v-text-field v-model="Phd" label="ปริญญาเอก" filled />
					<v-text-field
						v-model="PhdDetail"
						label="ข้อมูลเพิ่มเติม ปริญญาเอก"
						filled
						:error-messages="PhdDetailDetailErrorMessages"
					/>
					<br />
					<hr />
					<br />
					<v-select v-model="jobselect" label="อาชีพ" filled :items="job" @change="getJobID"> </v-select>
					<v-text-field v-model="Job_Des" label="ส่วนขยายอาชีพ" filled />
				</div>
			</v-col>
			<v-col xs12 md6>
				<div v-if="step === 3">
					<v-text class="Textcustomer">ข้อมูลที่อยู่ตามบัตรประชาชน</v-text>
					<hr />
					<br />
					<v-row>
						<v-col xs6>
							<v-select v-model="C_GEO" label="ภาค" filled :items="geography" @change="getPro('C')" />
						</v-col>

						<v-col xs6>
							<v-select v-model="C_Pro" label="จังหวัด" filled :items="c_province" @change="getAmp('C')" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-select v-model="C_Amp" label="อำเภอ" filled :items="c_amphur" @change="getTum('C')" />
						</v-col>
						<v-col xs6>
							<v-select v-model="C_Tum" label="ตำบล" filled :items="c_tumbon" @change="updateWorkField" />
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field v-model="C_Vill" label="หมู่บ้าน" filled @input="updateWorkField" />
						</v-col>
						<v-col xs6>
							<v-text-field
								v-model="houseNumber1"
								label="บ้านเลขที่"
								filled
								:rules="[numberRule]"
								:error-messages="houseNumber1ErrorMessages"
								@blur="validateHouseNumber1"
								@change="updateWorkField"
							>
								<v-messages
									v-if="houseNumber1ErrorMessages.length > 0"
									:error-messages="houseNumber1ErrorMessages"
								></v-messages>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field v-model="C_AddGPSLatitude" label="ละติจูด" filled @change="updateWorkField" />
						</v-col>
						<v-col xs6>
							<v-text-field v-model="C_AddGPSLongtitude" label="ลองจิจูด" filled @change="updateWorkField" />
						</v-col>
					</v-row>
					<v-text-field
						v-model="C_Code"
						label="รหัสไปรษณีย์"
						filled
						:rules="[numberRule]"
						:error-messages="c_CodeErrorMessages"
						@change="updateWorkField"
					/>
					<v-text-field v-model="C_AddMapDescribe" label="อธิบายแผนที่" filled @change="updateWorkField" />
					<v-text class="Textcustomer">ข้อมูลที่อยู่ที่ทำงาน</v-text>
					<hr />
					<v-checkbox
						v-model="workAddrCopyIDAddr"
						:label="'เหมือนที่อยู่บัตรประชาชน'"
						@change="WorkcopyID"
					></v-checkbox>
					<v-row>
						<v-col xs6>
							<v-select
								v-model="W_GEO"
								label="ภาค"
								filled
								:items="geography"
								:disabled="workAddrCopyIDAddr"
								@change="getPro('W')"
							/>
						</v-col>
						<v-col xs6>
							<v-select
								v-model="W_Pro"
								label="จังหวัด"
								filled
								:items="w_province"
								:disabled="workAddrCopyIDAddr"
								@change="getAmp('W')"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-select
								v-model="W_Amp"
								label="อำเภอ"
								filled
								:items="w_amphur"
								:disabled="workAddrCopyIDAddr"
								@change="getTum('W')"
							/>
						</v-col>
						<v-col xs6>
							<v-select
								v-model="W_Tum"
								label="ตำบล"
								filled
								:items="w_tumbon"
								:disabled="workAddrCopyIDAddr"
								@change="updateWorkField"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field
								v-model="W_Vill"
								label="หมู่บ้าน"
								filled
								:disabled="workAddrCopyIDAddr"
								@change="updateWorkField"
							/>
						</v-col>
						<v-col xs6>
							<v-text-field
								v-model="houseNumber2"
								label="บ้านเลขที่"
								filled
								:rules="[numberRule]"
								:error-messages="houseNumber2ErrorMessages"
								:disabled="workAddrCopyIDAddr"
								@blur="validateHouseNumber2"
								@change="updateWorkField"
							>
								<v-messages
									v-if="houseNumber2ErrorMessages.length > 0"
									:error-messages="houseNumber2ErrorMessages"
								></v-messages>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field
								v-model="W_AddGPSLatitude"
								label="ละติจูด"
								filled
								:disabled="workAddrCopyIDAddr"
								@change="updateWorkField"
							/>
						</v-col>
						<v-col xs6>
							<v-text-field
								v-model="W_AddGPSLongtitude"
								label="ลองจิจูด"
								filled
								:disabled="workAddrCopyIDAddr"
								@change="updateWorkField"
							/>
						</v-col>
					</v-row>
					<v-text-field
						v-model="W_Code"
						label="รหัสไปรษณีย์"
						filled
						:rules="[numberRule]"
						:error-messages="w_CodeErrorMessages"
						:disabled="workAddrCopyIDAddr"
						@change="updateWorkField"
					/>
					<v-text-field
						v-model="W_AddMapDescribe"
						label="อธิบายแผนที่"
						filled
						:disabled="workAddrCopyIDAddr"
						@change="updateWorkField"
					/>
					<v-text class="Textcustomer">ข้อมูลที่อยู่ส่งเอกสาร</v-text>
					<hr />

					<!-- <v-radio-group v-model="radios2"> -->
					<v-container style="margin-top: 0px; margin-bottom: 0px">
						<v-col>
							<v-row row="2">
								<v-checkbox
									v-model="mailAddrCopyIDAddr"
									label="เหมือนที่อยู่บัตรประชาชน"
									style="mailaddrcopyidaddrng-right: 30px"
									@click="paperCopyId"
								></v-checkbox>
								<v-checkbox
									v-model="mailAddrCopyWorkAddr"
									label="เหมือนที่อยู่ทำงาน"
									@click="paperCopyWork"
								></v-checkbox>
							</v-row>
						</v-col>
					</v-container>

					<!-- </v-radio-group> -->
					<v-row>
						<v-col xs6>
							<v-select
								v-model="Cus_GEO"
								label="ภาค"
								filled
								:items="geography"
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								@change="getPro('Cus')"
							/>
						</v-col>
						<v-col xs6>
							<v-select
								v-model="Cus_Pro"
								label="จังหวัด"
								filled
								:items="cus_province"
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								@change="getAmp('Cus')"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-select
								v-model="Cus_Amp"
								label="อำเภอ"
								filled
								:items="cus_amphur"
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								@change="getTum('Cus')"
							/>
						</v-col>
						<v-col xs6>
							<v-select
								v-model="Cus_Tum"
								label="ตำบล"
								filled
								:items="cus_tumbon"
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								@change="updateWorkField"
							/>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field
								v-model="Cus_Vill"
								label="หมู่บ้าน"
								filled
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								@change="updateWorkField"
							/>
						</v-col>
						<v-col xs6>
							<v-text-field
								v-model="houseNumber3"
								label="บ้านเลขที่"
								filled
								:rules="[numberRule]"
								:error-messages="houseNumber3ErrorMessages"
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								@blur="validateHouseNumber3"
								@change="updateWorkField"
							>
								<v-messages
									v-if="houseNumber3ErrorMessages.length > 0"
									:error-messages="houseNumber3ErrorMessages"
								></v-messages>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col xs6>
							<v-text-field
								v-model="Cus_AddGPSLatitude"
								label="ละติจูด"
								filled
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								@change="updateWorkField"
							/>
						</v-col>
						<v-col xs6>
							<v-text-field
								v-model="Cus_AddGPSLongtitude"
								label="ลองจิจูด"
								filled
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								@change="updateWorkField"
							/>
						</v-col>
					</v-row>
					<v-text-field
						v-model="Cus_Code"
						label="รหัสไปรษณีย์"
						filled
						:rules="[numberRule]"
						:error-messages="cus_CodeErrorMessages"
						:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
						@change="updateWorkField"
					/>
					<v-text-field
						v-model="Cus_AddMapDescribe"
						label="อธิบายแผนที่"
						filled
						:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
						@change="updateWorkField"
					/>
				</div>
			</v-col>

			<v-snackbar v-model="snackbar" :timeout="4000" color="red"> Please fill in required fields. </v-snackbar>

			<div class="button-wrapper">
				<v-btn
					v-if="step === 1"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="toBack"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					v-if="step === 1"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="checkStep1"
					>ต่อไป</v-btn
				>

				<v-btn
					v-if="step === 2"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="prevStep"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					v-if="step === 2"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="validateEducation"
					>ต่อไป</v-btn
				>

				<v-btn
					v-if="step === 3"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="prevStep"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					v-if="step === 3"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="checkStep3"
					>ต่อไป</v-btn
				>
				<!-- <v-btn
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #7816a6; width: 95px; color: white"
					@click="TestMethod"
					>Test</v-btn
				> -->
			</div>
		</v-container>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			workAddrCopyIDAddr: false,
			mailAddrCopyIDAddr: false,
			mailAddrCopyWorkAddr: false,
			email: '',
			rules: {
				email: (value) => {
					if (!value) {
						return 'กรุณากรอกอีเมล';
					} else if (!this.isValidEmail(value)) {
						return 'ตัวอย่างอีเมล เช่น @gmail.com, @hotmail.com เป็นต้น';
					}
					return true;
				},
			},
			textRule: (value) => {
				const textOnlyRegex = /^[a-zA-Zก-๐\s]*$/;
				return textOnlyRegex.test(value) || 'ใส่เฉพาะตัวอักษรเท่านั้น';
			},
			numberRule: (value) => {
				const numberOnlyRegex = /^\d+$/;
				return numberOnlyRegex.test(value) || 'ใส่เฉพาะตัวเลขเท่านั้น';
			},
			requiredRule: [(v) => !!v || 'กรุณาเลือก'],
			// digitLimitRule: (value) => {
			// 	return value === null || value.toString().length === 13 || 'เลขบัตรประชาชนควรมี 13 หลัก'; // return true if input has exactly 5 digits, else return error message
			// },
			step: 1,
			Title: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ'],
			genders: ['ชาย', 'หญิง', 'สาวประเภทสอง'],
			status: ['โสด', 'หม้าย', 'หย่าร้าง', 'สมรส'],
			TypeList: ['บุคคล', 'ชมรม/ สมาคม / นิติบุคคล'],
			CardType: ['บุคคลธรรมดา', 'ชาวต่างชาติ', 'ไม่ระบุเลขบัตร'],
			rankcustomer: ['ตัวอย่างข้อมูล1', 'ตัวอย่างข้อมูล2', 'ตัวอย่างข้อมูล3'],
			geography: [],
			c_province: [],
			c_amphur: [],
			c_tumbon: [],

			w_province: [],
			w_amphur: [],
			w_tumbon: [],

			cus_province: [],
			cus_amphur: [],
			cus_tumbon: [],

			testobj: [],
			job: [],
			jobID: '',
			// Updater: '',
			Updater: this.$store.state.login.loginResult.Name + ' ' + this.$store.state.login.loginResult.Surname,

			nameTitleErrorMessages: [],
			FirstnameErrorMessages: [],
			LastnameErrorMessages: [],
			CustomerTypeErrorMessages: [],
			IDCardErrorMessages: [],
			CitizenIdErrorMessages: [],
			EmailErrorMessages: [],
			houseNumber1ErrorMessages: [],
			houseNumber2ErrorMessages: [],
			houseNumber3ErrorMessages: [],
			PhoneErrorMessages: [],

			c_CodeErrorMessages: [],
			w_CodeErrorMessages: [],
			cus_CodeErrorMessages: [],

			Secondary_EduDetailErrorMessages: [],
			Highschool_EduDetailErrorMessages: [],
			BachelorDetailErrorMessages: [],
			MasterDetailErrorMessages: [],
			PhdDetailDetailErrorMessages: [],

			DateOfBirth: null,
			snackbar: false,
			cardnumber: '',
			radios1: null,
			radios2: null,

			C_Code: '',

			Secondary_Edu: '',
			Secondary_EduDetail: '',
			Highschool_Edu: '',
			Highschool_EduDetail: '',
			Bachelor: '',
			BachelorDetail: '',
			Master: '',
			MasterDetail: '',
			Phd: '',
			PhdDetail: '',

			houseNumber2: '',
			W_copy: '',
			W_Vill: '',
			W_Tum: '',
			W_Amp: '',
			W_Pro: '',
			W_GEO: '',
			W_Code: '',
			W_Name: '',
			// EDU_DETAIL: '',

			houseNumber3: '',
			Cus_Tum: '',
			Cus_Amp: '',
			Cus_Pro: '',
			Cus_GEO: '',
			Cus_Vill: '',
			Cus_Code: '',
			Cus_AddGPSLatitude: '',
			Cus_AddGPSLongtitude: '',
			Cus_AddMapDescribe: '',
		};
	},

	computed: {
		pageTitle() {
			return 'บันทึกข้อมูลลูกค้า';
		},
	},

	watch: {
		workAddrCopyIDAddr(newValue) {
			if (newValue === true) {
				this.W_GEO = this.C_GEO;
				this.w_province = this.c_province;
				this.w_amphur = this.c_amphur;
				this.w_tumbon = this.c_tumbon;

				this.houseNumber2 = this.houseNumber1;
				this.W_copy = '';
				this.W_Vill = this.C_Vill;
				this.W_Tum = this.C_Tum;
				this.W_Amp = this.C_Amp;
				this.W_Pro = this.C_Pro;
				this.W_GEO = this.C_GEO;
				this.W_Code = this.C_Code;
				this.W_AddGPSLatitude = this.C_AddGPSLatitude;
				this.W_AddGPSLongtitude = this.C_AddGPSLongtitude;
				this.W_AddMapDescribe = this.C_AddMapDescribe;
				this.W_Name = this.C_Name;
				this.houseNumber2ErrorMessages = '';
			} else {
				this.w_province = [];
				this.w_amphur = [];
				this.w_tumbon = [];

				this.houseNumber2 = '';
				this.W_copy = '';
				this.W_Vill = '';
				this.W_Tum = '';
				this.W_Amp = '';
				this.W_Pro = '';
				this.W_GEO = '';
				this.W_Code = '';
				this.W_AddGPSLatitude = '';
				this.W_AddGPSLongtitude = '';
				this.W_AddMapDescribe = '';
				this.W_Name = '';
				this.houseNumber2ErrorMessages = '';
			}
		},

		mailAddrCopyIDAddr(newValue) {
			if (newValue === true) {
				this.Cus_GEO = this.C_GEO;
				this.cus_province = this.c_province;
				this.cus_amphur = this.c_amphur;
				this.cus_tumbon = this.c_tumbon;

				this.houseNumber3 = this.houseNumber1;
				this.Cus_Tum = this.C_Tum;
				this.Cus_Amp = this.C_Amp;
				this.Cus_Pro = this.C_Pro;
				this.Cus_GEO = this.C_GEO;
				this.Cus_Vill = this.C_Vill;
				this.Cus_Code = this.C_Code;
				this.Cus_AddGPSLatitude = this.C_AddGPSLatitude;
				this.Cus_AddGPSLongtitude = this.C_AddGPSLongtitude;
				this.Cus_AddMapDescribe = this.C_AddMapDescribe;
				this.houseNumber3ErrorMessages = this.houseNumber1ErrorMessages;
			} else if (this.mailAddrCopyWorkAddr !== true && this.mailAddrCopyIDAddr !== true) {
				this.Cus_GEO = '';
				this.cus_province = [];
				this.cus_amphur = [];
				this.cus_tumbon = [];

				this.houseNumber3 = '';
				this.Cus_Tum = '';
				this.Cus_Amp = '';
				this.Cus_Pro = '';
				this.Cus_GEO = '';
				this.Cus_Vill = '';
				this.Cus_Code = '';
				this.Cus_AddGPSLatitude = '';
				this.Cus_AddGPSLongtitude = '';
				this.Cus_AddMapDescribe = '';
			}
		},

		mailAddrCopyWorkAddr(newValue) {
			if (newValue === true) {
				this.Cus_GEO = this.C_GEO;
				this.cus_province = this.w_province;
				this.cus_amphur = this.w_amphur;
				this.cus_tumbon = this.w_tumbon;

				this.houseNumber3 = this.houseNumber2;
				this.Cus_copy = '';
				this.Cus_Vill = this.W_Vill;
				this.Cus_Tum = this.W_Tum;
				this.Cus_Amp = this.W_Amp;
				this.Cus_Pro = this.W_Pro;
				this.Cus_GEO = this.W_GEO;
				this.Cus_Code = this.W_Code;
				this.Cus_AddGPSLatitude = this.W_AddGPSLatitude;
				this.Cus_AddGPSLongtitude = this.W_AddGPSLongtitude;
				this.Cus_AddMapDescribe = this.W_AddMapDescribe;
				this.Cus_Name = this.W_Name;
				this.houseNumber2ErrorMessages = '';
			} else if (this.mailAddrCopyWorkAddr !== true && this.mailAddrCopyIDAddr !== true) {
				this.Cus_GEO = '';
				this.cus_province = [];
				this.cus_amphur = [];
				this.cus_tumbon = [];

				this.houseNumber3 = '';
				this.Cus_Tum = '';
				this.Cus_Amp = '';
				this.Cus_Pro = '';
				this.Cus_GEO = '';
				this.Cus_Vill = '';
				this.Cus_Code = '';
				this.Cus_AddGPSLatitude = '';
				this.Cus_AddGPSLongtitude = '';
				this.Cus_AddMapDescribe = '';
			}
		},

		step(newValue) {
			if (newValue === 2 || newValue === 1) {
				this.getJobList();
			}
		},
	},

	mounted() {
		this.getJobList();
		this.getGeo();
		this.getCustomerGroup();
	},

	methods: {
		...mapActions(['customerSet', 'getJobList', 'getCustomerGroup', 'getAddress']),

		updateWorkField() {
			if (this.workAddrCopyIDAddr === true) {
				this.W_GEO = this.C_GEO;
				this.w_province = this.c_province;
				this.w_amphur = this.c_amphur;
				this.w_tumbon = this.c_tumbon;

				this.houseNumber2 = this.houseNumber1;
				this.W_copy = '';
				this.W_Vill = this.C_Vill;
				this.W_Tum = this.C_Tum;
				this.W_Amp = this.C_Amp;
				this.W_Pro = this.C_Pro;
				this.W_GEO = this.C_GEO;
				this.W_Code = this.C_Code;
				this.W_AddGPSLatitude = this.C_AddGPSLatitude;
				this.W_AddGPSLongtitude = this.C_AddGPSLongtitude;
				this.W_AddMapDescribe = this.C_AddMapDescribe;
				this.W_Name = this.C_Name;
				this.houseNumber2ErrorMessages = '';
			}
			if (this.mailAddrCopyIDAddr === true) {
				this.Cus_GEO = this.C_GEO;
				this.cus_province = this.c_province;
				this.cus_amphur = this.c_amphur;
				this.cus_tumbon = this.c_tumbon;

				this.houseNumber3 = this.houseNumber1;
				this.Cus_copy = '';
				this.Cus_Vill = this.C_Vill;
				this.Cus_Tum = this.C_Tum;
				this.Cus_Amp = this.C_Amp;
				this.Cus_Pro = this.C_Pro;
				this.Cus_GEO = this.C_GEO;
				this.Cus_Code = this.C_Code;
				this.Cus_AddGPSLatitude = this.C_AddGPSLatitude;
				this.Cus_AddGPSLongtitude = this.C_AddGPSLongtitude;
				this.Cus_AddMapDescribe = this.C_AddMapDescribe;
				this.Cus_Name = this.C_Name;
				this.houseNumber2ErrorMessages = '';
			}
			if (this.mailAddrCopyWorkAddr === true) {
				this.Cus_GEO = this.C_GEO;
				this.cus_province = this.w_province;
				this.cus_amphur = this.w_amphur;
				this.cus_tumbon = this.w_tumbon;

				this.houseNumber3 = this.houseNumber2;
				this.Cus_copy = '';
				this.Cus_Vill = this.W_Vill;
				this.Cus_Tum = this.W_Tum;
				this.Cus_Amp = this.W_Amp;
				this.Cus_Pro = this.W_Pro;
				this.Cus_GEO = this.W_GEO;
				this.Cus_Code = this.W_Code;
				this.Cus_AddGPSLatitude = this.W_AddGPSLatitude;
				this.Cus_AddGPSLongtitude = this.W_AddGPSLongtitude;
				this.Cus_AddMapDescribe = this.W_AddMapDescribe;
				this.Cus_Name = this.W_Name;
				this.houseNumber2ErrorMessages = '';
			}
		},

		async getGeo() {
			this.updateWorkField();
			await this.$store.dispatch('getGeography');
			const geography = this.$store.state.address.geographyResult;
			const geoNames = geography.map((item) => `${item.geo_id}_${item.geo_name}`);

			geoNames.sort((a, b) => {
				const idA = parseInt(a.split('_')[0]);
				const idB = parseInt(b.split('_')[0]);
				return idA - idB;
			});
			this.geography = geoNames;
		},

		async getPro(type) {
			let id = '';
			switch (type) {
				case 'C':
					id = parseInt(this.C_GEO.split('_')[0]);
					break;
				case 'W':
					id = parseInt(this.W_GEO.split('_')[0]);
					break;
				case 'Cus':
					id = parseInt(this.Cus_GEO.split('_')[0]);
					break;
			}
			await this.$store.dispatch('getProvince', id);
			const province = this.$store.state.address.provinceResult;
			const provinceNames = province.map((item) => `${item.province_id}_${item.province_name}`);

			provinceNames.sort((a, b) => {
				const idA = parseInt(a.split('_')[0]);
				const idB = parseInt(b.split('_')[0]);
				return idA - idB;
			});
			if (type === 'C') {
				this.c_province = provinceNames;
				this.c_amphur = [];
				this.c_tumbon = [];
				this.updateWorkField();
			}
			if (type === 'W') {
				this.w_province = provinceNames;
				this.w_amphur = [];
				this.w_tumbon = [];
				this.updateWorkField();
			}
			if (type === 'Cus') {
				this.cus_province = provinceNames;
				this.cus_amphur = [];
				this.cus_tumbon = [];
				this.updateWorkField();
			}
		},

		async getAmp(type) {
			let id = '';
			switch (type) {
				case 'C':
					id = parseInt(this.C_Pro.split('_')[0]);
					break;
				case 'W':
					id = parseInt(this.W_Pro.split('_')[0]);
					break;
				case 'Cus':
					id = parseInt(this.Cus_Pro.split('_')[0]);
					break;
			}
			await this.$store.dispatch('getAmphur', id);
			const amphur = this.$store.state.address.amphurResult;
			const amphurNames = amphur.map((item) => `${item.amphur_id}_${item.amphur_name}`);

			amphurNames.sort((a, b) => {
				const idA = parseInt(a.split('_')[0]);
				const idB = parseInt(b.split('_')[0]);
				return idA - idB;
			});
			if (type === 'C') {
				this.c_amphur = amphurNames;
				this.c_tumbon = [];
				this.updateWorkField();
			}
			if (type === 'W') {
				this.w_amphur = amphurNames;
				this.w_tumbon = [];
				this.updateWorkField();
			}
			if (type === 'Cus') {
				this.cus_amphur = amphurNames;
				this.cus_tumbon = [];
				this.updateWorkField();
			}
		},

		async getTum(type) {
			let id = '';
			switch (type) {
				case 'C':
					id = parseInt(this.C_Amp.split('_')[0]);
					break;
				case 'W':
					id = parseInt(this.W_Amp.split('_')[0]);
					break;
				case 'Cus':
					id = parseInt(this.Cus_Amp.split('_')[0]);
					break;
			}
			await this.$store.dispatch('getTumbon', id);
			const tumbon = this.$store.state.address.tumbonResult;
			const tumbonNames = tumbon.map((item) => `${item.district_id}_${item.district_name}`);

			tumbonNames.sort((a, b) => {
				const idA = parseInt(a.split('_')[0]);
				const idB = parseInt(b.split('_')[0]);
				return idA - idB;
			});
			if (type === 'C') {
				this.c_tumbon = tumbonNames;
				this.updateWorkField();
			}
			if (type === 'W') {
				this.w_tumbon = tumbonNames;
				this.updateWorkField();
			}
			if (type === 'Cus') {
				this.cus_tumbon = tumbonNames;
				this.updateWorkField();
			}
		},

		paperCopyId() {
			if (this.mailAddrCopyIDAddr === true) {
				this.mailAddrCopyWorkAddr = false;
			}
		},

		paperCopyWork() {
			if (this.mailAddrCopyWorkAddr === true) {
				this.mailAddrCopyIDAddr = false;
			}
		},

		isValidEmail(value) {
			// Use a regular expression to validate the email format
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(value);
		},

		async getJobID() {
			const masterJob = await this.$store.state.getjob.jobListResult;
			const job = this.jobselect;

			const foundObj = masterJob.find((obj) => obj.Job === job);

			const JobID = foundObj ? foundObj.JobID : null;
			this.jobID = JobID;
		},

		customerSet() {
			const customer = {
				Be: this.nameTitle,
				Betype: this.cuslevel,
				Cus_Name: this.firstName,
				Cus_Surename: this.lastName,
				Cus_Nickname: this.nickname,
				DateOfBirth: this.DateOfBirth,
				Sex: this.gender,
				Cus_IDNo: this.cardnumber,
				mary_id: '',
				Updater: this.Updater,
				Cus_Type: this.customerType,
				M_Tel: this.phone,
				Status: this.Status,
				// EDU_DETAIL: '',

				// ที่อยู่ตามบัตรปชช/ทะเบียนบ้าน/ทะเบียนพาณิชย์
				C_copy: '',
				C_Add: this.houseNumber1,
				C_Vill: this.C_Vill,
				C_Tum: this.C_Tum,
				C_Amp: this.C_Amp,
				C_Pro: this.C_Pro,
				C_GEO: this.C_GEO,
				C_Code: this.C_Code,
				C_AddGPSLatitude: this.C_AddGPSLatitude,
				C_AddGPSLongtitude: this.C_AddGPSLongtitude,
				C_AddMapDescribe: this.C_AddMapDescribe,

				// ที่อยู่ส่งเอกสาร
				Cus_copy: '',
				Cus_Add: this.houseNumber3,
				Cus_Vill: this.Cus_Vill,
				Cus_Tum: this.Cus_Tum,
				Cus_Amp: this.Cus_Amp,
				Cus_Pro: this.Cus_Prov,
				Cus_GEO: this.Cus_GEO,
				Cus_Code: this.Cus_Code,
				Cus_AddGPSLatitude: this.Cus_AddGPSLatitude,
				Cus_AddGPSLongtitude: this.Cus_AddGPSLongtitude,
				Cus_AddMapDescribe: this.Cus_AddMapDescribe,

				// ที่อยู่ที่ทำงาน
				W_copy: '',
				W_Add: this.houseNumber2,
				W_Vill: this.W_Vill,
				W_Tum: this.W_Tum,
				W_Amp: this.W_Amp,
				W_Pro: this.W_Pro,
				W_GEO: this.W_GEO,
				W_Code: this.W_Code,
				W_AddGPSLatitude: this.W_AddGPSLatitude,
				W_AddGPSLongtitude: this.W_AddGPSLongtitude,
				W_AddMapDescribe: this.W_AddMapDescribe,

				W_Name: this.W_Name,

				Title: '',
				Email: this.email,
				Primary_Edu: '',
				Secondary_Edu: this.Secondary_Edu,
				Secondary_Edu_Detail: this.Secondary_EduDetail,
				Highschool_Edu: this.Highschool_Edu,
				Highschool_Edu_Detail: this.Highschool_EduDetail,
				Bachelor: this.Bachelor,
				Bachelor_Detail: this.BachelorDetail,
				Master: this.Master,
				Master_Detail: this.MasterDetail,
				Phd: this.Phd,
				Phd_Detail: this.PhdDetail,
				JobID: this.jobID,
				Job: this.jobselect,
				Job_Des: this.Job_Des,
			};
			// ที่ทำงานที่อยู่เหมือนบัตรประชาชน
			if (this.workAddrCopyIDAddr === true) {
				customer.W_Add = this.houseNumber1;
				customer.W_Vill = this.C_Vill;
				customer.W_Tum = this.C_Tum;
				customer.W_Amp = this.C_Amp;
				customer.W_Pro = this.C_Pro;
				customer.W_GEO = this.C_GEO;
				customer.W_Code = this.C_Code;
				customer.W_AddGPSLatitude = this.C_AddGPSLatitude;
				customer.W_AddGPSLongtitude = this.C_AddGPSLongtitude;
				customer.W_AddMapDescribe = this.C_AddMapDescribe;
				customer.W_Name = this.C_Name;
			}
			// ที่ส่งเอกสารที่อยู่เหมือนบัตรประชาชน
			if (this.mailAddrCopyIDAddr === true) {
				customer.Cus_Add = this.houseNumber1;
				customer.Cus_Vill = this.C_Vill;
				customer.Cus_Tum = this.C_Tum;
				customer.Cus_Amp = this.C_Amp;
				customer.Cus_Pro = this.C_Pro;
				customer.Cus_GEO = this.C_GEO;
				customer.Cus_Code = this.C_Code;
				customer.Cus_AddGPSLatitude = this.C_AddGPSLatitude;
				customer.Cus_AddGPSLongtitude = this.C_AddGPSLongtitude;
				customer.Cus_AddMapDescribe = this.C_AddMapDescribe;
			}
			// ที่ส่งเอกสารที่อยู่เหมือนที่ทำงาน
			if (this.mailAddrCopyWorkAddr === true) {
				customer.Cus_Add = customer.W_Add;
				customer.Cus_Vill = customer.W_Vill;
				customer.Cus_Tum = customer.W_Tum;
				customer.Cus_Amp = customer.W_Amp;
				customer.Cus_Pro = customer.W_Pro;
				customer.Cus_GEO = customer.W_GEO;
				customer.Cus_Code = customer.W_Code;
				customer.Cus_AddGPSLatitude = customer.W_AddGPSLatitude;
				customer.Cus_AddGPSLongtitude = customer.W_AddGPSLongtitude;
				customer.Cus_AddMapDescribe = customer.W_AddMapDescribe;
			}

			this.$store.dispatch('customerSummarySet', customer);
			// this.$router.push('/register/customer-sum');
		},

		// unfocus validate

		validateEducation() {
			this.Secondary_EduDetailErrorMessages = [];
			this.Highschool_EduDetailErrorMessages = [];
			this.BachelorDetailErrorMessages = [];
			this.MasterDetailErrorMessages = [];
			this.PhdDetailDetailErrorMessages = [];

			// Perform validation for each text field
			const edu = [
				{
					value: this.Secondary_Edu,
					detail: this.Secondary_EduDetail,
					errorMessages: this.Secondary_EduDetailErrorMessages,
					errorBody: 'กรุณากรอกข้อมูลเพิ่มเติมการศึกษาระดับ มัทยมต้น',
				},
				{
					value: this.Highschool_Edu,
					detail: this.Highschool_EduDetail,
					errorMessages: this.Highschool_EduDetailErrorMessages,
					errorBody: 'กรุณากรอกข้อมูลเพิ่มเติมการศึกษาระดับ มัทยมปลาย',
				},
				{
					value: this.Bachelor,
					detail: this.BachelorDetail,
					errorMessages: this.BachelorDetailErrorMessages,
					errorBody: 'กรุณากรอกข้อมูลเพิ่มเติมการศึกษาระดับ ปริญาตรี',
				},
				{
					value: this.Master,
					detail: this.MasterDetail,
					errorMessages: this.MasterDetailErrorMessages,
					errorBody: 'กรุณากรอกข้อมูลเพิ่มเติมการศึกษาระดับ ปริญาโท',
				},

				{
					value: this.Phd,
					detail: this.PhdDetail,
					errorMessages: this.PhdDetailDetailErrorMessages,
					errorBody: 'กรุณากรอกข้อมูลเพิ่มเติมการศึกษาระดับ ปริญาเอก',
				},
			];

			edu.forEach((edu) => {
				if (edu.value !== '' && edu.detail === '') {
					edu.errorMessages.push(edu.errorBody);
				} else {
					edu.errorMessages = '';
				}
			});
			const hasErrorMessages = edu.some((edu) => edu.errorMessages.length > 0);

			if (!hasErrorMessages) {
				this.step++;
			}
		},

		validateCitizenId(id) {
			this.CitizenIdErrorMessages = [];

			const cId = id.toString();
			if (cId !== '') {
				if (cId.length !== 13) this.CitizenIdErrorMessages.push('กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก');
			} else {
				this.CitizenIdErrorMessages.push('กรุณากรอกเลขบัตรประชาชน');
			}

			let i = 0;
			let sum = 0;
			for (i = 0, sum = 0; i < 12; i++) sum += parseFloat(cId.charAt(i)) * (13 - i);
			if ((11 - (sum % 11)) % 10 !== parseFloat(cId.charAt(12))) {
				this.CitizenIdErrorMessages.push('กรุณากรอกเลขบัตรประชาชนให้ถูกรูปแบบ');
			} else {
				this.CitizenIdErrorMessages = [];
			}
		},

		validateEmail() {
			if (!this.email) {
				this.EmailErrorMessages.push('กรุณากรอกอีเมล');
			} else {
				this.EmailErrorMessages = [];
			}
		},

		validatePhone() {
			if (!this.phone) {
				this.PhoneErrorMessages.push('กรุณากรอกเบอร์โทร');
			} else if (isNaN(this.phone)) {
				this.PhoneErrorMessages = [];
				this.PhoneErrorMessages.push('กรุณากรอกเบอร์โทรเป็นตัวเลขเท่านั้น');
			} else if (this.phone.length !== 10) {
				this.PhoneErrorMessages = [];
				this.PhoneErrorMessages.push('กรุณากรอกเบอร์โทรให้ครบ 10 หลัก');
			} else {
				this.PhoneErrorMessages = [];
			}
		},

		validateFirstName() {
			if (!this.firstName) {
				this.FirstnameErrorMessages.push('กรุณากรอกชื่อ');
			} else {
				this.FirstnameErrorMessages = [];
			}
		},

		validateLastname() {
			if (!this.lastName) {
				this.LastnameErrorMessages.push('กรุณากรอกนามสกุล');
			} else {
				this.LastnameErrorMessages = [];
			}
		},

		validateHouseNumber1() {
			if (this.houseNumber1) {
				this.houseNumber1ErrorMessages = '';
			}
		},

		validateHouseNumber2() {
			if (this.houseNumber2) {
				this.houseNumber2ErrorMessages = '';
			}
		},

		validateHouseNumber3() {
			if (this.houseNumber3) {
				this.houseNumber3ErrorMessages = '';
			}
		},

		async getJobList() {
			this.$store.dispatch('getJob');
			const job = await this.$store.state.getjob.jobListResult;

			const arrayOfJob = job.map((obj) => obj.Job);
			this.jobList = arrayOfJob;

			this.job = this.jobList;
		},

		async getCustomerGroup() {
			await this.$store.dispatch('getCustomerGroup');
			const customerGroup = this.$store.state.customergroup.CustomerGroupList;
			this.rankcustomer = customerGroup;
		},

		validatePostCode() {
			// Clear existing error messages
			this.c_CodeErrorMessages = [];
			this.w_CodeErrorMessages = [];
			this.cus_CodeErrorMessages = [];

			// Perform validation for each text field
			const code = [
				{ value: this.C_Code, errorMessages: this.c_CodeErrorMessages },
				{ value: this.W_Code, errorMessages: this.w_CodeErrorMessages },
				{ value: this.Cus_Code, errorMessages: this.cus_CodeErrorMessages },
			];
			code.forEach((code) => {
				if (code.value === '') {
					code.errorMessages.push('กุรณากรอกเลขไปรษณีย์');
				}
			});
		},

		checkStep1() {
			// this.nameTitleErrorMessages = [];
			// this.FirstnameErrorMessages = [];
			// this.LastnameErrorMessages = [];
			// this.CustomerTypeErrorMessages = [];
			// this.IDCardErrorMessages = [];
			// this.PhoneErrorMessages = [];
			// this.EmailErrorMessages = [];
			// this.CardnumberErrorMessages = [];

			if (!this.nameTitle) {
				this.nameTitleErrorMessages.push('กรุณาเลือกคำนำหน้า');
			}

			if (!this.firstName) {
				this.FirstnameErrorMessages.push('กรุณากรอกชื่อ');
			}

			if (!this.lastName) {
				this.LastnameErrorMessages.push('กรุณากรอกนามสกุล');
			}

			if (!this.customerType) {
				this.CustomerTypeErrorMessages.push('กรุณาเลือกประเภทลูกค้า');
			}

			if (!this.idCard) {
				this.IDCardErrorMessages.push('กรุณาเลือกประเภทบัตร');
			}

			if (!this.email) {
				this.EmailErrorMessages.push('กรุณากรอกอีเมล');
			}

			if (!this.phone) {
				this.PhoneErrorMessages.push('กรุณากรอกเบอร์โทร');
			} else if (!this.phone.length !== 10) {
				this.PhoneErrorMessages.push('กรุณากรอกเบอร์โทรให้ครบ');
			}

			// if (!this.phone.length !==10) {
			//   this.PhoneErrorMessages.push('กรุณากรอกเบอร์โทรให้ครบ');
			// }

			if (
				this.nameTitle &&
				this.firstName &&
				this.lastName &&
				this.customerType &&
				this.idCard &&
				this.email &&
				this.phone.length === 10
			) {
				if (this.step < 3) {
					this.step++;
				}
			} else {
				this.snackbar = true;
			}
		},
		checkStep3() {
			this.houseNumber1ErrorMessages = [];
			this.houseNumber2ErrorMessages = [];
			this.houseNumber3ErrorMessages = [];

			this.validatePostCode();
			if (!this.houseNumber1) {
				this.houseNumber1ErrorMessages.push('กรุณากรอกข้อมูลให้ครบ');
			}

			if (this.workAddrCopyIDAddr === false && !this.houseNumber2) {
				this.houseNumber2ErrorMessages.push('กรุณากรอกข้อมูลให้ครบ');
			}

			if (this.mailAddrCopyIDAddr === false && this.mailAddrCopyWorkAddr === false && !this.houseNumber3) {
				this.houseNumber3ErrorMessages.push('กรุณากรอกข้อมูลให้ครบ');
			}

			if (
				(this.houseNumber1 &&
					this.houseNumber2 &&
					this.houseNumber3 &&
					this.workAddrCopyIDAddr === false &&
					this.mailAddrCopyIDAddr === false &&
					this.mailAddrCopyWorkAddr === false) ||
				(this.houseNumber1 && this.workAddrCopyIDAddr === true && this.houseNumber3) ||
				(this.houseNumber1 &&
					this.workAddrCopyIDAddr === false &&
					this.houseNumber2 &&
					(this.mailAddrCopyIDAddr = true || this.mailAddrCopyWorkAddr)) ||
				(this.houseNumber1 &&
					this.workAddrCopyIDAddr === true &&
					(this.mailAddrCopyIDAddr === true || this.mailAddrCopyWorkAddr === true))
			) {
				this.customerSet();
				this.$router.push('/register/customer-sum');
			} else {
				this.snackbar = true;
			}
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
</style>
