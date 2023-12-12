<template>
	<p>Hello world</p>
</template>
<script>
export default {
	data() {
		return {};
	},
	created() {
		console.log(this.$store.state.vhcUploadStep.sticker);
		console.log(this.$store.state.vhcUploadStep.list);
		console.log(this.$store.state.vhcUploadStep.button1);
	},
};
</script>
