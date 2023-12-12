<template>
	<v-app>
		<v-main>
			<v-container fluid fill-height>
				<v-layout align-center justify-center>
					<v-flex xs12 sm8 md4>
						<v-card class="elevation-12">
							<v-toolbar dark color="#CF1818">
								<!-- <v-toolbar-title>{{ isRegister ? stateObj.register.name : stateObj.login.name }} VHC</v-toolbar-title> -->
								<v-toolbar-title>{{ isRegister ? stateObj.register.name : 'นกเหงือก VHC APP' }}</v-toolbar-title>
							</v-toolbar>
							<v-card-text>
								<div class="image-container">
									<img src="../assets/img/Homepage Icon/birdicon.png" style="width: 140px; height: 120px" />
								</div>
								<form ref="form" @submit.prevent="isRegister ? register() : login()">
									<v-text-field
										v-model="username"
										name="username"
										label="ชื่อพนักงาน"
										type="text"
										placeholder="ชื่อพนักงาน"
										required
									></v-text-field>

									<v-text-field
										v-model="password"
										name="password"
										label="รหัสผ่าน"
										type="password"
										placeholder="รหัสผ่าน"
										required
									></v-text-field>

									<v-select v-model="selectedItem" :items="items" label="โปรดเลือกตำแหน่ง"></v-select>

									<div class="red--text">{{ errorMessage }}</div>
									<v-btn type="submit" class="col mt-4" color="primary" value="log in">{{
										isRegister ? stateObj.register.name : stateObj.login.name
									}}</v-btn>
								</form>
							</v-card-text>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			selectedItem: null,
			items: [
				'ผู้จัดการงานบริการ',
				'ที่ปรึกษางานบริการ',
				'พนักงานบริการ',
				// Add more items as needed
			],
			username: '',
			password: '',
			confirmPassword: '',
			isRegister: false,
			errorMessage: '',
			stateObj: {
				register: {
					name: 'Register',
					message: 'Aleady have an Acoount? login.',
				},
				login: {
					name: 'Login',
					message: 'Register',
				},
			},
		};
	},
	methods: {
		login() {
			// Check if entered values match predefined values
			if (this.username === 'จิรา' && this.password === '1570780257840' && this.selectedItem === 'ที่ปรึกษางานบริการ') {
				// Clear error message
				this.errorMessage = '';

				// Perform your login logic or any other actions here

				// Use the router to navigate to the Dashboard page
				this.$router.push('/');
			} else {
				// Display an error message or take appropriate action
				this.errorMessage = 'ข้อมูลประจำตัวที่ไม่ถูกต้อง. กรุณาตรวจสอบชื่อผู้ใช้ รหัสผ่าน และโปรดเลือกตำแหน่ง';
			}
		},
		register() {
			if (this.password === this.confirmPassword) {
				this.isRegister = false;
				this.errorMessage = '';
				this.$refs.form.reset();
			} else {
				this.errorMessage = 'password did not match';
			}
		},
	},
	computed: {
		toggleMessage: function () {
			return this.isRegister ? this.stateObj.register.message : this.stateObj.login.message;
		},
	},
};
</script>

<style scoped>
.image-container {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px; /* Adjust as needed */
}
</style>
