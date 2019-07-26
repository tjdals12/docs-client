import { List, Map, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

const GET_DOCUMENTS = 'document/GET_DOCUMENTS';
const GET_DOCUMENT = 'document/GET_DOCUMENT';
const ADD_DOCUMENT = 'document/ADD_DOCUMENT';
const HOLD_DOCUMENT = 'document/HOLD_DOCUMENT';
const DELETE_DOCUMENT = 'document/DELETE_DOCUMENT';
const EDIT_DOCUMENT = 'document/EDIT_DOCUMENT';
const ON_CHANGE = 'document/ON_CHANGE';
const ON_CHANGE_EDIT = 'document/ON_CHANGE_EDIT';
const ON_CHANGE_REASON = 'document/ON_CHANGE_REASON';

export const getDocuments = createAction(GET_DOCUMENTS, api.getDocuments);
export const getDocument = createAction(GET_DOCUMENT, api.getDocument);
export const addDocument = createAction(ADD_DOCUMENT, api.addDocument);
export const holdDocument = createAction(HOLD_DOCUMENT, api.holdDocument);
export const deleteDocument = createAction(DELETE_DOCUMENT, api.deleteDocument);
export const editDocument = createAction(EDIT_DOCUMENT, api.editDocument);
export const onChange = createAction(ON_CHANGE);
export const onChangeEdit = createAction(ON_CHANGE_EDIT);
export const onChangeReason = createAction(ON_CHANGE_REASON);

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
	reason: '',
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
			type: ADD_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state.set('add', initialState.get('document')).set('document', fromJS(document));
			}
		}),
		...pender({
			type: GET_DOCUMENT,
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
			type: HOLD_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state.set('document', fromJS(document));
			}
		}),
		...pender({
			type: DELETE_DOCUMENT,
			onSuccess: (state, action) => {
				const { data: document } = action.payload.data;

				return state.set('document', fromJS(document));
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
		[ON_CHANGE]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'add', name ], value);
		},
		[ON_CHANGE_EDIT]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'edit', name ], value);
		},
		[ON_CHANGE_REASON]: (state, action) => {
			const { name, value } = action.payload;

			return state.set(name, value);
		}
	},
	initialState
);
