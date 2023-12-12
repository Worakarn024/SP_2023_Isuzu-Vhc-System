<template>
	<div class="searchBar_center">
		<div class="radio_position">
			<input
				v-model="searchType_register"
				type="radio"
				value="register"
				class="searchBar_radio"
				@click="searchMethodSelect('register')"
			/>
			ป้ายทะเบียน
			<input
				v-model="searchType_cus_Name"
				type="radio"
				value="cus_Name"
				class="searchBar_radio"
				@click="searchMethodSelect('cus_Name')"
			/>
			ชื่อลูกค้า
		</div>
		<div class="searchBarContainer">
			<input
				v-model="query"
				type="text"
				class="searchBar"
				placeholder="กรอกข้อมูลป้ายทะเบียนหรือชื่อลูกค้าเพื่อค้นหา"
				style="font-size: 12px"
				@keyup.enter="search"
			/>
			<button class="btnSearch" style="border-top-right-radius: 50em; border-bottom-right-radius: 50em" @click="search">
				Search
			</button>
			<br />
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			query: '',
			searchType_register: 'register',
			searchType_cus_Name: null,
		};
	},
	methods: {
		async search() {
			if (this.searchType_register) {
				this.$store.dispatch('searchcar', this.query);
			}
			if (this.searchType_cus_Name) {
				const nameArray = this.query.split(' ');
				const filterName = nameArray.filter((element) => element !== '');
				await this.$store.dispatch('searchCusByName', filterName);

				// get name, surname, cusno, updater, updaternum
				// const customerCardList = await this.$store.state.search.SearchCusNo;
				// console.log(customerCardList);
			}
			// console.log(this.$store.state.search.searchCar, ' ', this.$store.state.search.searchCus);
		},
		searchMethodSelect(value) {
			switch (value) {
				case 'register':
					this.searchType_cus_Name = null;
					break;
				case 'cus_Name':
					this.searchType_register = null;
					break;
			}
		},
	},
};
</script>

<style>
.radio_position {
	text-align: left;
}

.searchBar_radio {
	margin-top: 10px;
	margin-left: 10px;
}

.searchBar_center {
	/* justify-content: center; */
	/* align-items: center; */
	text-align: center;
}

.searchBarContainer {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-top: 5px;
}

.searchBar {
	border: 1px solid #ed1c24;
	color: dark;
	border-radius: 1px;
	border-top-left-radius: 50em;
	border-bottom-left-radius: 50em;
	padding: 10px;
	width: 250px;
	height: 34px;
	font-size: 20px;
	color: dark;
}

.btnSearch {
	background-color: #ed1c24;
	color: #fff;
	border: none;
	padding: 5.1px;
	cursor: pointer;
	margin-left: 1px;
}
</style>
