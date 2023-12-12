<template>
	<nav class="navbar">
		<button class="backBut" @click="goBack">
			<v-icon>mdi-light mdi-chevron-left</v-icon>
		</button>
		<h1 class="text-center">{{ title }}</h1>
	</nav>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'MyApp',
		},
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
	},
};
</script>

<style>
.navbar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: #cf1818;
	height: 68px;
	padding: 10px;
}
.backBut {
	background-color: #cf1818;
}

.text-center {
	flex: 1;
	text-align: center;
	color: white;
}

@media screen and (max-width: 768px) {
	.navbar {
		/* flex-direction: column; */
		height: auto;
	}

	.Text-center {
		margin-top: 20px;
		margin-bottom: 20px;
	}
}
</style>
