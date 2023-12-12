<template>
	<div>
		<nav-title :title="pageTitle" />
		<br />

		<div class="search_bar_center">
			<div class="search_bar_size">
				<search-bar />
			</div>
		</div>

		<br />
		<h2 class="Text">รายการลูกค้า</h2>
		<div>
			<list-customer v-for="item in listCardCar" :key="item.register" :item="item" />
		</div>

		<div v-if="listCardCar.length === 0" class="empty-text">ไม่พบข้อมูล</div>
		<br />
		<div class="pagination-container" v-if="listCardCar.length >= 1">
			<v-pagination
				v-model="currentPage"
				:length="totalPages"
				:total-visible="5"
				:disabled="totalPages === 0"
				color="red"
				@input="handlePageChange"
			/>
		</div>
		<footer><bottom-nav /></footer>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentPage: 1,
			itemsPerPage: 5,
			// cus: '',
			// car: '',
		};
	},

	computed: {
		pageTitle() {
			return 'ค้นหาข้อมูล';
		},

		listCardCar() {
			const startIndex = (this.currentPage - 1) * this.itemsPerPage;
			const endIndex = startIndex + this.itemsPerPage;
			return this.$store.state.search.finalListResult.slice(startIndex, endIndex);
		},

		totalItems() {
			return this.$store.state.search.finalListResult.length;
		},
		totalPages() {
			return Math.ceil(this.totalItems / this.itemsPerPage);
		},
	},

	mounted() {
		this.$store.dispatch('clearfinalListResult');
	},
	methods: {
		handlePageChange(page) {
			this.currentPage = page;
			this.scrollToTop();
		},
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
	},
};
</script>

<style>
.search_bar_center {
	display: flex;
	justify-content: center;
	align-items: center;
}

.search_bar_size {
	max-width: 120%;
	align-content: center;
}
.Text-Topic {
	text-align: center;
	font-weight: 300;
	font-size: 1em;
}

.Text {
	text-align: center;
}

.pagination-container {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-bottom: 100px;
}

.empty-text {
	margin-top: 100px;
	text-align: center;
}
</style>
