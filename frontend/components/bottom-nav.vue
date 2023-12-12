<template>
	<v-bottom-navigation app background-color="#D9D9D9" height="76px" w-100 bottom grow>
		<button @click="$router.push('/')">
			<img width="45px" hight="45px" radius="25" src="../assets/img/Homepage Icon/home.png" />
			<br />
			<span class="fontEdit">Home</span>
		</button>
	</v-bottom-navigation>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');

.fontEdit {
	font-family: 'Kanit', sans-serif;
	color: #653333;
	font-size: 14px;
}
</style>
