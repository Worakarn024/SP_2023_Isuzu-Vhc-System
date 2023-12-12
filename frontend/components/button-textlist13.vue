<template>
	<div>
		<div v-for="(button, index) in step1Buttons" :key="index">
			<button :id="'button-1-' + index" class="btn-1" @click="selectFile(1, index)">
				<img v-if="!button.selectedFile" src="../assets/img/vhc/capture.png" style="width: 40px; height: 40px" />
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
			<br />
			<v-text-field
				v-model="button.comment"
				class="center-button"
				label="รายละเอียดเพิ่มเติม"
				filled
				:style="{ width: '85%', height: '100%' }"
			/>
			<span v-if="!button.comment && button.showError" class="alert-message">โปรดกรอกรายละเอียดเพิ่มเติม</span>
		</div>

		<button class="btn-1" @click="addButton">
			<img src="../assets/img/vhc/add-image.png" style="width: 40px; height: 40px" />
		</button>
		<br />
	</div>
</template>

<script>
export default {
	props: {
		editable: {
			type: Boolean,
			default: true,
		},
		editableText: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			showimg: false,
			showTextField: false, // Initially hide the text field

			step1Buttons: [
				{
					selectedFile: null,
					comment: '',
					showError: false,
				},
			],
		};
	},

	computed: {
		showAddButton() {
			return this.step1Buttons.length === 1;
		},
		page() {
			return 'สร้างรายการ VHC';
		},
	},
	watch: {
		editable: {
			handler(value) {
				this.editInbuttonText = value;
			},
			deep: true,
		},
	},
	methods: {
		validateImgTextList() {
			const hasValidInput = this.step1Buttons.some((button) => button.selectedFile !== null && button.comment !== '');

			if (hasValidInput) {
				this.step1Buttons.forEach((button) => {
					button.showError = true;
				});
				return true;
			} else {
				this.step1Buttons.forEach((button) => {
					if (button.selectedFile === null || button.comment === '') {
						button.showError = true;
					} else {
						button.showError = false;
					}
				});
				return false;
			}
		},
		addButton() {
			const allButtonsValid = this.step1Buttons.every(
				(button) => button.selectedFile !== null && button.comment !== ''
			);

			if (allButtonsValid || this.step1Buttons.length === 0) {
				this.step1Buttons.push({
					selectedFile: null,
					comment: '',
					showError: false,
				});
				this.showimg = true;
				this.showTextField = true;
			} else {
				this.step1Buttons.forEach((button) => {
					if (button.selectedFile === null) {
						button.showError = true;
					} else if (button.comment === '') {
						button.showError = true;
					} else if (button.selectedFile === null && button.comment === '') {
						button.showError = true;
					}
				});
			}
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
			}
			buttons.splice(index, 1);
		},
		returnData() {
			return this.step1Buttons;
		},
	},
};
</script>

<style>
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
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	width: 160px;
	height: 110px;
	margin-right: 10px;
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
