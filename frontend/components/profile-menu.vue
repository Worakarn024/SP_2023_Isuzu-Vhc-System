<template>
	<v-menu offset-y>
		<template #activator="{ on }">
			<v-avatar v-on="on">
				<img src="../assets/img/Homepage Icon/admin.png" />
			</v-avatar>
		</template>
		<v-list>
			<v-list-item @click="logout">
				<v-list-item-title>ออกจากระบบ</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>
</template>

<script>
export default {
	methods: {
		logout() {
			this.$router.push('/search/searchData');
		},
	},
};
</script>

<style></style>
