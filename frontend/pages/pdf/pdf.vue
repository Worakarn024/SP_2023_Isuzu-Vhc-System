<template>
	<div>
		<LoadingScreen v-if="isLoading"></LoadingScreen>
		<vue-pdf-embed :source="source1" />
	</div>
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed';
import LoadingScreen from '../../components/loadingpdf.vue';

// OR THE FOLLOWING IMPORT FOR VUE 2
// import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

export default {
	name: 'Inventory',
	components: {
		LoadingScreen,
		VuePdfEmbed,
	},
	data() {
		return {
			isLoading: true,
			source1: null,
		};
	},
	mounted() {
		const { id } = this.$route.query;
		this.source1 = 'https://hornbillsolution.net/mfu/api/v2/vhc/miniotest/testImg/' + id;
		setTimeout(() => {
			this.isLoading = false;
		}, 5000);
	},
};
</script>
