import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import moment from 'moment';

const GET_VENDORS = 'vendor/GET_VENDORS';
const GET_VENDORS_FOR_SELECT = 'vendor/GET_VENDORS_FOR_SELECT';
const SEARCH_VENDORS = 'vendor/SEARCH_VENDORS';
const GET_VENDOR = 'vendor/GET_VENDOR';
const ADD_VENDOR = 'vendor/ADD_VENDOR';
const EDIT_VENDOR = 'vendor/EDIT_VENDOR';
const DELETE_VENDOR = 'vendor/DELETE_VENDOR';
const ON_CHANGE = 'vendor/ON_CHANGE';
const ON_CHANGE_EDIT = 'vendor/ON_CHANGE_EDIT';
const ON_CHANGE_SEARCH = 'vendor/ON_CHANGE_SEARCH';
const ON_CHANGE_PERSON = 'vendor/ON_CHANGE_PERSON';
const SET_TARGET = 'vendor/SET_TARGET';
const ADD_PERSON_FORM = 'vendor/ADD_PERSON_FORM';
const DELETE_PERSON_FORM = 'vendor/DELETE_PERSON_FORM';
const ADD_PERSON = 'vendor/ADD_PERSON';

export const getVendors = createAction(GET_VENDORS, api.getVendors);
export const getVendorsForSelect = createAction(GET_VENDORS_FOR_SELECT, api.getVendorsForSelect);
export const searchVendors = createAction(SEARCH_VENDORS, api.searchVendors);
export const getVendor = createAction(GET_VENDOR, api.getVendor);
export const addVendor = createAction(ADD_VENDOR, api.addVendor);
export const editVendor = createAction(EDIT_VENDOR, api.editVendor);
export const deleteVendor = createAction(DELETE_VENDOR, api.deleteVendor);
export const onChange = createAction(ON_CHANGE);
export const onChangeEdit = createAction(ON_CHANGE_EDIT);
export const onChangeSearch = createAction(ON_CHANGE_SEARCH);
export const onChangePerson = createAction(ON_CHANGE_PERSON);
export const setTarget = createAction(SET_TARGET);
export const addPersonForm = createAction(ADD_PERSON_FORM);
export const deletePersonForm = createAction(DELETE_PERSON_FORM);
export const addPerson = createAction(ADD_PERSON, api.addPerson);

const initialState = Map({
	vendors: List(),
	vendorList: List(),
	vendor: Map(),
	add: Map({
		vendorGb: '',
		countryCd: '',
		vendorName: '',
		effStaDt: '',
		effEndDt: '',
		part: '',
		partNumber: '',
		officialName: '',
		persons: []
	}),
	edit: Map({
		vendorGb: '',
		countryCd: '',
		vendorName: '',
		effStaDt: '',
		effEndDt: '',
		part: '',
		partNumber: '',
		officialName: ''
	}),
	search: Map({
		vendorGb: '',
		countryCd: '',
		vendorName: '',
		officialName: '',
		part: '',
		partNumber: '',
		effStaDt: moment().format('YYYY-MM-DD'),
		effEndDt: moment().add(3, 'months').format('YYYY-MM-DD'),
		isSearch: false
	}),
	persons: List([
		Map({
			index: 0,
			name: '',
			position: '',
			task: '',
			email: '',
			contactNumber: ''
		})
	]),
	target: ''
});

export default handleActions(
	{
		...pender({
			type: GET_VENDORS,
			onSuccess: (state, action) => {
				const { data: vendors } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('vendors', fromJS(vendors)).set('lastPage', parseInt(lastPage, 10));
			}
		}),
		...pender({
			type: GET_VENDORS_FOR_SELECT,
			onSuccess: (state, action) => {
				const { data: vendorList } = action.payload.data;

				return state.set('vendorList', fromJS(vendorList));
			}
		}),
		...pender({
			type: SEARCH_VENDORS,
			onSuccess: (state, action) => {
				const { data: vendors } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state
					.set('vendors', fromJS(vendors))
					.set('lastPage', parseInt(lastPage, 10))
					.setIn([ 'search', 'isSearch' ], true);
			}
		}),
		...pender({
			type: GET_VENDOR,
			onSuccess: (state, action) => {
				const { data: vendor } = action.payload.data;

				return state
					.set('vendor', fromJS(vendor))
					.setIn([ 'edit', 'vendorGb' ], vendor.vendorGb === '계약' ? '01' : '02')
					.setIn([ 'edit', 'countryCd' ], vendor.countryCd === '국내' ? '01' : '02')
					.setIn([ 'edit', 'vendorName' ], vendor.vendorName)
					.setIn([ 'edit', 'effStaDt' ], vendor.effStaDt)
					.setIn([ 'edit', 'effEndDt' ], vendor.effEndDt)
					.setIn([ 'edit', 'part' ], vendor.part._id)
					.setIn([ 'edit', 'partNumber' ], vendor.partNumber)
					.setIn([ 'edit', 'officialName' ], vendor.officialName);
			}
		}),
		...pender({
			type: ADD_VENDOR,
			onSuccess: (state, action) => {
				const { data: vendor } = action.payload.data;

				return state.set('add', initialState.get('add')).set('vendor', fromJS(vendor));
			}
		}),
		...pender({
			type: EDIT_VENDOR,
			onSuccess: (state, action) => {
				const { data: vendor } = action.payload.data;

				return state
					.set('vendor', fromJS(vendor))
					.setIn([ 'edit', 'vendorGb' ], vendor.vendorGb === '계약' ? '01' : '02')
					.setIn([ 'edit', 'countryCd' ], vendor.countryCd === '국내' ? '01' : '02')
					.setIn([ 'edit', 'vendorName' ], vendor.vendorName)
					.setIn([ 'edit', 'effStaDt' ], vendor.effStaDt)
					.setIn([ 'edit', 'effEndDt' ], vendor.effEndDt)
					.setIn([ 'edit', 'part' ], vendor.part._id)
					.setIn([ 'edit', 'partNumber' ], vendor.partNumber)
					.setIn([ 'edit', 'officialName' ], vendor.officialName);
			}
		}),
		...pender({
			type: DELETE_VENDOR,
			onSuccess: (state, action) => {
				return state.set('target', initialState.target);
			}
		}),
		...pender({
			type: ADD_PERSON,
			onSuccess: (state, action) => {
				const { data: vendor } = action.payload.data;

				return state
					.set('vendor', fromJS(vendor))
					.setIn([ 'edit', 'vendorGb' ], vendor.vendorGb === '계약' ? '01' : '02')
					.setIn([ 'edit', 'countryCd' ], vendor.countryCd === '국내' ? '01' : '02')
					.setIn([ 'edit', 'vendorName' ], vendor.vendorName)
					.setIn([ 'edit', 'effStaDt' ], vendor.effStaDt)
					.setIn([ 'edit', 'effEndDt' ], vendor.effEndDt)
					.setIn([ 'edit', 'part' ], vendor.part._id)
					.setIn([ 'edit', 'partNumber' ], vendor.partNumber)
					.setIn([ 'edit', 'officialName' ], vendor.officialName);
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'add', name ], value);
		},
		[ON_CHANGE_EDIT]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'edit', name ], value);
		},
		[ON_CHANGE_SEARCH]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'search', name ], value);
		},
		[ON_CHANGE_PERSON]: (state, action) => {
			const { index, name, value } = action.payload;
			const persons = state.get('persons');

			const target = persons.findIndex((person) => person.index === index);

			return state.setIn([ 'persons', target, name ], value);
		},
		[SET_TARGET]: (state, action) => {
			const { payload } = action;

			return state.set('target', payload);
		},
		[ADD_PERSON_FORM]: (state, action) => {
			return state.update('persons', (persons) =>
				persons.push(
					Map({
						...persons.get(0).toJS(),
						index: persons.getIn([ persons.size - 1, 'index' ]) + 1
					})
				)
			);
		},
		[DELETE_PERSON_FORM]: (state, action) => {
			const { payload: index } = action;
			const persons = state.get('persons');

			const target = index === -1 ? -1 : persons.findIndex((person) => person.get('index') === index);

			return persons.size === 1 ? state : state.update('persons', (persons) => persons.remove(target));
		}
	},
	initialState
);
