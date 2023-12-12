import Vue from 'vue';
import Vuex from 'vuex';

import login from './modules/login';
import search from './modules/get-list/search';
import carregister from './modules/car/car-register';
import carsummary from './modules/car/car-summary';
import customerinfo from './modules/customer/customer-info';
import cardetail from './modules/car/car-detail';
import getjob from './modules/get-list/get-job';
import pdfvhc from './modules/pdf/pdf-vhc';
import customersummary from './modules/customer/customer-summary';
import vhcUploadStep from './modules/vhc/vhc-uploadstep';
import plainCarRegister from './modules/master-data/car-register';
import plainCustomerName from './modules/master-data/customer-name';
import address from './modules/master-data/address';
import customergroup from './modules/get-list/customergroup';
import carRelation from './modules/car/car-relation';
import getBrand from './modules/master-data/get-brand';
import getGroup from './modules/master-data/get-group';
import getModel from './modules/master-data/get-model';
import carRelationFind from './modules/car/car-relation-find';
import vhcCheck13list from './modules/vhc/vhc-check13list';
import customerUpdate from './modules/customer/customer-update';
import vhcHistory from './modules/vhc/vhc-history';
// import { search } from 'core-js/fn/symbol';

Vue.use(Vuex);

export default () =>
	new Vuex.Store({
		modules: {
			login,
			carregister,
			carsummary,
			customerinfo,
			cardetail,
			getjob,
			pdfvhc,
			customersummary,
			search,
			vhcUploadStep,
			vhcCheck13list,
			plainCarRegister,
			plainCustomerName,
			address,
			customergroup,
			carRelation,
			getBrand,
			getGroup,
			getModel,
			carRelationFind,
			customerUpdate,
			vhcHistory,
		},
	});
