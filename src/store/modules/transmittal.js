import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';
import moment from 'moment';

const GET_TRANSMITTALS = 'transmittal/GET_TRANSMITTALS';
const SEARCH_TRANSMITTALS = 'transmittal/SEARCH_TRANSMITTALS';
const GET_TRANSMITTAL = 'transmittal/GET_TRANSMITTAL';
const RECEIVE_TRANSMITTAL = 'transmittal/RECEIVE_TRANSMITTAL';
const EDIT_TRANSMITTAL = 'transmittal/EDIT_TRANSMITTAL';
const DELETE_TRANSMITTAL = 'transmittal/DELETE_TRANSMITTAL';
const INOUT_TRANSMITTAL = 'transmittal/INOUT_TRANSMITTAL';
const DELETE_INOUT_TRANSMITTAL = 'transmittal/DELETE_INOUT_TRANSMITTAL';
const ON_CHANGE = 'transmittal/ON_CHANGE';
const SET_TARGET = 'transmittal/SET_TARGET';
const SET_DELETE_DOCUMENT = 'transmittal/SET_DELETE_DOCUMENT';
const DELETE_RECEIVE_DOCUMENT = 'transmittal/DELETE_RECEIVE_DOCUMENT';

export const getTransmittals = createAction(GET_TRANSMITTALS, api.getTransmittals);
export const searchTransmittals = createAction(SEARCH_TRANSMITTALS, api.searchTransmittals);
export const getTransmittal = createAction(GET_TRANSMITTAL, api.getTransmittal);
export const receiveTransmittal = createAction(RECEIVE_TRANSMITTAL, api.receiveTransmittal);
export const editTransmittal = createAction(EDIT_TRANSMITTAL, api.editTransmittal);
export const deleteTransmittal = createAction(DELETE_TRANSMITTAL, api.deleteTransmittal);
export const inOutTransmittal = createAction(INOUT_TRANSMITTAL, api.inOutTransmittal);
export const deleteInOutTransmittal = createAction(DELETE_INOUT_TRANSMITTAL, api.deleteInOutTransmittal);
export const onChange = createAction(ON_CHANGE);
export const setTarget = createAction(SET_TARGET);
export const setDeleteDocument = createAction(SET_DELETE_DOCUMENT);
export const deleteReceiveDocument = createAction(DELETE_RECEIVE_DOCUMENT);

const initialState = Map({
	transmittals: List(),
	transmittal: Map(),
	receive: Map({
		vendor: '',
		senderGb: '',
		sender: '',
		receiverGb: '',
		receiver: '',
		officialNumber: '',
		receiveDocuments: List(),
		receiveDate: moment().format('YYYY-MM-DD'),
		targetDate: moment().add(14, 'days').format('YYYY-MM-DD')
	}),
	edit: Map({
		vendor: '',
		senderGb: '',
		sender: '',
		receiverGb: '',
		receiver: '',
		officialNumber: '',
		receiveDocuments: List(),
		receiveDate: '',
		targetDate: ''
	}),
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
	reason: '',
	status: '',
	date: new Date(),
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
			type: SEARCH_TRANSMITTALS,
			onSuccess: (state, action) => {
				const { data: transmittals } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state
					.set('transmittals', fromJS(transmittals))
					.set('lastPage', parseInt(lastPage || 10))
					.setIn([ 'search', 'isSearch' ], true);
			}
		}),
		...pender({
			type: GET_TRANSMITTAL,
			onSuccess: (state, action) => {
				const { data: transmittal } = action.payload.data;

				return state
					.set('transmittal', fromJS(transmittal))
					.set('edit', fromJS(transmittal))
					.setIn([ 'edit', 'vendor' ], transmittal.vendor._id)
					.setIn([ 'edit', 'deleteDocuments' ], List());
			}
		}),
		...pender({
			type: RECEIVE_TRANSMITTAL,
			onSuccess: (state, action) => {
				const { data: transmittal } = action.payload.data;

				return state.set('transmittal', fromJS(transmittal));
			}
		}),
		...pender({
			type: EDIT_TRANSMITTAL,
			onSuccess: (state, action) => {
				const { data: transmittal } = action.payload.data;

				return state
					.set('transmittal', fromJS(transmittal))
					.set('edit', fromJS(transmittal))
					.setIn([ 'edit', 'vendor' ], transmittal.vendor._id)
					.setIn([ 'edit', 'deleteDocuments' ], List());
			}
		}),
		...pender({
			type: DELETE_TRANSMITTAL,
			onSuccess: (state, action) => {
				const { data: transmittal } = action.payload.data;

				return state.set('transmittal', fromJS(transmittal));
			}
		}),
		...pender({
			type: INOUT_TRANSMITTAL,
			onSuccess: (state, action) => {
				const { data: transmittal } = action.payload.data;

				return state.set('transmittal', fromJS(transmittal));
			}
		}),
		...pender({
			type: DELETE_INOUT_TRANSMITTAL,
			onSuccess: (state, action) => {
				const { data: transmittal } = action.payload.data;

				return state.set('transmittal', fromJS(transmittal));
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { target, name, value } = action.payload;

			return !target ? state.set(name, value) : state.setIn([ target, name ], fromJS(value));
		},
		[SET_TARGET]: (state, action) => {
			const { payload } = action;

			return state.set('target', payload);
		},
		[SET_DELETE_DOCUMENT]: (state, action) => {
			const { payload: id } = action;
			const receiveDocuments = state.getIn([ 'edit', 'documents' ]);
			const index = receiveDocuments.findIndex((document) => document.get('_id') === id);

			return state
				.updateIn([ 'edit', 'documents' ], (receiveDocuments) =>
					receiveDocuments.setIn([ index, 'deleted' ], true)
				)
				.updateIn([ 'edit', 'deleteDocuments' ], (deleteDocuments) => deleteDocuments.push(id));
		},
		[DELETE_RECEIVE_DOCUMENT]: (state, action) => {
			const id = action.payload;
			const receiveDocuments = state.getIn([ 'receive', 'receiveDocuments' ]);
			const index = receiveDocuments.findIndex((document) => document.get('id') === id);

			return state.updateIn([ 'receive', 'receiveDocuments' ], (receiveDocuments) =>
				receiveDocuments.remove(index)
			);
		}
	},
	initialState
);
