<template>
	<div>
		<nav-title :title="pageTitle" />
		<v-container>
			<h3>รายละเอียดเพิ่มเติม</h3>
			<hr />
			<br />
			<div class="color-box">
				<br />
				<p class="text-distance">ไม่สามารถตรวจเช็ครอยตำหนิของรถโดยละเอียดเนื่องจาก:</p>
				<div class="checkbox-distance">
					<v-col>
						<v-checkbox v-model="rain" label="ฝนตก" value="" true-value="1" false-value="0"></v-checkbox>
					</v-col>
					<v-col
						><v-checkbox v-model="dust" label="ฝุ่นโคลน" value="" true-value="1" false-value="0"></v-checkbox
					></v-col>
					<v-col
						><v-checkbox v-model="water" label="หยดน้ำ" value="" true-value="1" false-value="0"></v-checkbox
					></v-col>
				</div>
			</div>

			<div class="color-box">
				<br />
				<p class="text-distance">รายละเอียดสติ๊กเกอร์นกเงือก:<span class="red-star">*</span></p>
				<div class="radio-distance">
					<v-radio-group v-model="stickerCheck" row @change="hideAlertSticker">
						<v-radio label="มีสติ๊กเกอร์นกเงือก" value="1" style="margin-bottom: 10px"></v-radio>
						<v-radio label="ไม่มีสติ๊กเกอร์นกเงือก" value="0"></v-radio>
					</v-radio-group>
				</div>
			</div>
			<span v-if="validateSticker" class="alert-message">โปรดกรอกข้อมูล</span>

			<br />
			<h3>รายการตรวจสภาพเบื้องต้น</h3>
			<hr />
			<br />
			<div class="color-box">
				<br />
				<p class="text-distance">1.ระบบส่องสว่างภายใน/ระบบไฟฟ้ามาตรวัด<span class="red-star">*</span></p>
				<div class="radio-distance">
					<v-radio-group
						v-model="section1"
						row
						@change="
							sectionAdd(1, section1, 'ระบบส่องสว่างภายใน/ระบบไฟฟ้ามาตรวัด');
							hideAlert(1);
						"
					>
						<v-radio label="ปกติ" value="1"></v-radio>
						<v-radio label="ไม่ปกติ" value="0"></v-radio>
					</v-radio-group>
				</div>
			</div>
			<span v-if="validateSection.section1" class="alert-message">โปรดกรอกข้อมูล</span>
			<div>
				<div v-if="section1 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef1" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">2.ระดับน้ำมันเครื่อง<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section2"
							row
							@change="
								sectionAdd(2, section2, 'ระดับน้ำมันเครื่อง');
								hideAlert(2);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>
				<span v-if="validateSection.section2" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section2 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef2" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">3.ระดับน้ำมันพวงมาลัยพาวเวอร์<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section3"
							row
							@change="
								sectionAdd(3, section3, 'ระดับน้ำมันพวงมาลัยพาวเวอร์');
								hideAlert(3);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section3" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section3 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef3" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">4.ระดับน้ำฉีดกระจก<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section4"
							row
							@change="
								sectionAdd(4, section4, 'ระดับน้ำฉีดกระจก');
								hideAlert(4);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section4" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section4 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef4" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">5.สภาพแบตเตอร์รี่<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section5"
							row
							@change="
								sectionAdd(5, section5, 'สภาพแบตเตอร์รี่');
								hideAlert(5);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section5" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section5 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef5" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">6.ระดับน้ำกลั่น<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section6"
							row
							@change="
								sectionAdd(6, section6, 'ระดับน้ำกลั่น');
								hideAlert(6);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section6" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section6 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef6" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">7.สภาพสายพานหน้าเครื่องสานพานแอร์<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section7"
							row
							@change="
								sectionAdd(7, section7, 'สภาพสายพานหน้าเครื่องสานพานแอร์');
								hideAlert(7);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section7" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section7 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef7" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">8.ระดับของเหลวหล่อเย็น(Coolant)<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section8"
							row
							@change="
								sectionAdd(8, section8, 'ระดับของเหลวหล่อเย็น(Coolant)');
								hideAlert(8);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section8" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section8 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef8" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">9.สภาพท่อยางหม้อน้ำ<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section9"
							row
							@change="
								sectionAdd(9, section9, 'สภาพท่อยางหม้อน้ำ');
								hideAlert(9);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section9" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section9 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef9" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">10.ระดับน้ำมันเบรกคลัตซ์<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section10"
							row
							@change="
								sectionAdd(10, section10, 'ระดับน้ำมันเบรกคลัตซ์');
								hideAlert(10);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section10" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section10 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef10" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">11.เครื่องยนต์(การรั่วซึม,ความเสียหาย)<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section11"
							row
							@change="
								sectionAdd(11, section11, 'เครื่องยนต์(การรั่วซึม,ความเสียหาย)');
								hideAlert(11);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section11" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section11 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef11" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">12.สภาพยางปัดน้ำฝน L,R<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section12"
							row
							@change="
								sectionAdd(12, section12, 'สภาพยางปัดน้ำฝน L,R');
								hideAlert(12);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section12" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section12 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef12" />
						</v-row>
					</v-container>
				</div>

				<div class="color-box">
					<br />
					<p class="text-distance">13.สภาพยางรถยนต์<span class="red-star">*</span></p>
					<div class="radio-distance">
						<v-radio-group
							v-model="section13"
							row
							@change="
								sectionAdd(13, section13, 'สภาพยางรถยนต์');
								hideAlert(13);
							"
						>
							<v-radio label="ปกติ" value="1"></v-radio>
							<v-radio label="ไม่ปกติ" value="0"></v-radio>
						</v-radio-group>
					</div>
				</div>

				<span v-if="validateSection.section13" class="alert-message">โปรดกรอกข้อมูล</span>
				<div v-if="section13 === '0'" class="color-box">
					<br />
					<p class="text-distance">รายงานปัญหาเพิ่มเติม</p>
					<v-container fluid>
						<v-row class="d-flex justify-center">
							<buttonTextList ref="imageRef13" />
						</v-row>
					</v-container>
				</div>
			</div>

			<div>
				<br />
				<h3>รายงานปัญหาเพิ่มเติม</h3>
				<hr />
				<br />
				<div class="color-box">
					<br />
					<h4 class="text-distance">ข้อมูลเพิ่มเติม:</h4>
					<v-col>
						<v-text-field v-model="commentMore" label="กรอกข้อมูล" background-color="white" filled />
					</v-col>
				</div>
			</div>
			<br />
			<div>
				<h3>ลายเซ็นต์ SA<span class="red-star">*</span></h3>
				<hr />
				<v-container v-model="sigSA" class="d-flex flex-column align-center justify-center">
					<canvas ref="canvasSa" @mouseup="captureSignature(1)"></canvas>
					<v-row class="mt-4" justify-center>
						<v-btn @click="clearCanvas(1)">ลบลายเซ็นต์</v-btn>
					</v-row>
					<br />
					<span v-if="validateSignatureSA" class="alert-message">โปรดกรอกลายลายเซ็นต์</span>
				</v-container>
			</div>

			<div>
				<h3>ลายเซ็นต์ลูกค้า<span class="red-star">*</span></h3>
				<hr />
				<br />
				<v-container v-model="customer" class="d-flex flex-column align-center justify-center">
					<canvas ref="canvasCustomer" @mouseup="captureSignature(2)"></canvas>
					<v-row class="mt-4" justify-center>
						<v-btn @click="clearCanvas(2)">ลบลายเซ็นต์</v-btn>
					</v-row>
					<br />
					<span v-if="validateSignatureCustomer" class="alert-message">โปรดกรอกลายลายเซ็นต์</span>
				</v-container>
			</div>

			<div class="button-end">
				<v-btn
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="toBack"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="nextPage"
					>บันทึก</v-btn
				>
			</div>
		</v-container>
		<v-dialog v-model="showDialog" persistent :max-width="300" :max-height="300">
			<v-card>
				<v-card-title class="text-dialog">โปรดเลือกรูปภาพทุกขั้นตอน</v-card-title>
				<v-card-text class="btn-distance">
					<v-btn
						class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
						style="background: #ed1c24; width: 95px; color: white"
						@click="confirmDialog"
						>ตกลง</v-btn
					>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import SignaturePad from 'signature_pad';
import buttonTextList from '../../components/button-textlist13.vue';

export default {
	components: { buttonTextList },
	data() {
		return {
			commentMore: '',
			validateSection: {
				section1: false,
				section2: false,
				section3: false,
				section4: false,
				section5: false,
				section6: false,
				section7: false,
				section8: false,
				section9: false,
				section10: false,
				section11: false,
				section12: false,
				section13: false,
			},
			signaturePads: [],
			error: '',
			validateSticker: false,
			validateSignatureSA: false,
			validateSignatureCustomer: false,
			rain: '0',
			dust: '0',
			water: '0',
			stickerCheck: null,
			section1: null,
			section2: null,
			section3: null,
			section4: null,
			section5: null,
			section6: null,
			section7: null,
			section8: null,
			section9: null,
			section10: null,
			section11: null,
			section12: null,
			section13: null,
			sectionAll: [],
			checkList: [],
			sigSA: null,
			customer: null,
			showDialog: false,
			dialogMessage: '',
		};
	},
	computed: {
		pageTitle() {
			return 'สร้างรายการ VHC';
		},
	},
	mounted() {
		this.initializeSignaturePads();
	},
	created() {
		// console.log(this.$store.state.vhcUploadStep.stepList);
		// console.log(this.$store.state.vhcUploadStep.todoList);
		// console.log(this.$store.state.vhcUploadStep.picture8List);
	},
	methods: {
		sectionAdd(index, value, name) {
			this.sectionAll[index - 1] = {
				option_id: index,
				option_name: name,
				option_massage: '',
				option_image: '',
				option_value: parseInt(value),
			};
		},
		hideAlert(sectionNumber) {
			// this.validateSticker = false;
			this.validateSection['section' + sectionNumber] = false;
		},
		hideAlertSticker() {
			this.validateSticker = false;
		},
		addImage() {
			const dataSectionImage = [];
			this.sectionAll.forEach((value) => {
				if (value.option_value === 1) {
					dataSectionImage.push(value);
				} else if (value.option_value === 0) {
					const name = 'imageRef' + value.option_id;
					const image = this.$refs[name].returnData();

					const data = {
						option_id: value.option_id,
						option_name: value.option_name,
						option_massage: image[0].comment,
						option_image: image[0].selectedFile,
						option_value: value.option_value,
					};
					dataSectionImage.push(data);
				}
			});
			this.checkList = dataSectionImage;
		},
		insertData() {},
		confirmDialog() {
			this.showDialog = false;
		},
		validateForm() {
			this.validateSticker = false;
			this.validateSection = {
				section1: false,
				section2: false,
				section3: false,
				section4: false,
				section5: false,
				section6: false,
				section7: false,
				section8: false,
				section9: false,
				section10: false,
				section11: false,
				section12: false,
				section13: false,
			};
			if (
				!this.stickerCheck ||
				!this.section1 ||
				!this.section2 ||
				!this.section3 ||
				!this.section4 ||
				!this.section5 ||
				!this.section6 ||
				!this.section7 ||
				!this.section8 ||
				!this.section9 ||
				!this.section10 ||
				!this.section12 ||
				!this.section13
			) {
				if (!this.stickerCheck) this.validateSticker = true;

				if (!this.section1) this.validateSection.section1 = true;
				if (!this.section2) this.validateSection.section2 = true;
				if (!this.section3) this.validateSection.section3 = true;
				if (!this.section4) this.validateSection.section4 = true;
				if (!this.section5) this.validateSection.section5 = true;
				if (!this.section6) this.validateSection.section6 = true;
				if (!this.section7) this.validateSection.section7 = true;
				if (!this.section8) this.validateSection.section8 = true;
				if (!this.section9) this.validateSection.section9 = true;
				if (!this.section10) this.validateSection.section10 = true;
				if (!this.section11) this.validateSection.section11 = true;
				if (!this.section12) this.validateSection.section12 = true;
				if (!this.section13) this.validateSection.section13 = true;

				this.showDialog = true;
				return true;
			} else {
				return false;
			}
		},

		closeDialog() {
			this.showDialog = false;
		},
		initializeSignaturePads() {
			const canvasSa = this.$refs.canvasSa;
			const signaturePad1 = new SignaturePad(canvasSa);
			this.signaturePads.push(signaturePad1);

			const canvasCustomer = this.$refs.canvasCustomer;
			const signaturePad2 = new SignaturePad(canvasCustomer);
			this.signaturePads.push(signaturePad2);
		},
		isCanvasBlank(canvas) {
			return !canvas
				.getContext('2d')
				.getImageData(0, 0, canvas.width, canvas.height)
				.data.some((channel) => channel !== 0);
		},
		validateSignature() {
			this.validateSignatureSA = false;
			this.validateSignatureCustomer = false;
			const signatureSA = this.isCanvasBlank(this.$refs.canvasSa);
			const signatureCustomer = this.isCanvasBlank(this.$refs.canvasCustomer);
			if (signatureSA || signatureCustomer) {
				if (signatureSA) {
					this.validateSignatureSA = true;
				}
				if (signatureCustomer) {
					this.validateSignatureCustomer = true;
				}
				this.showDialog = true;
				return true;
			} else {
				return false;
			}
		},
		captureSignature(type) {
			const canvas = type === 1 ? this.$refs.canvasSa : this.$refs.canvasCustomer;
			const base64Image = canvas.toDataURL();

			if (type === 1) {
				this.sigSA = base64Image;
			} else {
				this.customer = base64Image;
			}

			console.log(base64Image); // Log the base64 representation

			// You can perform additional logic with the captured signature data here
		},
		clearCanvas(type) {
			const canvas = type === 1 ? this.$refs.canvasSa : this.$refs.canvasCustomer;
			const context = canvas.getContext('2d');
			context.clearRect(0, 0, canvas.width, canvas.height);
		},
		checkListcar() {
			const checkcar = {
				button1: this.rain ? 'ฝนตก' : false,
				button2: this.dust ? 'ฝุ่นโคลน' : false,
				button3: this.water ? 'หยดน้ำ' : false,
			};
			this.$store.dispatch('checkListcar', checkcar);
		},

		check13List() {
			const list13 = {};

			for (let i = 1; i <= 13; i++) {
				const section = `section${i}`;
				let imageData = [];
				let additionalDetails = '';

				if (this[section] === '1') {
					list13[section] = 'ปกติ';
				} else if (this[section] === '0') {
					list13[section] = 'ไม่ปกติ';
					imageData = this[`step${i}Buttons`].map(({ selectedFile }) => selectedFile);
					additionalDetails = this[`additionalDetails${i}`];
				}

				list13[section] = {
					list: list13[section],
					imageData,
					additionalDetails,
				};
			}

			this.$store.dispatch('check13List', list13);
		},

		toBack() {
			this.$router.go(-1);
		},

		deleteButton(step, index) {
			let buttons;
			if (step === 1) {
				buttons = this.step1Buttons;
			} else if (step === 2) {
				buttons = this.step2Buttons;
			} else if (step === 3) {
				buttons = this.step3Buttons;
			} else if (step === 4) {
				buttons = this.step4Buttons;
			} else if (step === 5) {
				buttons = this.step5Buttons;
			} else if (step === 6) {
				buttons = this.step6Buttons;
			} else if (step === 7) {
				buttons = this.step7Buttons;
			} else if (step === 8) {
				buttons = this.step8Buttons;
			} else if (step === 9) {
				buttons = this.step9Buttons;
			} else if (step === 10) {
				buttons = this.step10Buttons;
			} else if (step === 11) {
				buttons = this.step11Buttons;
			} else if (step === 12) {
				buttons = this.step12Buttons;
			} else if (step === 13) {
				buttons = this.step13Buttons;
			}
			buttons.splice(index, 1);
		},
		getCurrentDate() {
			const currentDate = new Date();

			const year = currentDate.getFullYear();
			const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
			const day = String(currentDate.getDate()).padStart(2, '0');

			return `${year}-${month}-${day}`;
		},
		getCurrentTime() {
			const currentTime = new Date();
			return currentTime.toLocaleTimeString();
		},
		async nextPage() {
			let step1ListCheck = false;
			let step2ListCheck = false;
			let step3ListCheck = false;
			let step4ListCheck = false;
			let step5ListCheck = false;
			let step6ListCheck = false;
			let step7ListCheck = false;
			let step8ListCheck = false;
			let step9ListCheck = false;
			let step10ListCheck = false;
			let step11ListCheck = false;
			let step12ListCheck = false;
			let step13ListCheck = false;
			try {
				step1ListCheck = this.$refs.imageRef1.validateImgTextList();
			} catch (error) {}
			try {
				step2ListCheck = this.$refs.imageRef2.validateImgTextList();
			} catch (error) {}
			try {
				step3ListCheck = this.$refs.imageRef3.validateImgTextList();
			} catch (error) {}
			try {
				step4ListCheck = this.$refs.imageRef4.validateImgTextList();
			} catch (error) {}
			try {
				step5ListCheck = this.$refs.imageRef5.validateImgTextList();
			} catch (error) {}
			try {
				step6ListCheck = this.$refs.imageRef6.validateImgTextList();
			} catch (error) {}
			try {
				step7ListCheck = this.$refs.imageRef7.validateImgTextList();
			} catch (error) {}
			try {
				step8ListCheck = this.$refs.imageRef8.validateImgTextList();
			} catch (error) {}
			try {
				step9ListCheck = this.$refs.imageRef9.validateImgTextList();
			} catch (error) {}
			try {
				step10ListCheck = this.$refs.imageRef10.validateImgTextList();
			} catch (error) {}
			try {
				step11ListCheck = this.$refs.imageRef11.validateImgTextList();
			} catch (error) {}
			try {
				step12ListCheck = this.$refs.imageRef12.validateImgTextList();
			} catch (error) {}
			try {
				step13ListCheck = this.$refs.imageRef13.validateImgTextList();
			} catch (error) {}

			if (
				step1ListCheck &&
				step2ListCheck &&
				step3ListCheck &&
				step4ListCheck &&
				step5ListCheck &&
				step6ListCheck &&
				step7ListCheck &&
				step8ListCheck &&
				step9ListCheck &&
				step10ListCheck &&
				step11ListCheck &&
				step12ListCheck &&
				step13ListCheck
			) {
				return;
			}
			if (this.validateForm()) return;
			if (this.validateSignature()) return;
			this.captureSignature(1);
			this.captureSignature(2);
			this.addImage();
			console.log(this.sigSA);
			console.log(this.customer);

			const dataSend = {
				comment: this.commentMore,
				user_id: this.$store.state.vhcUploadStep.userDetail.CusNo,
				ahistory_id: this.$store.state.vhcUploadStep.userDetail.id,
				amodel_id: this.$store.state.vhcUploadStep.userDetail.amodel_id,
				register: this.$store.state.vhcUploadStep.userDetail.register,
				Cus_Name: this.$store.state.vhcUploadStep.userDetail.Be,
				M_Tel: this.$store.state.vhcUploadStep.userDetail.M_Tel,
				dateCar: this.getCurrentDate(),
				timeCar: this.getCurrentTime(),
				DateOfBirth: this.$store.state.vhcUploadStep.userDetail.DateOfBirth,
				engin_id: this.$store.state.vhcUploadStep.userDetail.engin_id,
				chassis: this.$store.state.vhcUploadStep.userDetail.chassis,
				company_id: 73,
				// model_name: this.$store.state.vhcUploadStep.carDetail.model,
				model_name: this.$store.state.vhcUploadStep.userDetail.model_name,
				modelType_id: this.$store.state.vhcUploadStep.userDetail.amodel_id,
				mile_avg: this.$store.state.vhcUploadStep.carDetail.mile,
				staff_code: this.$store.state.login.loginResult.ID_Card,
				pdf: '',
				signatureImage: this.customer,
				signatureImageSA: this.sigSA,
				time_start: new Date(),
				cus_type: this.$store.state.vhcUploadStep.userDetail.cus_type,
				is_body_damage: '',
				blame_rainy: this.rain,
				blame_dust: this.dust,
				blame_drop: this.water,
				radio_pole: '',
				hbg_sticker: this.stickerCheck,
				checkList: this.checkList,
				todoList: this.$store.state.vhcUploadStep.todoList,
				picture8List: this.$store.state.vhcUploadStep.picture8List,
				stepList: this.$store.state.vhcUploadStep.stepList,
			};

			const result = await this.$store.dispatch('insertDataVHC', dataSend);
			if (result) {
				// console.log('result', result);
				// console.log('resultVHCid', result.vhcmasterId);
				const resultpdf = await this.$store.dispatch('generatepdf', { id: result.vhcmasterId });
				console.log('vhcmasterId' + resultpdf);
				this.$router.push({
					path: '/pdf/pdf',
					query: { id: resultpdf?.pdfFilename[0] },
				});
			} else {
				// Error Dialog
			}
		},
	},
};
</script>

<style>
canvas {
	border: 1px solid #ccc;
	width: 100%;
	max-width: 500px;
}

.button-end {
	text-align: center;
}

.color-box {
	margin-top: 10px;
	background-color: #efefef;
}

.text-distance {
	margin-left: 10px;
}

.radio-distance {
	margin-left: 20px;
}

.checkbox-distance {
	margin-left: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.text-dialog {
	justify-content: center;
}
.alert-message {
	color: red;
	font-size: 12px;
	margin-top: 5px;
}
.auto-size img {
	width: 100%;
	height: 100%;
	margin-right: 0px;
}
.auto-size {
	border: 2px solid gray;
	color: gray;
	background-color: white;
	padding: 0px 0px;
	border-radius: 8px;
	font-size: 20px;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	width: 320px;
	height: 200px;
	margin-right: 10px;
	margin-bottom: 20px;
}
.delete-icon {
	position: absolute;
	top: 5px;
	right: 5px;
	background-color: rgb(255, 255, 255);
	border-radius: 50%;
	color: rgb(199, 6, 6);
	width: 25px;
	height: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
}
.btn-distance {
	display: flex;
	justify-content: center;
}
.v-application p {
	margin-bottom: 0px;
}
.red-star {
	color: red; /* เปลี่ยนสีเป็นแดง */
	font-size: 1.2em; /* ปรับขนาดตัวอักษร */
	margin-left: 5px; /* ระยะห่างจากข้อความ */
}
</style>
