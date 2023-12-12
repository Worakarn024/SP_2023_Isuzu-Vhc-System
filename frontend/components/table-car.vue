<template>
	<v-data-table
		v-if="datacar.register !== 'noCar'"
		:headers="headers"
		:items="datacar"
		:editable="editable"
		:deletable="deletable"
		:dense="dense"
		:outlined="outlined"
		:rows-per-page-items="[10, 20, 30]"
		hide-default-footer
	>
		<template #[`item.picture`]="{ item }">
			<v-dialog v-model="dialog" max-width="500">
				<template #activator="{ on, attrs }">
					<v-img :src="item.picture" width="80" height="50" v-bind="attrs" v-on="on"></v-img>
				</template>
				<v-card>
					<v-img :src="item.picture" width="100%" height="auto"></v-img>
				</v-card>
			</v-dialog>
		</template>

		<template #[`item.actions`]="{ item }">
			<div class="button-wrapper">
				<v-btn
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark buttonWrapperC"
					style="background: #21ba09; width: 95px; color: white; padding: 3px; margin-left: 3px"
					@click="viewDetails(item)"
				>
					ดูรายละเอียด
				</v-btn>
			</div>
		</template>
	</v-data-table>
</template>

<script>
export default {
	data: () => ({
		headers: [
			{ text: 'ป้ายทะเบียนรถ', value: 'register', editable: true, deletable: true },
			{ text: 'รูปรถ', value: 'picture', editable: true, deletable: true, sortable: false },
			{ text: 'ข้อมูล', value: 'id', editable: true, deletable: true },
			{ text: 'จัดการ', class: 'Text2', value: 'actions', sortable: false, editable: true, deletable: true },
		],
		// headers: [],
		datacar: {
			register: 'noCar',
			engin_id: '',
			chassis: '',
			id: '',
			fullmodel_name: '',
			idRef_vihicle: '',
			ayoung_type_idl: '',
			color_id: '',
			amodel_id: '',
			model_name: '',
		},
		editable: true,
		deletable: true,
		dense: false, 
		outlined: true,
		dialog: false,
		selectedPicture: null,
	}),

	mounted() {
		this.getDataCar();
		// this.setHeader();
	},

	methods: {
		async viewDetails(item) {
			// Handle view details action here
			await this.$store.dispatch('setcarinfo', item.id);
			this.$router.push('/sum-data/car-summary');
		},

		getDataCar() {
			const car = this.$store.state.carRelationFind.carResult;

			// When the customer has related car
			if (car.id !== '' && car !== undefined) {
				this.datacar = car;
			}
		},
		// setHeader() {
		// 	if (this.datacar.id !== '') {
		// 		this.headers = emptyHeader;
		// 	} else {
		// 		this.headers = emptyHeader;
		// 	}
		// },
	},
};
</script>

<style>
.Text2 {
	text-align: center;
}
.buttonWrapperC {
	padding: 3px;
	margin: 0 auto; /* Center the button horizontally */
	background-color: #f93b3b;
}
hr {
	border: 1px solid black;
	height: 1px;
	/* Set the hr color */
}
</style>
