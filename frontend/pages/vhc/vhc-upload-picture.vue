<template>
	<div>
		<nav-title :title="page" />
		<v-container>
			<h3>การบันทึกรูปภาพ (ขั้นตอนที่ 1 ภายในรถ)<span class="red-star">*</span></h3>
			<hr />
			<vhc-step1 ref="step1ref" />

			<h3>การบันทึกรูปภาพ (ขั้นตอนที่ 2 ด้านหน้ารถ)<span class="red-star">*</span></h3>
			<hr />

			<v-container>
				<v-row class="justify-center">
					<div>
						<button class="btn-1">
							<img src="../../assets/img/vhc/frontcar.jpg" />
						</button>
					</div>
					<div v-for="(button, index) in step2Buttons" :key="index">
						<div>
							<button class="btn-1" @click="selectFile(2, index)">
								<img
									v-if="!button.selectedFile"
									src="../../assets/img/vhc/capture.png"
									style="width: 40px; height: 40px"
								/>
								<img v-else :src="button.selectedFile" />
								<div v-if="button.selectedFile" class="delete-icon" @click="deleteButton(2, index)">
									<i class="mdi mdi-delete"></i>
								</div>
							</button>
							<input
								:ref="'fileInput2-' + index"
								accept="image/png, image/jpeg"
								type="file"
								:maxSize="314572800"
								style="display: none"
								required
								@change="previewFile(2, index, $event)"
							/>
							<span v-if="!button.selectedFile && button.showError" class="alert-message">โปรดเลือกรูปภาพ</span>
						</div>
					</div>
				</v-row>
				<br />
				<div><v-text-field v-model="step2comment" label="รายละเอียดเพิ่มเติมขั้นตอนที่ 2" filled /></div>

				<p>รายงานปัญหาเพิ่มเติม ( ถ้ามี )</p>
				<v-row class="justify-center">
					<button-text ref="imageRef2" :editable="editable2" :editable-text="editableText2" />
				</v-row>
			</v-container>

			<h3>การบันทึกรูปภาพ (ขั้นตอนที่ 3 มุมซ้ายของรถ)<span class="red-star">*</span></h3>
			<hr />

			<v-container fluid>
				<v-row class="justify-center">
					<div>
						<button class="btn-1">
							<img src="../../assets/img/vhc/leftcar.jpg" />
						</button>
					</div>
					<div v-for="(button, index) in step3Buttons" :key="index">
						<button class="btn-1" @click="selectFile(3, index)">
							<img
								v-if="!button.selectedFile"
								src="../../assets/img/vhc/capture.png"
								style="width: 40px; height: 40px"
							/>
							<img v-else :src="button.selectedFile" />
							<div v-if="button.selectedFile" class="delete-icon" @click="deleteButton(3, index)">
								<i class="mdi mdi-delete"></i>
							</div>
						</button>
						<input
							:ref="'fileInput3-' + index"
							accept="image/png, image/jpeg"
							type="file"
							:maxSize="314572800"
							style="display: none"
							required
							@change="previewFile(3, index, $event)"
						/>
						<span v-if="!button.selectedFile && button.showError" class="alert-message">โปรดเลือกรูปภาพ</span>
					</div>
				</v-row>
				<br />
				<div><v-text-field v-model="step3comment" label="รายละเอียดเพิ่มเติมขั้นตอนที่ 3" filled /></div>

				<p>รายงานปัญหาเพิ่มเติม ( ถ้ามี )</p>
				<v-row class="justify-center">
					<button-text ref="imageRef3" :editable="editable3" :editable-text="editableText3" />
				</v-row>
			</v-container>

			<h3>การบันทึกรูปภาพ (ขั้นตอนที่ 4 หลังรถ)<span class="red-star">*</span></h3>
			<hr />

			<v-container fluid>
				<v-row class="justify-center">
					<div>
						<button class="btn-1">
							<img src="../../assets/img/vhc/backcar.jpg" />
						</button>
					</div>
					<div v-for="(button, index) in step4Buttons" :key="index">
						<div class="wrapper">
							<button class="btn-1" @click="selectFile(4, index)">
								<img
									v-if="!button.selectedFile"
									src="../../assets/img/vhc/capture.png"
									style="width: 40px; height: 40px"
								/>
								<img v-else :src="button.selectedFile" />
								<div v-if="button.selectedFile" class="delete-icon" @click="deleteButton(4, index)">
									<i class="mdi mdi-delete"></i>
								</div>
							</button>
							<input
								:ref="'fileInput4-' + index"
								accept="image/png, image/jpeg"
								type="file"
								:maxSize="314572800"
								style="display: none"
								required
								@change="previewFile(4, index, $event)"
							/>
							<span v-if="!button.selectedFile && button.showError" class="alert-message">โปรดเลือกรูปภาพ</span>
						</div>
					</div>
				</v-row>
				<br />
				<div><v-text-field v-model="step4comment" label="รายละเอียดเพิ่มเติมขั้นตอนที่ 4" filled /></div>

				<p>รายงานปัญหาเพิ่มเติม ( ถ้ามี )</p>
				<v-row class="justify-center">
					<button-text ref="imageRef4" :editable="editable4" :editable-text="editableText4" />
				</v-row>
			</v-container>

			<h3>การบันทึกรูปภาพ (ขั้นตอนที่ 5 มุมขวาของรถ)<span class="red-star">*</span></h3>
			<hr />

			<v-container fluid>
				<v-row class="justify-center">
					<div>
						<button class="btn-1">
							<img src="../../assets/img/vhc/rightcar.jpg" />
						</button>
					</div>
					<div v-for="(button, index) in step5Buttons" :key="index">
						<div class="wrapper">
							<button class="btn-1" @click="selectFile(5, index)">
								<img
									v-if="!button.selectedFile"
									src="../../assets/img/vhc/capture.png"
									style="width: 40px; height: 40px"
								/>
								<img v-else :src="button.selectedFile" />
								<div v-if="button.selectedFile" class="delete-icon" @click="deleteButton(5, index)">
									<i class="mdi mdi-delete"></i>
								</div>
							</button>
							<input
								:ref="'fileInput5-' + index"
								accept="image/png, image/jpeg"
								type="file"
								:maxSize="314572800"
								style="display: none"
								required
								@change="previewFile(5, index, $event)"
							/>
							<span v-if="!button.selectedFile && button.showError" class="alert-message">โปรดเลือกรูปภาพ</span>
						</div>
					</div>
				</v-row>
				<br />
				<div><v-text-field v-model="step5comment" label="รายละเอียดเพิ่มเติมขั้นตอนที่ 5" filled /></div>

				<p>รายงานปัญหาเพิ่มเติม ( ถ้ามี )</p>
				<v-row class="justify-center">
					<button-text ref="imageRef5" :editable="editable5" :editable-text="editableText5" />
				</v-row>
			</v-container>

			<h3>การบันทึกรูปภาพ (ขั้นตอนที่ 6 ตัวเครื่องรถ)<span class="red-star">*</span></h3>
			<hr />

			<v-container fluid>
				<v-row class="justify-center">
					<div>
						<button class="btn-1">
							<img src="../../assets/img/vhc/innervech.jpg" />
						</button>
					</div>
					<div v-for="(button, index) in step6Buttons" :key="index">
						<div class="wrapper">
							<button class="btn-1" @click="selectFile(6, index)">
								<img
									v-if="!button.selectedFile"
									src="../../assets/img/vhc/capture.png"
									style="width: 40px; height: 40px"
								/>
								<img v-else :src="button.selectedFile" />
								<div v-if="button.selectedFile" class="delete-icon" @click="deleteButton(6, index)">
									<i class="mdi mdi-delete"></i>
								</div>
							</button>
							<input
								:ref="'fileInput6-' + index"
								accept="image/png, image/jpeg"
								type="file"
								:maxSize="314572800"
								style="display: none"
								required
								@change="previewFile(6, index, $event)"
							/>
							<span v-if="!button.selectedFile && button.showError" class="alert-message">โปรดเลือกรูปภาพ</span>
						</div>
					</div>
				</v-row>
				<br />
				<div><v-text-field v-model="step6comment" label="รายละเอียดเพิ่มเติมขั้นตอนที่ 6" filled /></div>

				<p>รายงานปัญหาเพิ่มเติม ( ถ้ามี )</p>
				<v-row class="justify-center">
					<button-text ref="imageRef6" :editable="editable6" :editable-text="editableText6" />
				</v-row>
			</v-container>

			<div class="uploadbottombutt">
				<v-btn
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default uploadbottombuttmargin"
					style="background: transparent; border: 1px solid"
					@click="toBack"
					>ย้อนกลับ</v-btn
				>

				<v-btn
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark uploadbottombuttmargin"
					style="background: #ed1c24; width: 95px; color: white"
					@click="nextPage"
					>ต่อไป</v-btn
				>
			</div>
			<v-dialog v-model="dialog" persistent :max-width="300" :max-height="300">
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
		</v-container>
	</div>
</template>

<script>
import buttonText from '../../components/button-text.vue';
export default {
	components: { buttonText },
	data() {
		return {
			// one: 1,
			step2comment: '',
			step3comment: '',
			step4comment: '',
			step5comment: '',
			step6comment: '',
			editableText2: true,
			editable2: false,
			editableText3: true,
			editable3: false,
			editableText4: true,
			editable4: false,
			editableText5: true,
			editable5: false,
			editableText6: true,
			editable6: false,

			dialog: false,

			step2Buttons: [
				{
					selectedFile: null,
					showError: false,
				},
			],
			step3Buttons: [
				{
					selectedFile: null,
					showError: false,
				},
			],
			step4Buttons: [
				{
					selectedFile: null,
					showError: false,
				},
			],
			step5Buttons: [
				{
					selectedFile: null,
					showError: false,
				},
			],
			step6Buttons: [
				{
					selectedFile: null,
					showError: false,
				},
			],
		};
	},
	computed: {
		page() {
			return 'สร้างรายการ VHC';
		},
	},
	watch: {
		step2Buttons: {
			handler(value) {
				if (this.step2Buttons.some((button) => button.selectedFile === null)) {
					this.editable2 = false;
					this.editableText2 = true;
				} else {
					this.editable2 = true;
					this.editableText2 = false;
				}
			},
			deep: true,
		},
		step3Buttons: {
			handler(value) {
				if (this.step3Buttons.some((button) => button.selectedFile === null)) {
					this.editable3 = false;
					this.editableText3 = true;
				} else {
					this.editable3 = true;
					this.editableText3 = false;
				}
			},
			deep: true,
		},
		step4Buttons: {
			handler(value) {
				if (this.step4Buttons.some((button) => button.selectedFile === null)) {
					this.editable4 = false;
					this.editableText4 = true;
				} else {
					this.editable4 = true;
					this.editableText4 = false;
				}
			},
			deep: true,
		},
		step5Buttons: {
			handler(value) {
				if (this.step5Buttons.some((button) => button.selectedFile === null)) {
					this.editable5 = false;
					this.editableText5 = true;
				} else {
					this.editable5 = true;
					this.editableText5 = false;
				}
			},
			deep: true,
		},
		step6Buttons: {
			handler(value) {
				if (this.step6Buttons.some((button) => button.selectedFile === null)) {
					this.editable6 = false;
					this.editableText6 = true;
				} else {
					this.editable6 = true;
					this.editableText6 = false;
				}
			},
			deep: true,
		},
	},

	methods: {
		toBack() {
			this.$router.go(-1);
		},

		selectFile(step, index) {
			// Check if the device supports media devices and getUserMedia
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				// Check if the device is a mobile device
				const isMobileDevice = /Mobi/.test(navigator.userAgent);

				if (isMobileDevice) {
					// If it's a mobile device, use the file input method
					this.$refs['fileInput' + step + '-' + index][0].click();
				} else {
					// If it's not a mobile device, access the device's camera
					const videoConstraints = {
						video: {
							width: { ideal: 1920 },
							height: { ideal: 1080 },
							facingMode: 'environment', // Use the rear camera
						},
					};

					navigator.mediaDevices
						.getUserMedia(videoConstraints)
						.then((stream) => {
							// Create a video element to display the camera stream
							const video = document.createElement('video');
							video.setAttribute('autoplay', true);
							video.setAttribute('style', 'display: none');
							document.body.appendChild(video);

							// Set the video source to the camera stream
							video.srcObject = stream;

							// Store the video element in data to access it later
							this.$data.videoElement = video;

							// Create a canvas element to capture a frame from the video
							const canvas = document.createElement('canvas');
							const context = canvas.getContext('2d');
							canvas.width = 320; // Set the canvas width to match the button's width
							canvas.height = 200; // Set the canvas height to match the button's height
							document.body.appendChild(canvas);

							// Continuously capture frames from the video stream and update the button's background image
							const updatePreview = () => {
								context.drawImage(video, 0, 0, canvas.width, canvas.height);
								const dataURL = canvas.toDataURL('image/jpeg');

								let buttons;
								if (step === 2) {
									buttons = this.step2Buttons;
								} else if (step === 3) {
									buttons = this.step3Buttons;
								} else if (step === 4) {
									buttons = this.step4Buttons;
								} else if (step === 5) {
									buttons = this.step5Buttons;
								} else if (step === 6) {
									buttons = this.step6Buttons;
								}
								buttons[index].selectedFile = dataURL;

								const buttonId = 'button-' + step + '-' + index;
								const buttonElement = document.getElementById(buttonId);
								if (buttonElement) {
									buttonElement.style.backgroundImage = 'url(' + dataURL + ')';
								}

								requestAnimationFrame(updatePreview);
							};

							// Start updating the preview
							updatePreview();
						})
						.catch((error) => {
							console.error('Error accessing camera:', error);
						});
				}
			} else {
				// If the device doesn't support media devices or getUserMedia
				// fall back to the file input method
				this.$refs['fileInput' + step + '-' + index][0].click();
			}
		},

		previewFile(step, index, event) {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				let buttons;
				if (step === 2) {
					buttons = this.step2Buttons;
				} else if (step === 3) {
					buttons = this.step3Buttons;
				} else if (step === 4) {
					buttons = this.step4Buttons;
				} else if (step === 5) {
					buttons = this.step5Buttons;
				} else if (step === 6) {
					buttons = this.step6Buttons;
				}
				buttons[index].selectedFile = reader.result;
			};
		},
		deleteButton(step, index) {
			let buttons;
			if (step === 2) {
				buttons = this.step2Buttons;
			} else if (step === 3) {
				buttons = this.step3Buttons;
			} else if (step === 4) {
				buttons = this.step4Buttons;
			} else if (step === 5) {
				buttons = this.step5Buttons;
			} else if (step === 6) {
				buttons = this.step6Buttons;
			}
			buttons[index].selectedFile = null;
		},
		confirmDialog() {
			this.dialog = false;
		},
		nextPage() {
			// console.log(
			// 	this.$refs.step1ref.validateImg(),
			// 	this.$refs.imageRef2.validateImgText(),
			// 	this.$refs.imageRef3.validateImgText(),
			// 	this.$refs.imageRef4.validateImgText(),
			// 	this.$refs.imageRef5.validateImgText(),
			// 	this.$refs.imageRef6.validateImgText()
			// );
			// console.log(this.step2Buttons[0].selectedFile); // ใช้ตัวแปรนี้ validate รูป
			// if (
			// 	this.$refs.step1ref.validateImg() === false ||
			// 	this.$refs.imageRef2.validateImgText() === false
			// 	// this.$refs.imageRef3.validateImgText() !== true ||
			// 	// this.$refs.imageRef4.validateImgText() !== true ||
			// 	// this.$refs.imageRef5.validateImgText() !== true ||
			// 	// this.$refs.imageRef6.validateImgText() !== true
			// ) {
			// 	this.dialog = true;
			// 	console.log('ไปไม่ได้');
			// } else {
			// 	console.log('ไปหน้าต่อไปได้');
			// }
			const step1Check = this.$refs.step1ref.validateImg();
			const step2AdditionalCheck = this.$refs.imageRef2.validateImgText();
			const step3AdditionalCheck = this.$refs.imageRef3.validateImgText();
			const step4AdditionalCheck = this.$refs.imageRef4.validateImgText();
			const step5AdditionalCheck = this.$refs.imageRef5.validateImgText();
			const step6AdditionalCheck = this.$refs.imageRef6.validateImgText();
			if (
				step1Check &&
				step2AdditionalCheck &&
				step3AdditionalCheck &&
				step4AdditionalCheck &&
				step5AdditionalCheck &&
				step6AdditionalCheck
			) {
				return;
			}

			if (
				this.step2Buttons.some((button) => button.selectedFile === null) ||
				this.step3Buttons.some((button) => button.selectedFile === null) ||
				this.step4Buttons.some((button) => button.selectedFile === null) ||
				this.step5Buttons.some((button) => button.selectedFile === null) ||
				this.step6Buttons.some((button) => button.selectedFile === null)
			) {
				this.step2Buttons.forEach((button) => {
					button.showError = true;
				});
				this.step3Buttons.forEach((button) => {
					button.showError = true;
				});
				this.step4Buttons.forEach((button) => {
					button.showError = true;
				});
				this.step5Buttons.forEach((button) => {
					button.showError = true;
				});
				this.step6Buttons.forEach((button) => {
					button.showError = true;
				});
				this.dialog = true;
			} else {
				const payload = {
					step: 0,
					data: [],
				};
				// Step1
				const data = this.$refs.step1ref.returnImageData();
				payload.data = data.step.map((data) => data.image);

				const step1 = {
					image1: data.step[0].image,
					image2: data.step[1].image,
					image3: data.step[2].image,
				};

				const comment1 = {
					id: '1',
					comment: data.comment,
				};

				// Step2
				const step2 = {
					image4: this.step2Buttons[0].selectedFile,
				};

				const additional2 = this.$refs.imageRef2.returnData();

				const comment2 = {
					id: '2',
					comment: this.step2comment,
				};

				// Step3
				const step3 = {
					image5: this.step3Buttons[0].selectedFile,
				};

				const additional3 = this.$refs.imageRef3.returnData();

				const comment3 = {
					id: '3',
					comment: this.step3comment,
				};

				// Step4
				const step4 = {
					image6: this.step4Buttons[0].selectedFile,
				};

				const additional4 = this.$refs.imageRef4.returnData();

				const comment4 = {
					id: '4',
					comment: this.step4comment,
				};

				// Step5
				const step5 = {
					image7: this.step5Buttons[0].selectedFile,
				};

				const additional5 = this.$refs.imageRef5.returnData();

				const comment5 = {
					id: '5',
					comment: this.step5comment,
				};

				// Step6
				const step6 = {
					image8: this.step6Buttons[0].selectedFile,
				};

				const additional6 = this.$refs.imageRef6.returnData();

				const comment6 = {
					id: '6',
					comment: this.step6comment,
				};

				// const dataAll = step1.concat(step2, step3, step4, step5, step6);
				const dataAll = [Object.assign({}, step1, step2, step3, step4, step5, step6)];
				const additionalAll = data.additional.concat(additional2, additional3, additional4, additional5, additional6);
				const stepAdditionalAll = [];
				const commentAll = [comment1, comment2, comment3, comment4, comment5, comment6];

				let idValue = 0;

				additionalAll.forEach((value, key) => {
					idValue = idValue + 1;
					const data = {
						key: idValue,
						massage: value.comment,
						voice: '',
						image: value.selectedFile,
					};
					stepAdditionalAll.push(data);
				});

				this.$store.dispatch('setpictureStep', dataAll);
				this.$store.dispatch('setadditionalStep', stepAdditionalAll);
				this.$store.dispatch('setcommentStep', commentAll);

				this.$router.push('/vhc/preliminary-check');
			}
		},
		async sleepTime(duration, ...args) {
			await new Promise((resolve) => setTimeout(resolve, duration));
		},
	},
};
</script>

<style>
.uploadbottombutt {
	margin-right: auto;
	text-align: center;
	padding-bottom: 30px;
}

.uploadbottombuttmargin {
	margin: 0px;
}

.alert-message {
	color: red;
	font-size: 12px;
	margin-top: 5px;
}
.btn-1 img {
	width: 100%;
	height: 100%;
	margin-right: 0px;
}

.btn-1 {
	border: 2px solid gray;
	color: gray;
	background-color: white;
	padding: 0px;
	border-radius: 8px;
	font-size: 20px;
	font-weight: bold;
	position: relative;
	width: 160px;
	height: 110px;
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
.text-dialog {
	justify-content: center;
}
.btn-distance {
	display: flex;
	justify-content: center;
}
.red-star {
	color: red; /* เปลี่ยนสีเป็นแดง */
	font-size: 1.2em; /* ปรับขนาดตัวอักษร */
	margin-left: 5px; /* ระยะห่างจากข้อความ */
}
</style>
