<template>
	<div v-if="visible" class="dialog-overlay" @click="$emit('close')">
		<div class="dialog" @click.stop>
			<p>ทำรายการใหม่</p>
			<button class="customer-btn" @click="$router.push('/register/customer')">เปิดประวัติลูกค้าใหม่</button>
			<button class="car-btn" @click="$router.push('/register/car')">เปิดประวัติรถใหม่</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		visible: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		showDialog() {
			this.dialogVisible = true;
		},
		hideDialog() {
			this.dialogVisible = false;
		},
	},
};
</script>

<style>
.dialog-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
}

.dialog {
	background-color: white;
	padding: 20px;
	/* border: 1px solid red; */
	position: fixed;
	font-weight: 700;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	align-items: center;
	text-align: center;
	font-weight: bold;
}
.customer-btn {
	padding: 8px;
	border-radius: 5px;
	color: white;
	margin-top: 10px;
	margin-bottom: 5px;
	background-color: #cf1818;
	width: 200px;
	border-radius: 10px;
}
.car-btn {
	padding: 8px;
	border-radius: 5px;
	color: white;
	margin-top: 5px;
	margin-bottom: 10px;
	background-color: #000000;
	width: 200px;
	border-radius: 10px;
}
@media (max-width: 767px) {
	.dialog {
		width: 300px;
		height: 200px;
	}
}

/* Media query for medium screens */
@media (min-width: 768px) and (max-width: 1023px) {
	.dialog {
		width: 300px;
		height: 200px;
	}
}

/* Media query for large screens */
@media (min-width: 1024px) {
	.dialog {
		width: 300px;
		height: 200px;
	}
}
</style>
