<template>
	<v-container>
		<v-row class="d-flex justify-center">
			<!-- step 1 รูปที่ 1 -->

			<div id="button-container-1">
				<v-row class="d-flex justify-center">
					<div>
						<button class="btn-1">
							<img src="../assets/img/vhc/step1(incar).jpg" />
						</button>
					</div>

					<div v-for="(button, index) in step1Buttons" :key="index">
						<div class="wrapper">
							<button class="btn-1" @click="selectFile(1, index)" :id="'button-1-' + index">
								<img
									v-if="!button.selectedFile"
									src="../assets/img/vhc/capture.png"
									style="width: 40px; height: 40px"
								/>
								<img v-else :src="button.selectedFile" />
								<div v-if="button.selectedFile" class="delete-icon" @click="deleteButton(1, index)">
									<i class="mdi mdi-delete"></i>
								</div>
							</button>
							<input
								:ref="'fileInput1-' + index"
								accept="image/png, image/jpeg"
								type="file"
								:maxSize="314572800"
								style="display: none"
								required
								@change="previewFile(1, index, $event)"
							/>
							<span v-if="!button.selectedFile && button.showError" class="alert-message">โปรดเลือกรูปภาพ</span>
						</div>
					</div>
				</v-row>
			</div>
		</v-row>
		<br />
		<br />
		<!-- step 1 รูปที่ 2 -->
		<v-row class="d-flex justify-center">
			<div id="button-container-2">
				<v-row class="d-flex justify-center">
					<div>
						<button class="btn-1">
							<img src="../assets/img/vhc/step1(incar2).jpg" />
						</button>
					</div>

					<div v-for="(button, index) in step2Buttons" :key="index">
						<div class="wrapper">
							<button class="btn-1" @click="selectFile(2, index)" :id="'button-2-' + index">
								<img
									v-if="!button.selectedFile"
									src="../assets/img/vhc/capture.png"
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
			</div>
		</v-row>
		<br />
		<br />
		<!-- step 1 รูปที่ 3 -->
		<v-row class="d-flex justify-center">
			<v-row class="d-flex justify-center">
				<div>
					<button class="btn-1">
						<img src="../assets/img/vhc/step1(incar3).jpg" />
					</button>
				</div>

				<div v-for="(button, index) in step3Buttons" :key="index">
					<div class="wrapper">
						<button class="btn-1" @click="selectFile(3, index)" :id="'button-1-' + index">
							<img v-if="!button.selectedFile" src="../assets/img/vhc/capture.png" style="width: 40px; height: 40px" />
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
				</div>
			</v-row>
		</v-row>
		<br />
		<div><v-text-field v-model="step1comment" label="รายละเอียดเพิ่มเติมขั้นตอนที่ 1" filled /></div>
		<p>รายงานปัญหาเพิ่มเติม ( ถ้ามี )</p>

		<v-row class="justify-center">
			<button-text ref="imageRef" :editable="editable" :editableText="editableText" />
		</v-row>
	</v-container>
</template>
<script>
import { mapActions } from 'vuex';
export default {
	data() {
		return {
			step1comment: '',
			editableText: true,
			editable: false,
			dialog: false,
			step1Buttons: [
				{
					selectedFile: null,
					showError: false,
				},
			],
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

			showAddButtonAlert: false,
		};
	},
	computed: {
		canAddButton() {
			return this.checkImagesSelected(3);
		},
		page() {
			return 'สร้างรายการ VHC';
		},
	},
	watch: {
		step1Buttons: {
			handler(value) {
				this.editValridate();
			},
			deep: true,
		},
		step2Buttons: {
			handler(value) {
				this.editValridate();
			},
			deep: true,
		},
		step3Buttons: {
			handler(value) {
				this.editValridate();
			},
			deep: true,
		},
	},

	methods: {
		...mapActions(['commentSet']),
		handleAddButtonClick(step) {
			let buttons;

			if (step === 1) {
				buttons = this.step1Buttons;
			} else if (step === 2) {
				buttons = this.step2Buttons;
			} else if (step === 3) {
				buttons = this.step3Buttons;
			}

			const missingImageButton = buttons.some((button) => button.selectedFile === null);

			if (missingImageButton) {
				buttons.forEach((button) => {
					button.showError = button.selectedFile === null;
				});

				// Set the flag to show the alert message
				this.showAddButtonAlert = true;
			} else {
				buttons.push({
					selectedFile: null,
					showError: false,
				});

				// Reset the flag if the button is added successfully
				this.showAddButtonAlert = false;

				// Insert a line break after each row of buttons
				const rowCount = Math.ceil(buttons.length / 3);
				if (rowCount > 1) {
					const buttonContainer = document.getElementById(`button-container-${step}`);
					const lineBreak = document.createElement('br');
					buttonContainer.appendChild(lineBreak);
				}
			}
		},
		editValridate() {
			if (
				this.step1Buttons.some((button) => button.selectedFile === null) ||
				this.step2Buttons.some((button) => button.selectedFile === null) ||
				this.step3Buttons.some((button) => button.selectedFile === null)
			) {
				this.editable = false;
				this.editableText = true;
			} else {
				this.editable = true;
				this.editableText = false;
			}
		},
		validateImg() {
			const additionalCheck = this.$refs.imageRef.validateImgText();
			let stepImageCheck = false;
			if (
				this.step1Buttons.some((button) => button.selectedFile === null) ||
				this.step2Buttons.some((button) => button.selectedFile === null) ||
				this.step3Buttons.some((button) => button.selectedFile === null)
			) {
				this.step1Buttons.forEach((button) => {
					button.showError = true;
				});
				this.step2Buttons.forEach((button) => {
					button.showError = true;
				});
				this.step3Buttons.forEach((button) => {
					button.showError = true;
				});
				stepImageCheck = false;
			}
			return additionalCheck || stepImageCheck;
		},

		returnImageData() {
			const data = {};
			const additionalInfo = this.$refs.imageRef.returnData();

			data.step = [
				{
					image: this.step1Buttons[0].selectedFile,
				},
				{
					image: this.step2Buttons[0].selectedFile,
				},
				{
					image: this.step3Buttons[0].selectedFile,
				},
			];
			data.additional = additionalInfo;
			data.comment = this.step1comment;

			return data;
		},

		checkImagesSelected(step) {
			let buttons;

			if (step === 1) {
				buttons = this.step1Buttons;
			} else if (step === 2) {
				buttons = this.step2Buttons;
			} else if (step === 3) {
				buttons = this.step3Buttons;
			}

			const allButtonsSelected = buttons.every((button) => button.selectedFile);

			return allButtonsSelected;
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
								if (step === 1) {
									buttons = this.step1Buttons;
								} else if (step === 2) {
									buttons = this.step2Buttons;
								} else if (step === 3) {
									buttons = this.step3Buttons;
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
				if (step === 1) {
					buttons = this.step1Buttons;
				} else if (step === 2) {
					buttons = this.step2Buttons;
				} else if (step === 3) {
					buttons = this.step3Buttons;
				}

				buttons[index].selectedFile = reader.result;

				// Reset the flag to hide the alert message when an image is selected
				this.showAddButtonAlert = false;
			};
		},

		deleteButton(step, index) {
			let buttons;
			if (step === 1) {
				buttons = this.step1Buttons;
			} else if (step === 2) {
				buttons = this.step2Buttons;
			} else if (step === 3) {
				buttons = this.step3Buttons;
			}
			buttons[index].selectedFile = null;
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
	padding: 0px 0px;
	border-radius: 8px;
	font-size: 20px;
	font-weight: bold;

	width: 160px;
	height: 110px;
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
</style>
