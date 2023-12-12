<template>
	<v-app dark>
		<v-app-bar :clipped-right="clipped" fixed app color="#CF1818" height="80px">
			<v-toolbar-title class="Headtitle">{{ title }}</v-toolbar-title>
			<v-responsive class="profile-card-container" height="80px" width="10px">
				<profile-card v-if="$route.path === '/'">index</profile-card>
			</v-responsive>
			<!-- Content -->
		</v-app-bar>
		<v-main>
			<v-container>
				<Nuxt />
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'DefaultLayout',
	data() {
		return {
			clipped: false,
			drawer: false,
			fixed: false,
			items: [
				{
					icon: 'mdi-apps',
					title: 'Welcome',
					to: '/',
				},
				{
					icon: 'mdi-chart-bubble',
					title: 'Inspire',
					to: '/inspire',
				},
			],
			miniVariant: false,
			right: true,
			rightDrawer: false,
			title: 'Home',
			branchname: 'เชียงราย',
		};
	},
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
.Headtitle {
	font-family: 'Kanit', sans-serif;
	font-weight: bold;
	font-size: 24px;
	color: azure;
}

.margin {
	margin-right: 200px;
}

.branch {
	background-color: red;
	height: 25px;
	width: auto;
	text-align: center;
	font-family: 'Kanit', sans-serif;
	color: azure;
}

.profile-card-container {
	display: flex;
	justify-content: right;
}
</style>
