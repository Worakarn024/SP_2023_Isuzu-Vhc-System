<template>
	<div>
		<v-card max-width="400" class="container">
			<v-card-text class="textcard">
				<v-container>
					<div class="row row-linetop">
						<div class="row-title col col-4">ทะเบียนรถ:</div>
						<div class="content-right col col-8 con-start">{{ car.register }}</div>
					</div>
					<div class="row row-line">
						<div class="row-title col col-4">เลขเครื่อง:</div>
						<div class="content-right col col-8 con-start">{{ car.engin_id }}</div>
					</div>
					<div class="row row-line">
						<div class="row-title col col-4">เลขแซลซี:</div>
						<div class="content-right col col-8 con-start">{{ car.chassis }}</div>
					</div>
					<div class="row row-line">
						<div class="row-title col col-4">ชื่อเจ้าของรถ:</div>
						<div class="content-right col col-8 con-start">นายสมชาย ใจดี</div>
					</div>
					<div class="row row-line">
						<div class="row-title col col-4">ชื่อผู้รับบริการ:</div>
						<div class="content-right col col-8 con-start">นายสมหมาย ดีใจ</div>
					</div>
					<div class="row row-line">
						<div class="row-title col col-4">
							<button class="editbut" @click="$router.push('/Moreinfo/infoCustomer')">แก้ไขข้อมูล</button>
						</div>
						<div cols="8" class="content-right col col-8">
							<button class="vhcbut" @click="$router.push('/vhc/dataincome')">ทำ VHC</button>
						</div>
					</div>
				</v-container>
			</v-card-text>
		</v-card>
	</div>
</template>
<script>
export default {
	props: ['car'],
};
</script>
<style>
.con-start {
	justify-content: flex-start !important;
}
.row-line {
	border-top: 1px solid #ebebeb;
	color: #000;
}
.row-linetop {
	border-top: 1px solid #ebebeb;
	color: #000;
}
.textcard {
	text-align: center;
}
.container {
	align-items: center;
	margin-top: 25px;
	margin-bottom: 25px;
	border: 0 solid black; /* black border */
}
.vhcbut {
	background-color: #ed1c24;
	color: white !important;
	border-radius: 5px;
	box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
	height: 35px;
	width: 125px;
	color: #ed1c24;
	border: 1px solid #ed1c24;
}
.editbut {
	background-color: transparent;
	border-radius: 5px;
	box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
	height: 35px;
	width: 125px;
	color: #ed1c24;
	border: 1px solid #ed1c24;
}
.row-title {
	text-align: left;
}
.content-right {
	display: flex;
	justify-content: flex-end;
}
</style>
