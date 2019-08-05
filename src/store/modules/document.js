import { List, Map, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';
import moment from 'moment';

const GET_DOCUMENTS = 'document/GET_DOCUMENTS';
const SEARCH_DOCUMENTS = 'document/SEARCH_DOCUMENTS';
const GET_DOCUMENT = 'document/GET_DOCUMENT';
const ADD_DOCUMENT = 'document/ADD_DOCUMENT';
const HOLD_DOCUMENT = 'document/HOLD_DOCUMENT';
const DELETE_DOCUMENT = 'document/DELETE_DOCUMENT';
const DELETE_DOCUMENTS = 'document/DELETE_DOCUMENTS';
const EDIT_DOCUMENT = 'document/EDIT_DOCUMENT';
const INOUT_DOCUMENT = 'document/INOUT_DOCUMENT';
const DELETE_INOUT_DOCUMENT = 'document/DELETE_INOUT_DOCUMENT';
const ON_CHANGE = 'document/ON_CHANGE';
const ON_CHANGE_EDIT = 'document/ON_CHANGE_EDIT';
const ON_CHANGE_OTHER = 'document/ON_CHANGE_OTHER';
const ON_CHANGE_SEARCH = 'document/ON_CHANGE_SEARCH';
const SET_TARGET = 'document/SET_TARGET';
const SET_CHECKED_LIST = 'document/SET_CHECKED_LIST';

export const getDocuments = createAction(GET_DOCUMENTS, api.getDocuments);
export const searchDocuments = createAction(SEARCH_DOCUMENTS, api.searchDocuments);
export const getDocument = createAction(GET_DOCUMENT, api.getDocument);
export const addDocument = createAction(ADD_DOCUMENT, api.addDocument);
export const holdDocument = createAction(HOLD_DOCUMENT, api.holdDocument);
export const deleteDocument = createAction(DELETE_DOCUMENT, api.deleteDocument);
export const deleteDocuments = createAction(DELETE_DOCUMENTS, api.deleteDocuments);
export const editDocument = createAction(EDIT_DOCUMENT, api.editDocument);
export const inOutDocument = createAction(INOUT_DOCUMENT, api.inOutDocument);
export const deleteInOutDocument = createAction(DELETE_INOUT_DOCUMENT, api.deleteInOutDocument);
export const onChange = createAction(ON_CHANGE);
export const onChangeEdit = createAction(ON_CHANGE_EDIT);
export const onChangeOther = createAction(ON_CHANGE_OTHER);
export const onChangeSearch = createAction(ON_CHANGE_SEARCH);
export const setTarget = createAction(SET_TARGET);
export const setCheckedList = createAction(SET_CHECKED_LIST);

const initialState = Map({
	documents: List(),
	document: Map(),
	add: Map({
		vendor: '',
		part: '',
		documentTitle: '',
		documentNumber: '',
		documentGb: '',
		documentRev: '',
		officialNumber: '',
		memo: ''
	}),
	edit: Map({
		vendor: '',
		part: '',
		documentTitle: '',
		documentNumber: '',
		documentGb: '',
		documentRev: '',
		officialNumber: '',
		memo: ''
	}),
	search: Map({
		documentNumber: '',
		documentTitle: '',
		documentRev: '',
		regDtSta: moment().subtract(7, 'days').format('YYYY-MM-DD'),
		regDtEnd: moment().add(1, 'days').format('YYYY-MM-DD'),
		isSearch: false
	}),
	reason: '',
	status: '',
	date: new Date(),
	target: '',
	checkedList: List(),
	lastPage: null
});

export default handleActions(
	{
		...pender({
			type: GET_DOCUMENTS,
			onSuccess: (state, action) => {
				const { data: documents } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('documents', fromJS(documents)).set('lastPage', parseInt(lastPage, 10));
			}
		}),
		...pender({
			type: SEARCH_DOCUMENTS,
			onSuccess: (state, action) => {
				const { data: documents } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state
					.set('documents', fromJS(documents))
					.set('lastPage', parseInt(lastPage, 10))
					.setIn([ 'search', 'isSearch' ], true);
			}
		}),
		...pender({
			type: ADD_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state.set('add', initialState.get('add')).set('document', fromJS(document));
			}
		}),
		...pender({
			type: GET_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state
					.set('document', fromJS(document))
					.setIn([ 'edit', 'vendor' ], document.vendor)
					.setIn([ 'edit', 'part' ], document.part._id)
					.setIn([ 'edit', 'documentTitle' ], document.documentTitle)
					.setIn([ 'edit', 'documentNumber' ], document.documentNumber)
					.setIn([ 'edit', 'documentGb' ], document.documentGb._id)
					.setIn([ 'edit', 'documentRev' ], document.documentRev)
					.setIn([ 'edit', 'officialNumber' ], document.documentInOut[0].officialNumber)
					.setIn([ 'edit', 'memo' ], document.memo);
			}
		}),
		...pender({
			type: HOLD_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state.set('document', fromJS(document)).set('reason', '');
			}
		}),
		...pender({
			type: DELETE_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state.set('document', fromJS(document)).set('reason', '');
			}
		}),
		...pender({
			type: DELETE_DOCUMENTS,
			onSuccess: (state, action) => {
				const { data: documents } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('documents', fromJS(documents)).set('lastPage', parseInt(lastPage, 10));
			}
		}),
		...pender({
			type: EDIT_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state
					.set('document', fromJS(document))
					.setIn([ 'edit', 'vendor' ], document.vendor)
					.setIn([ 'edit', 'part' ], document.part)
					.setIn([ 'edit', 'documentTitle' ], document.documentTitle)
					.setIn([ 'edit', 'documentNumber' ], document.documentNumber)
					.setIn([ 'edit', 'documentGb' ], document.documentGb)
					.setIn([ 'edit', 'documentRev' ], document.documentRev)
					.setIn([ 'edit', 'officialNumber' ], document.documentInOut[0].officialNumber)
					.setIn([ 'edit', 'memo' ], document.memo);
			}
		}),
		...pender({
			type: INOUT_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state.set('document', fromJS(document));
			}
		}),
		...pender({
			type: DELETE_INOUT_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state.set('document', fromJS(document));
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
		[ON_CHANGE_OTHER]: (state, action) => {
			const { name, value } = action.payload;

			return state.set(name, value);
		},
		[ON_CHANGE_SEARCH]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'search', name ], value);
		},
		[SET_TARGET]: (state, action) => {
			const { payload } = action;

			return state.set('target', payload);
		},
		[SET_CHECKED_LIST]: (state, action) => {
			const { checked, value } = action.payload;
			const checkedList = state.get('checkedList');

			if (checked) {
				return state.set('checkedList', checkedList.push(value));
			} else {
				const index = checkedList.findIndex((item) => item === value);

				return state.set('checkedList', checkedList.remove(index));
			}
		}
	},
	initialState
);
