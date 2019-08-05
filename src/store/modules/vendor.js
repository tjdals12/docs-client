import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import moment from 'moment';

const GET_VENDORS = 'vendor/GET_VENDORS';
const ADD_VENDOR = 'vendor/ADD_VENDOR';
const ON_CHANGE = 'vendor/ON_CHANGE';
const ON_CHANGE_SEARCH = 'vendor/ON_CHANGE_SEARCH';

export const getVendors = createAction(GET_VENDORS, api.getVendors);
export const addVendor = createAction(ADD_VENDOR, api.addVendor);
export const onChange = createAction(ON_CHANGE);
export const onChangeSearch = createAction(ON_CHANGE_SEARCH);

const initialState = Map({
	vendors: List(),
	vendor: Map({}),
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
	})
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
			type: ADD_VENDOR,
			onSuccess: (state, action) => {
				const { data: vendor } = action.payload.data;

				return state.set('add', initialState.get('add')).set('vendor', fromJS(vendor));
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'add', name ], value);
		},
		[ON_CHANGE_SEARCH]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'search', name ], value);
		}
	},
	initialState
);
