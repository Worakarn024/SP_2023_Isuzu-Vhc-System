<template>
	<div>
		<nav-title :title="pageTitle" />
		<v-container>
			<!-- <v-stepper v-model="step">
				<v-stepper-header>
					<v-stepper-step step="1" color="red">ข้อมูลผู้ใช้</v-stepper-step>
					<v-divider></v-divider>
					<v-stepper-step step="2" color="red">ข้อมูลรถ</v-stepper-step>
				</v-stepper-header>
			</v-stepper> -->

			<v-col xs12 md6>
				<div v-if="step === 1">
					<v-text class="textCustomer">รูปภาพลูกค้า</v-text>
					<hr />
					<br />
					<v-cotainer class="pictureUp">
						<upload-picture :editable="editable" />
					</v-cotainer>
					<br />
					<v-text class="textCustomer">ข้อมูลส่วนตัว</v-text>
					<hr />
					<br />
					<v-card>
						<v-col>
							<v-btn v-if="closeFunction" class="infoOwnerSelect" @click="showOwnerList">เลือกลูกค้าจากระบบ</v-btn>

							<v-dialog v-model="showList" class="dialog-list" max-width="600">
								<v-card>
									<v-toolbar color="#CF1818">
										<v-col class="d-flex justify-space-around">
											<v-toolbar-title class="white--text">เลือกรายชื่อ</v-toolbar-title>
										</v-col>
									</v-toolbar>
									<v-row>
										<v-col cols="12">
											<v-text-field
												v-model="searchlist"
												append-icon="mdi-magnify"
												placeholder="ค้นหารายชื่อ"
												single-line
												hide-details
												color="red"
												class="ma-2"
												@click:append="getCustomerName"
												@keyup.enter="getCustomerName"
											></v-text-field>
										</v-col>
									</v-row>
									<v-card-text>
										<v-list>
											<v-list-item
												v-for="name in names"
												:key="name"
												:outlined="true"
												class="boxline"
												@click="selectName(name)"
											>
												<v-list-item-content> {{ name.Cus_Name }} {{ name.Cus_Surename }} </v-list-item-content>
											</v-list-item>
										</v-list>
									</v-card-text>
								</v-card>
							</v-dialog>

							<v-select
								v-model="Be"
								label="* คำนำหน้า"
								:items="be"
								outlined
								:readonly="!editable"
								:error="BeErrorMessages.length > 0"
								:error-messages="BeErrorMessages"
							>
							</v-select>
						</v-col>
					</v-card>
					<br />
					<v-card>
						<br />
						<v-row>
							<v-col xs6>
								<v-text-field
									v-model="Cus_Name"
									label="* ชื่อ"
									:rules="[textRule]"
									:error-messages="Cus_NameErrorMessages"
									:value="customerResults.Cus_Name"
									outlined
									:readonly="!editable"
								>
									<v-messages
										v-if="Cus_NameErrorMessages.length > 0"
										:error-messages="Cus_NameErrorMessages"
									></v-messages>
								</v-text-field>
							</v-col>
							<v-col xs6>
								<v-text-field
									v-model="Cus_Surename"
									label="* นามสกุล"
									:rules="[textRule]"
									:error-messages="Cus_SurenameErrorMessages"
									:value="customerResults.Cus_Surename"
									outlined
									:readonly="!editable"
								>
									<v-messages
										v-if="Cus_SurenameErrorMessages.length > 0"
										:error-messages="Cus_SurenameErrorMessages"
									></v-messages>
								</v-text-field>
							</v-col>
						</v-row>
						<v-row>
							<v-col xs6>
								<v-text-field
									v-model="Cus_Nickname"
									label="ชื่อเล่น"
									:rules="[textRule]"
									:value="customerResults.Cus_Nickname"
									outlined
									:readonly="!editable"
								/>
							</v-col>
							<v-col xs6>
								<v-select
									v-model="Sex"
									label="เพศ"
									:items="gender"
									:value="customerResults.Sex"
									outlined
									:readonly="!editable"
								/>
							</v-col>
						</v-row>
					</v-card>

					<br />
					<br />

					<v-card>
						<br />
						<v-select v-model="Status" label="สถานภาพ" :items="status" outlined :readonly="!editable" />
						<v-select
							v-model="idCard"
							label="* ประเภทเลขบัตร"
							:items="CardType"
							outlined
							:value="customerResults.Status"
							:readonly="!editable"
							:error="Cus_TypeIDCardErrorMessages.length > 0"
							:error-messages="Cus_TypeIDCardErrorMessages"
						>
						</v-select>
						<v-text-field
							v-model="Cus_IDNo"
							label="บัตรประชาชน"
							:rules="[numberRule]"
							:error-messages="CitizenIdErrorMessages"
							outlined
							:readonly="!editable"
							:maxlength="13"
							@change="validateID"
						/>
						<v-text-field
							v-model="DateOfBirth"
							type="date"
							label="วัน/เดือน/ปี เกิด"
							outlined
							:value="customerResults.DateOfBirth"
							:readonly="!editable"
						/>
						<v-select
							v-model="Cus_Type"
							label="* ประเภทลูกค้า"
							:items="TypeList"
							:error="Cus_typeErrorMessages.length > 0"
							:error-messages="Cus_typeErrorMessages"
							outlined
							:readonly="!editable"
						>
						</v-select>
						<v-select
							v-model="Betype"
							label="ระดับลูกค้า"
							:items="BetypeList"
							:value="customerResults.Cus_Type"
							outlined
							:readonly="!editable"
						/>
					</v-card>

					<br />
					<br />

					<v-card>
						<br />
						<v-select
							v-model="Job"
							label="อาชีพ"
							:items="jobList"
							:rules="[textRule]"
							:value="customerResults.Job"
							outlined
							:readonly="!editable"
							@change="getJobId"
						/>
						<v-text-field
							v-model="M_Tel"
							label="เบอร์โทร"
							:rules="[numberRule]"
							:value="customerResults.M_Tel"
							outlined
							:readonly="!editable"
							:error-messages="M_TelErrorMessages"
						/>

						<v-text-field
							v-model="Email"
							label="อีเมล"
							:rules="[emailRule]"
							:value="customerResults.Email"
							outlined
							:readonly="!editable"
							:error-messages="EmailErrorMessages"
						/>
					</v-card>

					<br />
					<br />

					<v-card>
						<br />
						<v-text-field
							v-model="Secondary_Edu"
							label="ม.ต้น"
							:value="customerResults.Secondary_Edu"
							outlined
							:readonly="!editable"
							@change="controllEduDetail"
						/>
						<v-text-field
							v-model="Secondary_Edu_Detail"
							label="ข้อมูลเพิ่มเติม ม.ต้น"
							:value="customerResults.Secondary_Edu_Detail"
							outlined
							:error-messages="Secondary_Edu_DetailErrorMessage"
							:readonly="!editable"
							@change="validateEduDetail"
						/>
						<v-text-field
							v-model="Highschool_Edu"
							label="ม.ปลาย"
							:value="customerResults.Highschool_Edu"
							outlined
							:readonly="!editable"
							@change="controllEduDetail"
						/>
						<v-text-field
							v-model="Highschool_Edu_Detail"
							label="ข้อมูลเพิ่มเติม ม.ปลาย"
							:value="customerResults.Highschool_Edu_Detail"
							:error-messages="Highschool_Edu_DetailErrorMessage"
							outlined
							:readonly="!editable"
							@change="validateEduDetail"
						/>
					</v-card>

					<br />
					<br />

					<v-card>
						<br />
						<v-text-field
							v-model="Bachelor"
							label="ปริญญาตรี"
							outlined
							:readonly="!editable"
							@change="controllEduDetail"
						/>
						<v-text-field
							v-model="Bachelor_Detail"
							label="ข้อมูลเพิ่มเติม ปริญญาตรี"
							outlined
							:readonly="!editable"
							:error-messages="Bachelor_DetailErrorMessage"
							@change="validateEduDetail"
						/>
						<v-text-field
							v-model="Master"
							label="ปริญญาโท"
							outlined
							:readonly="!editable"
							@blur="controllEduDetail"
							@change="controllEduDetail"
						/>
						<v-text-field
							v-model="Master_Detail"
							label="ข้อมูลเพิ่มเติม ปริญญาโท"
							outlined
							:readonly="!editable"
							:error-messages="Master_DetailErrorMessage"
							@change="validateEduDetail"
						/>
						<v-text-field
							v-model="Phd"
							label="ปริญญาเอก"
							outlined
							:readonly="!editable"
							@blur="controllEduDetail"
							@change="controllEduDetail"
						/>
						<v-text-field
							v-model="Phd_Detail"
							label="ข้อมูลเพิ่มเติม ปริญญาเอก"
							outlined
							:readonly="!editable"
							:error-messages="Phd_DetailErrorMessage"
							@change="validateEduDetail"
						/>
					</v-card>

					<br />
					<v-text class="textCustomer">ข้อมูลที่อยู่ตามบัตรประชาชน</v-text>
					<hr />
					<v-card>
						<br />
						<v-container class="infoFormMargin">
							<v-row>
								<v-col xs6>
									<v-select
										v-model="C_GEO"
										label="ภาค"
										:items="geography"
										:value="formatText(customerResults.C_GEO)"
										outlined
										:readonly="!editable"
										@change="getPro('C')"
									/>
									<v-select
										v-model="C_Amp"
										label="อำเภอ"
										:items="c_amphur"
										:value="formatText(customerResults.C_Amp)"
										outlined
										:readonly="!editable"
										@change="getTum('C')"
									/>
									<v-text-field
										v-model="C_Vill"
										label="หมู่บ้าน"
										:value="customerResults.C_Vill"
										outlined
										:readonly="!editable"
									/>
									<v-text-field
										v-model="C_AddGPSLatitude"
										label="ละติจูด"
										:value="customerResults.C_AddGPSLatitude"
										outlined
										:readonly="!editable"
									/>
								</v-col>
								<v-col xs6>
									<v-select
										v-model="C_Pro"
										label="จังหวัด"
										:items="c_province"
										:value="formatText(customerResults.C_Pro)"
										outlined
										:readonly="!editable"
										@change="getAmp('C')"
									/>
									<v-select
										v-model="C_Tum"
										label="ตำบล"
										:items="c_tumbon"
										:value="formatText(customerResults.C_Tum)"
										outlined
										:readonly="!editable"
									/>
									<v-text-field
										v-model="C_Add"
										label="บ้านเลขที่"
										:value="customerResults.C_Add"
										outlined
										:readonly="!editable"
										:error-messages="C_addErrorMessage"
									/>
									<v-text-field
										v-model="C_AddGPSLongtitude"
										label="ลองจิจูด"
										:value="customerResults.C_AddGPSLongtitude"
										outlined
										:readonly="!editable"
									/>
								</v-col>
							</v-row>

							<v-text-field
								v-model="C_Code"
								label="รหัสไปรษณีย์"
								:rules="[numberRule]"
								:value="customerResults.C_Code"
								outlined
								:error-messages="c_CodeErrorMessages"
								:readonly="!editable"
								:maxlength="5"
							/>

							<v-text-field
								v-model="C_AddMapDescribe"
								label="อธิบายแผนที่"
								:value="customerResults.C_AddMapDescribe"
								outlined
								:readonly="!editable"
							/>
						</v-container>
					</v-card>

					<br />
					<v-text class="textCustomer">ข้อมูลที่อยู่ที่ทำงาน</v-text>
					<hr />

					<v-card>
						<v-container style="margin-top: 0px; margin-bottom: 0px">
							<v-col>
								<v-row row="2">
									<v-checkbox
										v-if="editable"
										v-model="workAddrCopyIDAddr"
										class="infoCheckBox"
										label="เหมือนที่อยู่บัตรประชาชน"
										style="mailaddrcopyidaddrng-right: 30px"
									></v-checkbox>
								</v-row>
							</v-col>
						</v-container>
						<v-container class="infoFormMargin">
							<v-row>
								<v-col xs6>
									<v-select
										v-model="W_GEO"
										label="ภาค"
										:items="geography"
										:value="formatText(customerResults.W_GEO)"
										outlined
										:readonly="!editable"
										:disabled="workAddrCopyIDAddr"
										@change="getPro('W')"
									/>
									<v-select
										v-model="W_Amp"
										label="อำเภอ"
										:items="w_amphur"
										:value="formatText(customerResults.W_Amp)"
										outlined
										:readonly="!editable"
										:disabled="workAddrCopyIDAddr"
										@change="getTum('W')"
									/>
									<v-text-field
										v-model="W_Vill"
										label="หมู่บ้าน"
										:value="customerResults.W_Vill"
										outlined
										:disabled="workAddrCopyIDAddr"
										:readonly="!editable"
									/>
									<v-text-field
										v-model="W_AddGPSLatitude"
										label="ละติจูด"
										:value="customerResults.Cus_WGPSLatitude"
										outlined
										:disabled="workAddrCopyIDAddr"
										:readonly="!editable"
									/>
								</v-col>
								<v-col xs6>
									<v-select
										v-model="W_Pro"
										label="จังหวัด"
										:items="w_province"
										:value="formatText(customerResults.W_Pro)"
										outlined
										:readonly="!editable"
										:disabled="workAddrCopyIDAddr"
										@change="getAmp('W')"
									/>
									<v-select
										v-model="W_Tum"
										label="ตำบล"
										:items="w_tumbon"
										:value="formatText(customerResults.W_Tum)"
										outlined
										:disabled="workAddrCopyIDAddr"
										:readonly="!editable"
									/>
									<v-text-field
										v-model="W_Add"
										label="บ้านเลขที่"
										:value="customerResults.W_Add"
										outlined
										:disabled="workAddrCopyIDAddr"
										:error-messages="W_addErrorMessage"
										:readonly="!editable"
									/>
									<v-text-field
										v-model="W_AddGPSLongtitude"
										label="ลองจิจูด"
										:value="customerResults.Cus_WGPSLongtitude"
										outlined
										:disabled="workAddrCopyIDAddr"
										:readonly="!editable"
									/>
								</v-col>
							</v-row>

							<v-text-field
								v-model="W_Code"
								label="รหัสไปรษณีย์"
								:rules="[numberRule]"
								:value="customerResults.W_Code"
								outlined
								:error-messages="w_CodeErrorMessages"
								:disabled="workAddrCopyIDAddr"
								:readonly="!editable"
								:maxlength="5"
							/>

							<v-text-field
								v-model="W_AddMapDescribe"
								label="อธิบายแผนที่"
								:value="customerResults.W_AddMapDescribe"
								outlined
								:disabled="workAddrCopyIDAddr"
								:readonly="!editable"
							/>
						</v-container>
					</v-card>

					<br />
					<v-text class="textCustomer">ข้อมูลที่อยู่ส่งเอกสาร</v-text>
					<hr />
					<v-card>
						<v-container style="margin-top: 0px; margin-bottom: 0px">
							<v-col>
								<v-row row="2">
									<v-checkbox
										v-if="editable"
										v-model="mailAddrCopyIDAddr"
										class="infoCheckBox"
										label="เหมือนที่อยู่บัตรประชาชน"
										style="mailaddrcopyidaddrng-right: 30px"
									></v-checkbox>
									<v-checkbox
										v-if="editable"
										v-model="mailAddrCopyWorkAddr"
										class="infoCheckBox"
										label="เหมือนที่อยู่ทำงาน"
									></v-checkbox>
								</v-row>
							</v-col>
						</v-container>
						<v-container class="infoFormMargin">
							<v-row>
								<v-col xs6>
									<v-select
										v-model="Cus_GEO"
										label="ภาค"
										:items="geography"
										:value="formatText(customerResults.Cus_GEO)"
										outlined
										:readonly="!editable"
										:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
										@change="getPro('Cus')"
									/>
									<v-select
										v-model="Cus_Amp"
										label="อำเภอ"
										:items="cus_amphur"
										:value="formatText(customerResults.Cus_Amp)"
										outlined
										:readonly="!editable"
										:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
										@change="getTum('Cus')"
									/>
									<v-text-field
										v-model="Cus_Vill"
										label="หมู่บ้าน"
										:value="customerResults.Cus_Vil"
										outlined
										:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
										:readonly="!editable"
									/>
									<v-text-field
										v-model="Cus_AddGPSLatitude"
										label="ละติจูด"
										:value="customerResults.Cus_AddGPSLatitude"
										outlined
										:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
										:readonly="!editable"
									/>
								</v-col>
								<v-col xs6>
									<v-select
										v-model="Cus_Pro"
										label="จังหวัด"
										:items="cus_province"
										:value="formatText(customerResults.Cus_Pro)"
										outlined
										:readonly="!editable"
										:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
										@change="getAmp('Cus')"
									/>
									<v-select
										v-model="Cus_Tum"
										label="ตำบล"
										:items="cus_tumbon"
										:value="formatText(customerResults.Cus_Tum)"
										outlined
										:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
										:readonly="!editable"
									/>
									<v-text-field
										v-model="Cus_Add"
										label="บ้านเลขที่"
										:value="customerResults.Cus_Add"
										outlined
										:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
										:readonly="!editable"
										:error-messages="Cus_addErrorMessage"
									/>
									<v-text-field
										v-model="Cus_AddGPSLongtitude"
										label="ลองจิจูด"
										:value="customerResults.Cus_AddGPSLongtitude"
										outlined
										:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
										:readonly="!editable"
									/>
								</v-col>
							</v-row>

							<v-text-field
								v-model="Cus_Code"
								label="รหัสไปรษณีย์"
								:rules="[numberRule]"
								:value="customerResults.Cus_Code"
								:error-messages="cus_CodeErrorMessages"
								outlined
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								:readonly="!editable"
								:maxlength="5"
							/>

							<v-text-field
								v-model="Cus_AddMapDescribe"
								label="อธิบายแผนที่"
								:value="customerResults.Cus_AddMapDescribe"
								outlined
								:disabled="mailAddrCopyIDAddr || mailAddrCopyWorkAddr"
								:readonly="!editable"
							/>
						</v-container>
					</v-card>
				</div>
			</v-col>

			<v-col xs12 md6>
				<div v-if="step === 2">
					<v-text class="textCustomer">ข้อมูลรถ</v-text>
					<hr />
					<br />
					<table-car xs12 md6 />

					<!-- <v-container>
						<v-row>
							<v-btn
								class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
								style="background: #0099ff; width: 95px; color: white"
								@click="$router.push('/register/car')"
								>เพิ่มข้อมูลรถ</v-btn
							>
						</v-row>
					</v-container> -->
				</div>

				<table-car />
			</v-col>
			<v-snackbar v-model="snackbar" :timeout="4000" color="red"> Please fill in required fields. </v-snackbar>
			<br />
			<div class="buttonWrapper">
				<v-btn
					v-if="step === 1 && editable === false"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="toBack"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					v-if="step === 1 && editable === true"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="cancelFix"
					>ยกเลิก</v-btn
				>
				<v-btn
					v-if="editable == false && fromSelect == false"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: #ed1c24; width: 95px; color: white"
					@click="toggleEdit"
					>แก้ไข</v-btn
				>

				<!-- <v-btn
					v-if="owned == true && editable == false"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="nextStep"
					>ต่อไป</v-btn
				> -->

				<v-btn
					v-if="editable == true || fromSelect == true"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #21d770; width: 95px; color: white"
					@click="controller"
					>บันทึก</v-btn
				>

				<v-btn
					v-if="step == 2"
					class="v-btn--is-elevated v-btn--has-bg thene--light v-size--default"
					style="background: transparent; border: 1px solid"
					@click="prevStep"
					>ย้อนกลับ</v-btn
				>
				<v-btn
					v-if="step == 2"
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #ed1c24; width: 95px; color: white"
					@click="$router.push('/search/searchData')"
					>เสร็จสิ้น</v-btn
				>
				<!-- <v-btn
					class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
					style="background: #c00fab; width: 95px; color: white"
					@click="test"
					>test</v-btn
				> -->
			</div>
		</v-container>

		<v-dialog v-model="duplicateDialog" persistent :max-width="300" :max-height="300">
			<v-card>
				<v-card-title class="saveDialogMessage"> ข้อมูลเลขบัตรประจำตัว<br />ประชาชนซ้ำในระบบ</v-card-title>

				<v-card-text class="saveDialogMessage">
					<v-btn
						class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
						style="background: #ed1c24; width: 95px; color: white"
						@click="duplicateDialog = false"
						>ตกลง</v-btn
					>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog v-model="saveDialog" persistent :max-width="300" :max-height="300">
			<v-card>
				<v-card-title class="saveDialogMessage"> {{ dialogMessage }} </v-card-title>

				<v-card-text class="saveDialogMessage">
					<v-btn
						class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
						style="background: #ed1c24; width: 95px; color: white"
						@click="$router.push('/search/search-data')"
						>ตกลง</v-btn
					>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog v-model="cancelDialog" persistent :max-width="300" :max-height="300">
			<v-card>
				<v-card-title class="saveDialogMessage"> คุณต้องการยกเลิกการแก้ไขใช่หรือไม่ </v-card-title>

				<v-card-text class="saveDialogMessage">
					<v-btn
						class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
						style="background: #ed1c24; width: 95px; color: white"
						@click="filledinfo"
						>ใช่</v-btn
					>
					<v-btn
						class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
						style="background: #0f8d1e; width: 95px; color: white"
						@click="cancelDialog = false"
						>ไม่</v-btn
					>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog v-model="editComplete" persistent :max-width="300" :max-height="300">
			<v-card>
				<v-card-title class="saveDialogMessage"> แก้ไขข้อมูลเสร็จสิ้น</v-card-title>

				<v-card-text class="saveDialogMessage">
					<v-btn
						class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
						style="background: #ed1c24; width: 95px; color: white"
						@click="$router.push('/search/search-data')"
						>ตกลง</v-btn
					>
				</v-card-text>
			</v-card>
		</v-dialog>

		<v-dialog v-model="editFail" persistent :max-width="300" :max-height="300">
			<v-card>
				<v-card-title class="saveDialogMessage"> แก้ไขข้อมูลผิดพลาด</v-card-title>

				<v-card-text class="saveDialogMessage">
					<v-btn
						class="v-btn--is-elevated v-btn--has-bg theme--light v-size--default dark"
						style="background: #ed1c24; width: 95px; color: white"
						@click="duplicateDialog = false"
						>ตกลง</v-btn
					>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import uploadPicture from '../../components/upload-picture.vue';
import TableCar from '~/components/table-car.vue';
export default {
	components: { uploadPicture, TableCar },
	data() {
		return {
			textRule: (value) => {
				const textOnlyRegex = /^[a-zA-Zก-๐\s\p{P}]*$/u;
				return textOnlyRegex.test(value) || 'ใส่เฉพาะตัวอักษรเท่านั้น';
			},
			numberRule: (value) => {
				const numberOnlyRegex = /^\d+$/;
				return numberOnlyRegex.test(value) || 'ใส่เฉพาะตัวเลขเท่านั้น';
			},

			emailRule: (value) => {
				if (!value) {
					return 'กรุณากรอกอีเมล';
				} else if (!this.isValidEmail(value)) {
					return 'ตัวอย่างอีเมล เช่น @gmail.com, @hotmail.com เป็นต้น';
				}
				return true;
			},

			carList: [],
			step: 1,
			showList: false,
			saveButt: false,

			dialogStatus: false,
			dialogMessage: 'test',
			saveDialog: false,
			fromSelect: false,
			cancelDialog: false,
			duplicateDialog: false,
			editComplete: false,
			editFail: false,

			commitStatus: '',

			car: {},
			names: [],
			be: ['นาย', 'นาง', 'นางสาว', 'อื่นๆ'],
			gender: ['ชาย', 'หญิง', 'สาวประเภทสอง'],
			status: ['โสด', 'หม้าย', 'หย่าร้าง', 'สมรส'],
			TypeList: ['บุคคล', 'ชมรม / สมาคม / นิติบุคล'],
			BetypeList: [],
			jobList: [],
			CardType: ['บุคคลธรรมดา', 'ชาวต่างชาติ', 'ไม่ระบุเลขบัตร'],

			nameTitleErrorMessages: [],
			FirstnameErrorMessages: [],
			LastnameErrorMessages: [],
			CustomerTypeErrorMessages: [],
			CitizenIdErrorMessages: [],
			validatestate: false,
			closeFunction: false,

			BeErrorMessages: [],
			Cus_NameErrorMessages: [],
			Cus_SurenameErrorMessages: [],
			Cus_TypeIDCardErrorMessages: [],
			Cus_typeErrorMessages: [],

			M_TelErrorMessages: [],
			EmailErrorMessages: [],

			c_CodeErrorMessages: [],
			w_CodeErrorMessages: [],
			cus_CodeErrorMessages: [],

			Secondary_Edu_DetailErrorMessage: [],
			Highschool_Edu_DetailErrorMessage: [],
			Bachelor_DetailErrorMessage: [],
			Master_DetailErrorMessage: [],
			Phd_DetailErrorMessage: [],

			editable: false,
			snackbar: false,

			Be: '',
			Cus_Name: '',
			Cus_Surename: '',
			idCard: '',
			Cus_Type: '',

			workAddrCopyIDAddr: false,
			mailAddrCopyIDAddr: false,
			mailAddrCopyWorkAddr: false,
			edudetail: true,

			geography: [],
			c_province: [],
			c_amphur: [],
			c_tumbon: [],
			C_Add: '',
			C_addErrorMessage: [],

			w_province: [],
			w_amphur: [],
			w_tumbon: [],
			W_Add: '',
			W_addErrorMessage: [],

			cus_province: [],
			cus_amphur: [],
			cus_tumbon: [],
			Cus_Add: [],
			Cus_AddErrorMessage: [],

			Secondary_Edu_DetailDis: true,
			Highschool_Edu_DetailDis: true,
			Bachelor_DetailDis: true,
			Master_DetailDis: true,
			Phd_DetailDis: true,

			Secondary_Edu_Detail: '',
			Highschool_Edu_Detail: '',
			Bachelor_Detail: '',
			Master_Detail: '',
			Phd_Detail: '',
			Cus_IDNo: '',
			M_Tel: '',
			C_Code: '',
			Cus_Code: '',
			W_Code: '',

			JobID: '',
			carRelation: '',

			customerResults: {
				CusNo: '',
				Date_Receive: '',
				CusNo_Old: '',
				Picture: '',
				Be: '',
				BeType: '',
				company_type: '',
				Cus_Name: '',
				Cus_Surename: '',
				Cus_Nickname: '',
				cus_branch_id: '',
				cus_branch_txt: '',
				Cus_Big_Picture: '',
				Cus_Small_Picture: '',
				Sex: '',
				DateOfBirth: '',
				Cus_IDNo: '',
				Primary_Edu: '',
				Secondary_Edu: '',
				Highschool_Edu: '',
				Bachelor: '',
				Master: '',
				Phd: '',
				Primary_Edu_Detail: '',
				Secondary_Edu_Detail: '',
				Highschool_Edu_Detail: '',
				Bachelor_Detail: '',
				Master_Detail: '',
				Phd_Detail: '',
				Status: '',
				mary_id: '',
				C_copy: '',
				C_Add: '',
				C_Vill: '',
				C_Tum: '',
				C_Amp: '',
				C_Pro: '',
				C_GEO: '',
				C_Code: '',
				C_AddGPSLatitude: '',
				C_AddGPSLongtitude: '',
				C_AddMapDescribe: '',
				Cus_Coppy: '',
				Cus_Add: '',
				Cus_Vil: '',
				Cus_Tum: '',
				Cus_Amp: '',
				Cus_Pro: '',
				Cus_GEO: '',
				Cus_Code: '',
				Cus_AddGPSLatitude: '',
				Cus_AddGPSLongtitude: '',
				Cus_AddMapDescribe: '',
				NotMail: '',
				H_Tel: '',
				JobID: '',
				Job: '',
				JobSegmentGroup: '',
				Job_Des: '',
				W_Name: '',
				Title: '',
				W_Coppy: '',
				W_Add: '',
				W_Vill: '',
				W_Tum: '',
				W_Amp: '',
				W_Pro: '',
				W_GEO: '',
				W_Code: '',
				W_Tel: '',
				W_Fax: '',
				W_Email: '',
				Cus_WGPSLatitude: '',
				Cus_WGPSLongtitude: '',
				Cus_WMapDescribe: '',
				Pagger: '',
				M_Tel: '',
				Email: '',
				Cus_Type: '',
				Data_Received: '',
				Data_Received_Num: '',
				Remark: '',
				Updater: '',
				UpdaterNO: '',
				UpdateT: '',
				Resperson: '',
				Resperson_posCode: '',
				respon_date: '',
				Time_for_talk: '',
				Pleasure_value: '',
				rcheck: '',
				cleansing_status: '',
				cleansing_date: '',
				status_up: '',
			},

			cusNo: null,
			owned: false,
		};
	},
	computed: {
		pageTitle() {
			return 'ข้อมูลลูกค้า';
		},
	},

	watch: {
		workAddrCopyIDAddr(newValue) {
			if (newValue === true) {
				this.W_GEO = this.C_GEO;
				this.w_province = this.c_province;
				this.w_amphur = this.c_amphur;
				this.w_tumbon = this.c_tumbon;

				this.W_Add = this.C_Add;
				this.W_Vill = this.C_Vill;
				this.W_Tum = this.C_Tum;
				this.W_Amp = this.C_Amp;
				this.W_Pro = this.C_Pro;
				this.W_GEO = this.C_GEO;
				this.W_Code = this.C_Code;
				this.W_AddGPSLatitude = this.C_AddGPSLatitude;
				this.W_AddGPSLongtitude = this.C_AddGPSLongtitude;
				this.W_AddMapDescribe = this.C_AddMapDescribe;
			} else {
				this.W_GEO = '';
				this.w_province = [];
				this.w_amphur = [];
				this.w_tumbon = [];

				this.W_Add = '';
				this.W_copy = '';
				this.W_Vill = '';
				this.W_Tum = '';
				this.W_Amp = '';
				this.W_Pro = '';
				this.W_GEO = '';
				this.W_Code = '';
				this.W_AddGPSLatitude = '';
				this.W_AddGPSLongtitude = '';
				this.W_AddMapDescribe = '';
				this.W_Name = '';
			}
		},

		mailAddrCopyIDAddr(newValue) {
			if (newValue === true) {
				this.mailAddrCopyWorkAddr = false;
				this.Cus_GEO = this.C_GEO;
				this.cus_province = this.c_province;
				this.cus_amphur = this.c_amphur;
				this.cus_tumbon = this.c_tumbon;

				this.Cus_Add = this.C_Add;
				this.Cus_Tum = this.C_Tum;
				this.Cus_Amp = this.C_Amp;
				this.Cus_Pro = this.C_Pro;
				this.Cus_GEO = this.C_GEO;
				this.Cus_Vill = this.C_Vill;
				this.Cus_Code = this.C_Code;
				this.Cus_AddGPSLatitude = this.C_AddGPSLatitude;
				this.Cus_AddGPSLongtitude = this.C_AddGPSLongtitude;
				this.Cus_AddMapDescribe = this.C_AddMapDescribe;
				this.houseNumber3ErrorMessages = this.houseNumber1ErrorMessages;
			} else if (this.mailAddrCopyWorkAddr !== true && this.mailAddrCopyIDAddr !== true) {
				this.Cus_GEO = '';
				this.cus_province = [];
				this.cus_amphur = [];
				this.cus_tumbon = [];

				this.Cus_Add = '';
				this.Cus_Tum = '';
				this.Cus_Amp = '';
				this.Cus_Pro = '';
				this.Cus_GEO = '';
				this.Cus_Vill = '';
				this.Cus_Code = '';
				this.Cus_AddGPSLatitude = '';
				this.Cus_AddGPSLongtitude = '';
				this.Cus_AddMapDescribe = '';
			}
		},

		mailAddrCopyWorkAddr(newValue) {
			if (newValue === true) {
				this.mailAddrCopyIDAddr = false;
				this.Cus_GEO = this.C_GEO;
				this.cus_province = this.w_province;
				this.cus_amphur = this.w_amphur;
				this.cus_tumbon = this.w_tumbon;

				this.Cus_Add = this.W_Add;
				this.Cus_Vill = this.W_Vill;
				this.Cus_Tum = this.W_Tum;
				this.Cus_Amp = this.W_Amp;
				this.Cus_Pro = this.W_Pro;
				this.Cus_GEO = this.W_GEO;
				this.Cus_Code = this.W_Code;
				this.Cus_AddGPSLatitude = this.W_AddGPSLatitude;
				this.Cus_AddGPSLongtitude = this.W_AddGPSLongtitude;
				this.Cus_AddMapDescribe = this.W_AddMapDescribe;
				this.houseNumber2ErrorMessages = '';
			} else if (this.mailAddrCopyWorkAddr !== true && this.mailAddrCopyIDAddr !== true) {
				this.Cus_GEO = '';
				this.cus_province = [];
				this.cus_amphur = [];
				this.cus_tumbon = [];

				this.Cus_Add = '';
				this.Cus_Tum = '';
				this.Cus_Amp = '';
				this.Cus_Pro = '';
				this.Cus_GEO = '';
				this.Cus_Vill = '';
				this.Cus_Code = '';
				this.Cus_AddGPSLatitude = '';
				this.Cus_AddGPSLongtitude = '';
				this.Cus_AddMapDescribe = '';
			}
		},
	},
	async mounted() {
		await this.$store.dispatch('getCustomerGroup');
		await this.$store.dispatch('getJob');
		this.getJobList();

		//
		this.carRelation = this.$store.state.carRelationFind.carResult;

		this.BetypeList = await this.$store.state.customergroup.CustomerGroupList;
		this.getGeo();
		await this.$store.dispatch('setCustomerInfo');
		// this.getName();
		await this.checkowned();
		// const customerResultsStore = await this.$store.state.customerinfo.customerResults;
		// this.customerResults = customerResultsStore.data;

		this.filledinfo();
	},

	methods: {
		test() {
			// console.log('cus id : ', this.Cus_IDNo);
			this.updateOwner();
			// this.validateField();
		},

		controller() {
			if (this.fromSelect === true) {
				this.commitStatus = 'realation';
				this.saveRelation();
			}

			if (this.fromSelect === false && this.customerResults === '') {
				this.commitStatus = 'register';
				this.validateField();
				if (this.validatestate === true) {
					this.registerCustomer();
				} else {
					console.log('fail');
				}
			}

			if (this.customerResults !== '' && this.fromSelect === false) {
				// update
				this.updateOwner();
				this.commitStatus = 'update';
			}
			console.log(this.commitStatus);
		},

		async updateOwner() {
			const preUpdateObj = {
				CusNo: this.customerResults.CusNo,
				Be: this.Be,
				BeType: this.Betype,
				Cus_Name: this.Cus_Name,
				Cus_Surename: this.Cus_Surename,
				Cus_Nickname: this.Cus_Nickname,
				Sex: this.Sex,
				DateOfBirth: this.DateOfBirth,
				Cus_IDNo: this.Cus_IDNo,
				Status: this.Status,
				Updater: this.$store.state.login.loginResult.Name + ' ' + this.$store.state.login.loginResult.Surname,
				Cus_Type: this.Cus_Type,
				M_Tel: this.M_Tel,

				C_copy: '',
				C_Add: this.C_Add,
				C_Vill: this.C_Vill,
				C_Tum: this.C_Tum,
				C_Amp: this.C_Amp,
				C_Pro: this.C_Pro,
				C_GEO: this.C_GEO,
				C_Code: this.C_Code,
				C_AddGPSLatitude: this.C_AddGPSLatitude,
				C_AddGPSLongtitude: this.C_AddGPSLongtitude,
				C_AddMapDescribe: this.C_AddMapDescribe,

				Cus_copy: '',
				Cus_Add: this.Cus_Add,
				Cus_Vill: this.Cus_Vill,
				Cus_Tum: this.Cus_Tum,
				Cus_Amp: this.Cus_Amp,
				Cus_Pro: this.Cus_Pro,
				Cus_GEO: this.Cus_GEO,
				Cus_Code: this.Cus_Code,
				Cus_AddGPSLatitude: this.Cus_AddGPSLatitude,
				Cus_AddGPSLongtitude: this.Cus_AddGPSLongtitude,
				Cus_AddMapDescribe: this.Cus_AddMapDescribe,

				W_copy: '',
				W_Add: this.W_Add,
				W_Vill: this.W_Vill,
				W_Tum: this.W_Tum,
				W_Amp: this.W_Amp,
				W_Pro: this.W_Pro,
				W_GEO: this.W_GEO,
				W_Code: this.W_Code,
				W_AddGPSLatitude: this.W_AddGPSLatitude,
				W_AddGPSLongtitude: this.W_AddGPSLongtitude,
				W_AddMapDescribe: this.W_AddMapDescribe,
				W_Name: '',
				Title: '',

				Email: this.Email,

				Primary_Edu: '',
				Secondary_Edu: this.Secondary_Edu,
				Secondary_Edu_Detail: this.Secondary_Edu_Detail,
				Highschool_Edu: this.Highschool_Edu,
				Highschool_Edu_Detail: this.Highschool_Edu_Detail,
				Bachelor: this.Bachelor,
				Bachelor_Detail: this.Bachelor_Detail,
				Master: this.Master,
				Master_Detail: this.Master_Detail,
				Phd: this.Phd,
				Phd_Detail: this.Phd_Detail,
				JobID: this.JobID,
				Job: this.Job,
				Job_Des: '',
			};
			const updateObj = Object.fromEntries(
				Object.entries(preUpdateObj).map(([key, value]) => [key, value === undefined ? '' : value])
			);
			await this.$store.dispatch('updateCustomer', updateObj);

			const res = await this.$store.state.customerUpdate.result;

			if (res === 'Successfully') {
				this.editFail = false;
				this.editComplete = true;
			} else {
				this.editComplete = false;
				this.editFail = true;
			}
		},

		async registerCustomer() {
			const customerInput = {
				Be: this.Be,
				Betype: this.Betype,
				Cus_Name: this.Cus_Name,
				Cus_Surename: this.Cus_Surename,
				Cus_Nickname: this.Cus_Nickname,
				Sex: this.Sex,
				DateOfBirth: this.DateOfBirth,
				Cus_IDNo: this.Cus_IDNo,
				mary_id: '',
				Updater: this.$store.state.login.loginResult.Name + ' ' + this.$store.state.login.loginResult.Surname,
				Cus_Type: this.Cus_Type,
				M_Tel: this.M_Tel,
				Status: this.Status,
				C_copy: '',
				C_Add: this.C_Add,
				C_Vill: this.C_Vill,
				C_Tum: this.C_Tum,
				C_Amp: this.C_Amp,
				C_Pro: this.C_Pro,
				C_GEO: this.C_GEO,
				C_Code: this.C_Code,
				C_AddGPSLatitude: this.C_AddGPSLatitude,
				C_AddGPSLongtitude: this.C_AddGPSLongtitude,
				C_AddMapDescribe: this.C_AddMapDescribe,
				Cus_copy: '',
				Cus_Add: this.Cus_Add,
				Cus_Vill: this.Cus_Vill,
				Cus_Tum: this.Cus_Tum,
				Cus_Amp: this.Cus_Amp,
				Cus_Pro: this.Cus_Pro,
				Cus_GEO: this.Cus_GEO,
				Cus_Code: this.Cus_Code,
				Cus_AddGPSLatitude: this.Cus_AddGPSLatitude,
				Cus_AddGPSLongtitude: this.Cus_AddGPSLongtitude,
				Cus_AddMapDescribe: this.Cus_AddMapDescribe,
				W_copy: '',
				W_Add: this.W_Add,
				W_Vill: this.W_Vill,
				W_Tum: this.W_Tum,
				W_Amp: this.W_Amp,
				W_Pro: this.W_Pro,
				W_GEO: this.W_GEO,
				W_Code: this.W_Code,
				W_AddGPSLatitude: this.W_AddGPSLatitude,
				W_AddGPSLongtitude: this.W_AddGPSLongtitude,
				W_AddMapDescribe: this.W_AddMapDescribe,
				W_Name: '',
				Title: '',
				Email: this.Email,
				Primary_Edu: '',
				Secondary_Edu: this.Secondary_Edu,
				Secondary_Edu_Detail: this.Secondary_Edu_Detail,
				Highschool_Edu: this.Highschool_Edu,
				Highschool_Edu_Detail: this.Highschool_Edu_Detail,
				Bachelor: this.Bachelor,
				Bachelor_Detail: this.Bachelor_Detail,
				Master: this.Master,
				Master_Detail: this.Master_Detail,
				Phd: this.Phd,
				Phd_Detail: this.Phd_Detail,
				JobID: this.JobID,
				Job: this.Job,
				Job_Des: '',
			};
			const cusObj = await Object.fromEntries(
				Object.entries(customerInput).map(([key, value]) => [key, value === undefined ? '' : value])
			);
			console.log(cusObj);

			// โยนขึ้นตรงนี้
			await this.$store.dispatch('customerSummarySet', cusObj);
			await this.$store.dispatch('registerCustomer');

			const cusNoResponse = await this.$store.state.customersummary.responseCusno;
			const duplicatedId = await this.$store.state.customersummary.duplicate;

			// ผูก relation
			if (duplicatedId === false) {
				const CusNo = cusNoResponse.toString();
				this.cusNo = await CusNo;
				await this.saveRelation();
			} else {
				this.duplicateDialog = true;
			}
		},

		async saveRelation() {
			console.log('saveRelation called');
			let relationBody = {
				cus_no: '',
				ahistory_id: '',
			};

			if (this.customerResults !== '') {
				relationBody = { cus_no: this.customerResults.CusNo, ahistory_id: this.$store.state.customerinfo.carId };
			} else {
				relationBody = { cus_no: this.cusNo, ahistory_id: this.$store.state.customerinfo.carId };
			}
			// check if body correct then make relation
			if (typeof relationBody.cus_no !== 'undefined' && typeof relationBody.ahistory_id !== 'undefined') {
				await this.$store.dispatch('setRelation', relationBody);
				await this.$store.dispatch('linkownertocar');
				this.$store.dispatch('clearRelation');

				// check if success
				const status = this.$store.state.carRelation.status;
				if (status === true) {
					this.dialogStatus = true;
					this.dialogMessage = 'บันทึกเสร็จสิ้น';
				} else {
					this.dialogStatus = false;
					this.dialogMessage = 'บันทึกไม่สำเร็จ';
				}
				this.saveDialog = true;
			}
		},

		async checkowned() {
			const store = await this.$store.state.customerinfo.customerResults;
			this.customerResults = store;

			if (store === '') {
				this.saveButt = true;
				this.editable = true;
				this.owned = false;
			} else {
				this.owned = true;
			}
			console.log('owned : ', this.owned);
		},

		async getJobList() {
			const job = await this.$store.state.getjob.jobListResult;
			const arrayOfJob = job.map((obj) => obj.Job);
			this.jobList = arrayOfJob;
		},

		async getJobId(findName) {
			console.log('start');
			const job = await this.$store.state.getjob.jobListResult;
			const foundObj = job.find((obj) => obj.Job === findName);

			const JobID = foundObj ? foundObj.JobID : null;
			this.JobID = JobID;
			console.log('JobID  : ', JobID);
		},

		validateField() {
			this.validateID();
			this.validatePostCode();
			this.validateEduDetail();
			this.validateAddress();
			this.validatePhone();
			this.validateform();

			const errorArray = [
				...this.CitizenIdErrorMessages,
				...this.c_CodeErrorMessages,
				...this.w_CodeErrorMessages,
				...this.cus_CodeErrorMessages,
				...this.Secondary_Edu_DetailErrorMessage,
				...this.Highschool_Edu_DetailErrorMessage,
				...this.Bachelor_DetailErrorMessage,
				...this.Master_DetailErrorMessage,
				...this.Phd_DetailErrorMessage,
				...this.C_addErrorMessage,
				...this.W_addErrorMessage,
				...this.Cus_addErrorMessage,
				...this.M_TelErrorMessages,
				...this.BeErrorMessages,
				...this.Cus_NameErrorMessages,
				...this.Cus_SurenameErrorMessages,
				...this.Cus_TypeIDCardErrorMessages,
				...this.Cus_typeErrorMessages,
			];
			console.log('error messages :', errorArray, 'error length : ', errorArray.length);

			if (errorArray.length > 0) {
				this.validatestate = false;
			} else {
				this.validatestate = true;
			}
		},

		validateform() {
			this.BeErrorMessages = [];
			this.Cus_NameErrorMessages = [];
			this.Cus_SurenameErrorMessages = [];
			this.Cus_TypeIDCardErrorMessages = [];
			this.CustomerTypeErrorMessages = [];

			const form = [
				{ value: this.Be, errorMessages: this.BeErrorMessages },
				{ value: this.Cus_Name, errorMessages: this.Cus_NameErrorMessages },
				{ value: this.Cus_Surename, errorMessages: this.Cus_SurenameErrorMessages },
				{ value: this.idCard, errorMessages: this.Cus_TypeIDCardErrorMessages },
				{ value: this.Cus_Type, errorMessages: this.Cus_typeErrorMessages },
			];

			form.forEach((form) => {
				if (form.value === '') {
					form.errorMessages.push('กุรณากรอกข้อมูล');
				}
			});
		},

		validateID() {
			const id = this.Cus_IDNo;
			console.log('test id : ', id);
			this.CitizenIdErrorMessages = [];

			if (typeof id !== 'undefined') {
				const cId = id.toString();
				if (cId !== '') {
					if (cId.length !== 13) this.CitizenIdErrorMessages.push('กรุณากรอกเลขบัตรประชาชนให้ครบ 13 หลัก');
				}

				if (cId === '') {
					this.CitizenIdErrorMessages.push('กรุณากรอกเลขบัตรประชาชน');
				}

				if (cId.length === 13) {
					let i = 0;
					let sum = 0;
					for (i = 0, sum = 0; i < 12; i++) sum += parseFloat(cId.charAt(i)) * (13 - i);
					if ((11 - (sum % 11)) % 10 !== parseFloat(cId.charAt(12))) {
						this.CitizenIdErrorMessages.push('กรุณากรอกเลขบัตรประชาชนให้ถูกรูปแบบ');
					} else {
						this.CitizenIdErrorMessages = [];
					}
				}
			} else {
				this.CitizenIdErrorMessages.push('กรุณากรอกเลขบัตรประชาชน');
			}
		},

		validatePhone() {
			this.M_TelErrorMessages = [];

			if (this.M_Tel === '') {
				this.M_TelErrorMessages.push('กรุณากรอกเลขโทรศัพท์มือถือ');
			}

			if (this.M_Tel !== '' && this.M_Tel.length !== 10) {
				this.M_TelErrorMessages.push('กรุณากรอกเลขโทรศัพท์มือถือให้ครบ 10 หลัก');
			}
		},

		isValidEmail(value) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			return emailRegex.test(value);
		},

		validatePostCode() {
			// Clear existing error messages
			this.c_CodeErrorMessages = [];
			this.w_CodeErrorMessages = [];
			this.cus_CodeErrorMessages = [];

			// Perform validation for each text field
			const code = [
				{ value: this.C_Code, errorMessages: this.c_CodeErrorMessages },
				{ value: this.W_Code, errorMessages: this.w_CodeErrorMessages },
				{ value: this.Cus_Code, errorMessages: this.cus_CodeErrorMessages },
			];
			code.forEach((code) => {
				if (code.value === '') {
					code.errorMessages.push('กุรณากรอกเลขไปรษณีย์');
				}
				if (code.value !== '' && code.value.length !== 5) {
					code.errorMessages.push('กุรณากรอกเลขไปรษณีย์ให้ครบ 5 หลัก');
				}
			});
		},

		controllEduDetail() {
			const fields = [
				{ key: 'Secondary_Edu', detail: 'Secondary_Edu_Detail', detailDis: 'Secondary_Edu_DetailDis' },
				{ key: 'Highschool_Edu', detail: 'Highschool_Edu_Detail', detailDis: 'Highschool_Edu_DetailDis' },
				{ key: 'Bachelor', detail: 'Bachelor_Detail', detailDis: 'Bachelor_DetailDis' },
				{ key: 'Master', detail: 'Master_Detail', detailDis: 'Master_DetailDis' },
				{ key: 'Phd', detail: 'Phd_Detail', detailDis: 'Phd_DetailDis' },
			];

			for (const field of fields) {
				if (this[field.key] !== '') {
					this[field.detailDis] = false;
				}

				if (this[field.key] === '') {
					this[field.detail] = '';
					this[field.detailDis] = true;
				}
			}
		},

		validateEduDetail() {
			this.Secondary_Edu_DetailErrorMessage = [];
			this.Highschool_Edu_DetailErrorMessage = [];
			this.Bachelor_DetailErrorMessage = [];
			this.Master_DetailErrorMessage = [];
			this.Phd_DetailErrorMessage = [];

			if (this.Secondary_Edu_DetailDis === false && this.Secondary_Edu_Detail === '') {
				this.Secondary_Edu_DetailErrorMessage.push('กรุณากรอกข้อมูลเพิ่มเติม');
			} else if (this.Secondary_Edu_Detail !== '') {
				this.Secondary_Edu_DetailErrorMessage = [];
			}

			if (this.Highschool_Edu_DetailDis === false && this.Highschool_Edu_Detail === '') {
				this.Highschool_Edu_DetailErrorMessage.push('กรุณากรอกข้อมูลเพิ่มเติม');
			} else if (this.Highschool_Edu_Detail !== '') {
				this.Highschool_Edu_DetailErrorMessage = [];
			}

			if (this.Bachelor_DetailDis === false && this.Bachelor_Detail === '') {
				this.Bachelor_DetailErrorMessage.push('กรุณากรอกข้อมูลเพิ่มเติม');
			} else if (this.Bachelor_Detail !== '') {
				this.Bachelor_DetailErrorMessage = [];
			}

			if (this.Master_DetailDis === false && this.Master_Detail === '') {
				this.Master_DetailErrorMessage.push('กรุณากรอกข้อมูลเพิ่มเติม');
			} else if (this.Master_Detail !== '') {
				this.Master_DetailErrorMessage = [];
			}

			if (this.Phd_DetailDis === false && this.Phd_Detail === '') {
				this.Phd_DetailErrorMessage.push('กรุณากรอกข้อมูลเพิ่มเติม');
			} else if (this.Phd_Detail !== '') {
				this.Phd_DetailErrorMessage = [];
			}
		},

		validateAddress() {
			this.C_addErrorMessage = [];
			this.W_addErrorMessage = [];
			this.Cus_addErrorMessage = [];

			const address = [
				{ value: this.C_Add, Errors: this.C_addErrorMessage, errorMessages: 'กรุณากรอกบ้านเลขที่' },
				{ value: this.W_Add, Errors: this.W_addErrorMessage, errorMessages: 'กรุณากรอกบ้านเลขที่' },
				{ value: this.Cus_Add, Errors: this.Cus_addErrorMessage, errorMessages: 'กรุณากรอกบ้านเลขที่' },
			];

			address.forEach((address) => {
				if (address.value === '') {
					address.Errors.push(address.errorMessages);
				}
			});
		},

		showOwnerList() {
			this.showList = true;
		},

		async getCustomerName() {
			if (this.searchlist !== '') {
				await this.$store.dispatch('getCustomerName', this.searchlist);
				const customerNameList = await this.$store.state.plainCustomerName.nameList;
				this.names = customerNameList;
			}
		},

		async selectName(name) {
			this.showList = false;
			this.fromSelect = true;
			this.editable = false;

			await this.$store.dispatch('setCustomerInfo', name.CusNo);
			const store = await this.$store.state.customerinfo.customerResults;
			this.customerResults = store;

			this.filledinfo();
		},

		async fillAddress() {
			this.C_GEO = this.customerResults.C_GEO;
			await this.getPro('C');
			this.C_Pro = this.customerResults.C_Pro;
			await this.getAmp('C');
			this.C_Amp = this.customerResults.C_Amp;
			await this.getTum('C');
			this.C_Tum = this.customerResults.C_Tum;

			this.W_GEO = this.customerResults.W_GEO;
			await this.getPro('W');
			this.W_Pro = this.customerResults.W_Pro;
			await this.getAmp('W');
			this.W_Amp = this.customerResults.W_Amp;
			await this.getTum('W');
			this.W_Tum = this.customerResults.W_Tum;

			this.Cus_GEO = this.customerResults.Cus_GEO;
			await this.getPro('Cus');
			this.Cus_Pro = this.customerResults.Cus_Pro;
			await this.getAmp('Cus');
			this.Cus_Amp = this.customerResults.Cus_Amp;
			await this.getTum('Cus');
			this.Cus_Tum = this.customerResults.Cus_Tum;
		},

		filledinfo() {
			this.cancelDialog = false;
			if (this.customerResults !== '') {
				this.editable = false;
				this.CusNo = this.customerResults.CusNo;
				this.Date_Receive = this.customerResults.Date_Receive;
				this.CusNo_Old = this.customerResults.CusNo_Old;
				this.Picture = this.customerResults.Picture;
				this.Be = this.customerResults.Be;
				this.BeType = this.customerResults.BeType;
				this.company_type = this.customerResults.company_type;
				this.Cus_Name = this.customerResults.Cus_Name;
				this.Cus_Surename = this.customerResults.Cus_Surename;
				this.Cus_Nickname = this.customerResults.Cus_Nickname;
				this.cus_branch_id = this.customerResults.cus_branch_id;
				this.cus_branch_txt = this.customerResults.cus_branch_txt;
				this.Cus_Big_Picture = this.customerResults.Cus_Big_Picture;
				this.Cus_Small_Picture = this.customerResults.Cus_Small_Picture;
				this.Sex = this.customerResults.Sex;
				this.DateOfBirth = this.customerResults.DateOfBirth;
				this.Cus_IDNo = this.customerResults.Cus_IDNo;
				this.Primary_Edu = this.customerResults.Primary_Edu;
				this.Primary_Edu_Detail = this.customerResults.Primary_Edu_Detail;
				this.Secondary_Edu = this.customerResults.Secondary_Edu;
				this.Secondary_Edu_Detail = this.customerResults.Secondary_Edu_Detail;
				this.Highschool_Edu = this.customerResults.Highschool_Edu;
				this.Highschool_Edu_Detail = this.customerResults.Highschool_Edu_Detail;
				this.Bachelor = this.customerResults.Bachelor;
				this.Bachelor_Detail = this.customerResults.Bachelor_Detail;
				this.Master = this.customerResults.Master;
				this.Master_Detail = this.customerResults.Master_Detail;
				this.Phd = this.customerResults.Phd;
				this.Phd_Detail = this.customerResults.Phd_Detail;
				this.Status = this.customerResults.Status;
				this.mary_id = this.customerResults.mary_id;
				this.C_copy = this.customerResults.C_copy;
				this.C_Add = this.customerResults.C_Add;
				this.C_Vill = this.customerResults.C_Vill;
				this.C_Tum = this.customerResults.C_Tum;
				this.C_Amp = this.customerResults.C_Amp;
				this.C_Pro = this.customerResults.C_Pro;
				this.C_GEO = this.customerResults.C_GEO;
				this.C_Code = this.customerResults.C_Code;
				this.C_AddGPSLatitude = this.customerResults.C_AddGPSLatitude;
				this.C_AddGPSLongtitude = this.customerResults.C_AddGPSLongtitude;
				this.C_AddMapDescribe = this.customerResults.C_AddMapDescribe;
				this.Cus_Coppy = this.customerResults.Cus_Coppy;
				this.Cus_Add = this.customerResults.Cus_Add;
				this.Cus_Vil = this.customerResults.Cus_Vil;
				this.Cus_Tum = this.customerResults.Cus_Tum;
				this.Cus_Amp = this.customerResults.Cus_Amp;
				this.Cus_Pro = this.customerResults.Cus_Pro;
				this.Cus_GEO = this.customerResults.Cus_GEO;
				this.Cus_Code = this.customerResults.Cus_Code;
				this.Cus_AddGPSLatitude = this.customerResults.Cus_AddGPSLatitude;
				this.Cus_AddGPSLongtitude = this.customerResults.Cus_AddGPSLongtitude;
				this.Cus_AddMapDescribe = this.customerResults.Cus_AddMapDescribe;
				this.NotMail = this.customerResults.NotMail;
				this.H_Tel = this.customerResults.H_Tel;
				this.JobID = this.customerResults.JobID;
				this.Job = this.customerResults.Job;
				this.JobSegmentGroup = this.customerResults.JobSegmentGroup;
				this.Job_Des = this.customerResults.Job_Des;
				this.W_Name = this.customerResults.W_Name;
				this.Title = this.customerResults.Title;
				this.W_Coppy = this.customerResults.W_Coppy;
				this.W_Add = this.customerResults.W_Add;
				this.W_Vill = this.customerResults.W_Vill;
				this.W_Tum = this.customerResults.W_Tum;
				this.W_Amp = this.customerResults.W_Amp;
				this.W_Pro = this.customerResults.W_Pro;
				this.W_GEO = this.customerResults.W_GEO;
				this.W_Code = this.customerResults.W_Code;
				this.W_Tel = this.customerResults.W_Tel;
				this.W_Fax = this.customerResults.W_Fax;
				this.W_Email = this.customerResults.W_Email;
				this.Cus_WGPSLatitude = this.customerResults.Cus_WGPSLatitude;
				this.Cus_WGPSLongtitude = this.customerResults.Cus_WGPSLongtitude;
				this.Cus_WMapDescribe = this.customerResults.Cus_WMapDescribe;
				this.Pagger = this.customerResults.Pagger;
				this.M_Tel = this.customerResults.M_Tel;
				this.Email = this.customerResults.Email;
				this.Cus_Type = this.customerResults.Cus_Type;
				this.Data_Received = this.customerResults.Data_Received;
				this.Data_Received_Num = this.customerResults.Data_Received_Num;
				this.Remark = this.customerResults.Remark;
				this.Updater = this.customerResults.Updater;
				this.UpdaterNO = this.customerResults.UpdaterNO;
				this.UpdateT = this.customerResults.UpdateT;
				this.Resperson = this.customerResults.Resperson;
				this.Resperson_posCode = this.customerResults.Resperson_posCode;
				this.respon_date = this.customerResults.respon_date;
				this.Time_for_talk = this.customerResults.Time_for_talk;
				this.Pleasure_value = this.customerResults.Pleasure_value;
				this.rcheck = this.customerResults.rcheck;
				this.cleansing_status = this.customerResults.cleansing_status;
				this.cleansing_date = this.customerResults.cleansing_date;
				this.status_up = this.customerResults.status_up;
				this.fillAddress();
			} else {
				this.CusNo = '';
				this.Date_Receive = '';
				this.CusNo_Old = '';
				this.Picture = '';
				this.Be = '';
				this.BeType = '';
				this.company_type = '';
				this.Cus_Name = '';
				this.Cus_Surename = '';
				this.Cus_Nickname = '';
				this.cus_branch_id = '';
				this.cus_branch_txt = '';
				this.Cus_Big_Picture = '';
				this.Cus_Small_Picture = '';
				this.Sex = '';
				this.DateOfBirth = '';
				this.Cus_IDNo = '';
				this.Primary_Edu = '';
				this.Secondary_Edu = '';
				this.Highschool_Edu = '';
				this.Bachelor = '';
				this.Master = '';
				this.Phd = '';
				this.Status = '';
				this.mary_id = '';
				this.C_copy = '';
				this.C_Add = '';
				this.C_Vill = '';
				this.C_Tum = '';
				this.C_Amp = '';
				this.C_Pro = '';
				this.C_GEO = '';
				this.C_Code = '';
				this.C_AddGPSLatitude = '';
				this.C_AddGPSLongtitude = '';
				this.C_AddMapDescribe = '';
				this.Cus_Coppy = '';
				this.Cus_Add = '';
				this.Cus_Vil = '';
				this.Cus_Tum = '';
				this.Cus_Amp = '';
				this.Cus_Pro = '';
				this.Cus_GEO = '';
				this.Cus_Code = '';
				this.Cus_AddGPSLatitude = '';
				this.Cus_AddGPSLongtitude = '';
				this.Cus_AddMapDescribe = '';
				this.NotMail = '';
				this.H_Tel = '';
				this.JobID = '';
				this.Job = '';
				this.JobSegmentGroup = '';
				this.Job_Des = '';
				this.W_Name = '';
				this.Title = '';
				this.W_Coppy = '';
				this.W_Add = '';
				this.W_Vill = '';
				this.W_Tum = '';
				this.W_Amp = '';
				this.W_Pro = '';
				this.W_GEO = '';
				this.W_Code = '';
				this.W_Tel = '';
				this.W_Fax = '';
				this.W_Email = '';
				this.Cus_WGPSLatitude = '';
				this.Cus_WGPSLongtitude = '';
				this.Cus_WMapDescribe = '';
				this.Pagger = '';
				this.M_Tel = '';
				this.Email = '';
				this.Cus_Type = '';
				this.Data_Received = '';
				this.Data_Received_Num = '';
				this.Remark = '';
				this.Updater = '';
				this.UpdaterNO = '';
				this.UpdateT = '';
				this.Resperson = '';
				this.Resperson_posCode = '';
				this.respon_date = '';
				this.Time_for_talk = '';
				this.Pleasure_value = '';
				this.rcheck = '';
				this.cleansing_status = '';
				this.cleansing_date = '';
				this.status_up = '';
			}
		},

		formatText(text) {
			if (typeof text === 'string' && text.trim() !== '') {
				const formattedText = text.split('_')[1]?.charAt(0).toUpperCase() + text.split('_')[1]?.slice(1);
				return formattedText || '';
			}
			return '';
		},

		// Address
		async getGeo() {
			this.updateWorkField();
			await this.$store.dispatch('getGeography');
			const geography = this.$store.state.address.geographyResult;
			const geoNames = geography.map((item) => `${item.geo_id}_${item.geo_name}`);

			geoNames.sort((a, b) => {
				const idA = parseInt(a.split('_')[0]);
				const idB = parseInt(b.split('_')[0]);
				return idA - idB;
			});
			this.geography = geoNames;
		},

		async getPro(type) {
			let id = '';
			switch (type) {
				case 'C':
					id = parseInt(this.C_GEO.split('_')[0]);
					break;
				case 'W':
					id = parseInt(this.W_GEO.split('_')[0]);
					break;
				case 'Cus':
					id = parseInt(this.Cus_GEO.split('_')[0]);
					break;
			}
			await this.$store.dispatch('getProvince', id);
			const province = await this.$store.state.address.provinceResult;
			const provinceNames = province.map((item) => `${item.province_id}_${item.province_name}`);

			provinceNames.sort((a, b) => {
				const idA = parseInt(a.split('_')[0]);
				const idB = parseInt(b.split('_')[0]);
				return idA - idB;
			});
			if (type === 'C') {
				this.c_province = provinceNames;
				this.c_amphur = [];
				this.c_tumbon = [];
				this.updateWorkField();
			}
			if (type === 'W') {
				this.w_province = provinceNames;
				this.w_amphur = [];
				this.w_tumbon = [];
				this.updateWorkField();
			}
			if (type === 'Cus') {
				this.cus_province = provinceNames;
				this.cus_amphur = [];
				this.cus_tumbon = [];
				this.updateWorkField();
			}
		},

		async getAmp(type) {
			let id = '';
			switch (type) {
				case 'C':
					id = parseInt(this.C_Pro.split('_')[0]);
					break;
				case 'W':
					id = parseInt(this.W_Pro.split('_')[0]);
					break;
				case 'Cus':
					id = parseInt(this.Cus_Pro.split('_')[0]);
					break;
			}
			await this.$store.dispatch('getAmphur', id);
			const amphur = await this.$store.state.address.amphurResult;
			const amphurNames = amphur.map((item) => `${item.amphur_id}_${item.amphur_name}`);

			amphurNames.sort((a, b) => {
				const idA = parseInt(a.split('_')[0]);
				const idB = parseInt(b.split('_')[0]);
				return idA - idB;
			});
			if (type === 'C') {
				this.c_amphur = amphurNames;
				this.c_tumbon = [];
				this.updateWorkField();
			}
			if (type === 'W') {
				this.w_amphur = amphurNames;
				this.w_tumbon = [];
				this.updateWorkField();
			}
			if (type === 'Cus') {
				this.cus_amphur = amphurNames;
				this.cus_tumbon = [];
				this.updateWorkField();
			}
		},

		async getTum(type) {
			let id = '';
			switch (type) {
				case 'C':
					id = parseInt(this.C_Amp.split('_')[0]);
					break;
				case 'W':
					id = parseInt(this.W_Amp.split('_')[0]);
					break;
				case 'Cus':
					id = parseInt(this.Cus_Amp.split('_')[0]);
					break;
			}
			await this.$store.dispatch('getTumbon', id);
			const tumbon = await this.$store.state.address.tumbonResult;
			const tumbonNames = tumbon.map((item) => `${item.district_id}_${item.district_name}`);

			tumbonNames.sort((a, b) => {
				const idA = parseInt(a.split('_')[0]);
				const idB = parseInt(b.split('_')[0]);
				return idA - idB;
			});
			if (type === 'C') {
				this.c_tumbon = tumbonNames;
				this.updateWorkField();
			}
			if (type === 'W') {
				this.w_tumbon = tumbonNames;
				this.updateWorkField();
			}
			if (type === 'Cus') {
				this.cus_tumbon = tumbonNames;
				this.updateWorkField();
			}
		},
		updateWorkField() {
			if (this.workAddrCopyIDAddr === true) {
				this.W_GEO = this.C_GEO;
				this.w_province = this.c_province;
				this.w_amphur = this.c_amphur;
				this.w_tumbon = this.c_tumbon;

				this.houseNumber2 = this.houseNumber1;
				this.W_copy = '';
				this.W_Vill = this.C_Vill;
				this.W_Tum = this.C_Tum;
				this.W_Amp = this.C_Amp;
				this.W_Pro = this.C_Pro;
				this.W_GEO = this.C_GEO;
				this.W_Code = this.C_Code;
				this.W_AddGPSLatitude = this.C_AddGPSLatitude;
				this.W_AddGPSLongtitude = this.C_AddGPSLongtitude;
				this.W_AddMapDescribe = this.C_AddMapDescribe;
				this.W_Name = this.C_Name;
				this.houseNumber2ErrorMessages = '';
			}
			if (this.mailAddrCopyIDAddr === true) {
				this.Cus_GEO = this.C_GEO;
				this.cus_province = this.c_province;
				this.cus_amphur = this.c_amphur;
				this.cus_tumbon = this.c_tumbon;

				this.houseNumber3 = this.houseNumber1;
				this.Cus_copy = '';
				this.Cus_Vill = this.C_Vill;
				this.Cus_Tum = this.C_Tum;
				this.Cus_Amp = this.C_Amp;
				this.Cus_Pro = this.C_Pro;
				this.Cus_GEO = this.C_GEO;
				this.Cus_Code = this.C_Code;
				this.Cus_AddGPSLatitude = this.C_AddGPSLatitude;
				this.Cus_AddGPSLongtitude = this.C_AddGPSLongtitude;
				this.Cus_AddMapDescribe = this.C_AddMapDescribe;
				this.Cus_Name = this.C_Name;
				this.houseNumber2ErrorMessages = '';
			}
			if (this.mailAddrCopyWorkAddr === true) {
				this.Cus_GEO = this.C_GEO;
				this.cus_province = this.w_province;
				this.cus_amphur = this.w_amphur;
				this.cus_tumbon = this.w_tumbon;

				this.houseNumber3 = this.houseNumber2;
				this.Cus_copy = '';
				this.Cus_Vill = this.W_Vill;
				this.Cus_Tum = this.W_Tum;
				this.Cus_Amp = this.W_Amp;
				this.Cus_Pro = this.W_Pro;
				this.Cus_GEO = this.W_GEO;
				this.Cus_Code = this.W_Code;
				this.Cus_AddGPSLatitude = this.W_AddGPSLatitude;
				this.Cus_AddGPSLongtitude = this.W_AddGPSLongtitude;
				this.Cus_AddMapDescribe = this.W_AddMapDescribe;
				this.Cus_Name = this.W_Name;
				this.houseNumber2ErrorMessages = '';
			}
		},
		// End address

		checkClick() {
			this.nameTitleErrorMessages = [];
			this.FirstnameErrorMessages = [];
			this.LastnameErrorMessages = [];
			this.CustomerTypeErrorMessages = [];
			this.IDCardErrorMessages = [];

			if (!this.nameTitle) {
				this.nameTitleErrorMessages.push('กรุณาเลือกคำนำหน้า');
			}

			if (!this.firstName) {
				this.FirstnameErrorMessages.push('กรุณากรอกชื่อ');
			}

			if (!this.lastName) {
				this.LastnameErrorMessages.push('กรุณากรอกนามสกุล');
			}

			if (!this.Cus_Type) {
				this.CustomerTypeErrorMessages.push('กรุณาเลือกประเภทลูกค้า');
			}

			if (!this.idCard) {
				this.IDCardErrorMessages.push('กรุณาเลือกประเภทบัตร');
			}

			if (this.nameTitle && this.firstName && this.lastName && this.Cus_Type && this.idCard) {
				// if (this.step < 3) {
				//   this.step++;
				// }
			} else {
				this.snackbar = true;
			}
		},
		toggleEdit() {
			this.editable = !this.editable;
			this.saveButt = !this.saveButt;

			this.edudetail = false;
		},
		nextStep() {
			if (this.step < 3) {
				this.step++;
			}
		},
		prevStep() {
			if (this.step > 1) {
				this.step--;
			}
		},
		toBack() {
			this.$router.go(-1);
		},
		cancelFix() {
			this.cancelDialog = true;
		},
	},
};
</script>

<style>
.infoCheckBox {
	margin-top: 10px !important;
	margin-left: 20px !important;
}

.infoFormMargin {
	text-align: center;
	margin-top: 0px !important;
}

.saveDialogMessage {
	text-align: center;
	justify-content: center;
}

.infoOwnerSelect {
	margin-bottom: 20px;
	flex: auto;
	background-color: rgb(27, 200, 131) !important;
	color: white !important;
}
.Text1 {
	text-align: left;
}

.Text2 {
	text-align: center;
}

.Text3 {
	text-align: left;
	background-color: rgb(12, 200, 243);
}

.buttonWrapper {
	text-align: center;
}

.textCustomer {
	/* border-bottom: 1px solid black; */
	font-weight: bold;
}

hr {
	border: 1px solid black;
	height: 1px;
	/* Set the hr color */
}

.pictureUp {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
