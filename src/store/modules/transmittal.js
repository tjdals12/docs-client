import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

const GET_TRANSMITTALS = 'transmittal/GET_TRANSMITTALS';
const GET_TRANSMITTAL = 'transmittal/GET_TRANSMITTAL';
const ON_CHANGE_SEARCH = 'transmittal/ON_CHANGE_SEARCH';
const SET_TARGET = 'transmittal/SET_TARGET';

export const getTransmittals = createAction(GET_TRANSMITTALS, api.getTransmittals);
export const getTransmittal = createAction(GET_TRANSMITTAL, api.getTransmittal);
export const onChangeSearch = createAction(ON_CHANGE_SEARCH);
export const setTarget = createAction(SET_TARGET);

const initialState = Map({
	transmittals: List(),
	transmittal: Map(),
	search: Map({
		senderGb: '',
		sender: '',
		receiverGb: '',
		receiver: '',
		vendor: '',
		officialNumber: '',
		receiveDate: '2010-01-01',
		targetDate: '9999-12-31',
		letterStatus: '',
		cancelYn: '',
		isSearch: false
	}),
	target: '',
	lastPage: null
});

export default handleActions(
	{
		...pender({
			type: GET_TRANSMITTALS,
			onSuccess: (state, action) => {
				const { data: transmittals } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('transmittals', fromJS(transmittals)).set('lastPage', parseInt(lastPage || 10));
			}
		}),
		...pender({
			type: GET_TRANSMITTAL,
			onSuccess: (state, action) => {
				const { data: transmittal } = action.payload.data;

				return state.set('transmittal', fromJS(transmittal));
			}
		}),
		[ON_CHANGE_SEARCH]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'search', name ], value);
		},
		[SET_TARGET]: (state, action) => {
			const { payload } = action;

			return state.set('target', payload);
		}
	},
	initialState
);
