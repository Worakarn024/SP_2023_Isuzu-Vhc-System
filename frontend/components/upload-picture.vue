<template>
	<div class="upload-btn-wrapper">
		<button class="btn" :disabled="!editable" @click="selectFile">
			<img v-if="!selectedFile" src="../assets/img/vhc/upload.png" style="width: 80px; height: 80px" />
			<img v-else :src="selectedFile" />
		</button>
		<input
			ref="fileInput"
			accept="image/png, image/jpeg"
			type="file"
			:disabled="!editable || selectedFile"
			style="display: none"
			:maxSize="314572800"
			@change="previewFile"
		/>
		<button v-if="selectedFile" class="clear-btn" @click="clearFile"><i class="mdi mdi-delete"></i></button>
	</div>
</template>

<script>
export default {
	props: {
		editable: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			selectedFile: null,
		};
	},
	methods: {
		selectFile() {
			if (this.editable) {
				this.$refs.fileInput.click();
			}
		},
		previewFile(event) {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.selectedFile = reader.result;
			};
		},
		clearFile() {
			if (this.editable) {
				this.selectedFile = null;
			}
		},
		handlePictureUpload(event) {
			if (this.editable) {
				// Perform any necessary actions with the uploaded picture
			}
		},
	},
};
</script>

<style>
.upload-btn-wrapper {
	position: relative;
	overflow: hidden;
	display: inline-block;
}

.btn {
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
	width: 300px;
	height: 250px;
	margin-right: 10px;
	margin-bottom: 20px;
}

.btn img {
	width: 100%;
	height: 100%;
	margin-right: 0px;
}

.upload-btn-wrapper input[type='file'] {
	font-size: 100px;
	position: absolute;
	left: 0;
	top: 0;
	opacity: 0;
}

.clear-btn {
	position: absolute;
	top: 5px;
	right: 15px;
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
