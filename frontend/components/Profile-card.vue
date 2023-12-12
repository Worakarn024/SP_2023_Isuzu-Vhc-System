<template>
	<v-card class="profile-card-size">
		<v-btn class="testcom" large @click="toggleDropdown">
			<v-card-title class="customPadding">
				<div id="proCard" class="cardFont">
					<div>{{ $store.state.login.loginResult.Name }} {{ $store.state.login.loginResult.Surname }}</div>
					<div class="caption">{{ $store.state.login.positionResult.position_name }}</div>
					<div class="caption">สาขา: {{ branch }}</div>
				</div>
				<v-menu v-model="dropdownOpen" :position-x="menuX" :position-y="menuY">
					<v-list class="dropdownMenu">
						<v-list-item @click="logout">
							<v-list-item-content>
								<v-list-item-title>Logout</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-card-title>
		</v-btn>
	</v-card>
</template>

<script>
export default {
	data() {
		return {
			branch: 'สี่แยกศรีทรายมูล เชียงราย',
			dropdownOpen: false,
			menuX: 0,
			menuY: 0,
		};
	},
	mounted() {
		this.$store.dispatch('login');
	},
	methods: {
		toggleDropdown() {
			const buttonElement = document.getElementById('proCard');
			const xPosition = buttonElement.getBoundingClientRect().right;
			const yPosition = buttonElement.getBoundingClientRect().bottom;
			this.menuX = xPosition;
			this.menuY = yPosition - 50;
			this.dropdownOpen = !this.dropdownOpen;
		},
		logout() {
			// Add the code to perform logout actions
		},
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

.customPadding {
	padding-top: 1px;
	justify-content: end;
	background-color: #cf1818;
}

.iconBut {
	background-color: transparent;
	padding: 6px;
}

.card {
	background-color: #cf1818;
}

.profile-card-size {
	margin: auto;
	size: auto !important;
	background-color: #cb2121 !important;
	box-shadow: none !important;
	height: max-content !important;
	text-align: right !important;
}

.cardFont {
	font-family: 'Kanit', sans-serif;
	color: aliceblue;
	font-size: 14px;
	margin-right: 10px;
	text-align: left;
}

.avatarCustom {
	size: 40px;
	border: 4px solid rgb(255, 255, 255);
	border-radius: 100%;
}

.logoutButton {
	background-color: #cf1818;
	color: #ffffff;
	border-radius: 20px;
	padding: 6px 16px;
	font-size: 12px;
	font-weight: bold;
}

.logoutButton:hover {
	background-color: #d32f2f;
}

.dropdownMenu {
	background-color: #ffffff;
	border-radius: 4px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	text-align: center;
}

.testcom {
	background-color: none !important;
	box-shadow: none !important;
	height: max-content !important;
	padding: 0% !important;
}

.v-menu__content {
	/* left: auto !important;
	right: 0 !important; */
	margin-top: 60px;
}
</style>
