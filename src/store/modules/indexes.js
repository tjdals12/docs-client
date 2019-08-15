import { List, Map, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_INDEXES = 'indexes/GET_INDEXES';
const GET_INDEXES_FOR_SELECT = 'indexes/GET_INDEXES_FOR_SELECT';
const GET_INDEX = 'indexes/GET_INDEX';
const ADD_INDEX = 'indexes/ADD_INDEX';
const ADD_PARTIAL = 'indexes/ADD_PARTIAL';
const EDIT_INDEX = 'indexes/EDIT_INDEX';
const DELETE_INDEX = 'indexes/DELETE_INDEX';
const ON_CHANGE = 'indexes/ON_CHANGE';
const ON_CHANGE_EDIT = 'indexes/ON_CHANGE_EDIT';
const ON_CHANGE_SEARCH = 'indexes/ON_CHANGE_SEARCH';
const ON_CHANGE_INFO = 'indexes/ON_CHNAGE_INFO';
const SET_TARGET = 'indexes/SET_TARGET';
const ADD_INFO_FORM = 'indexes/ADD_INFO_FORM';
const DELETE_INFO_FORM = 'indexes/DELETE_INFO_FORM';
const ADD_INFO_BY_EXCEL = 'indexes/ADD_INFO_BY_EXCEL';

export const getIndexes = createAction(GET_INDEXES, api.getIndexes);
export const getIndexesForSelect = createAction(GET_INDEXES_FOR_SELECT, api.getIndexesForSelect);
export const getIndex = createAction(GET_INDEX, api.getIndex);
export const addIndex = createAction(ADD_INDEX, api.addIndex);
export const addPartial = createAction(ADD_PARTIAL, api.addPartial);
export const editIndex = createAction(EDIT_INDEX, api.editIndex);
export const deleteIndex = createAction(DELETE_INDEX, api.deleteIndex);
export const onChange = createAction(ON_CHANGE);
export const onChangeEdit = createAction(ON_CHANGE_EDIT);
export const onChangeSearch = createAction(ON_CHANGE_SEARCH);
export const onChangeInfo = createAction(ON_CHANGE_INFO);
export const setTarget = createAction(SET_TARGET);
export const addInfoForm = createAction(ADD_INFO_FORM);
export const deleteInfoForm = createAction(DELETE_INFO_FORM);
export const addInfoByExcel = createAction(ADD_INFO_BY_EXCEL);

const initialState = Map({
	indexes: List(),
	vendorList: List(),
	index: Map(),
	add: Map({
		vendor: '',
		list: []
	}),
	edit: Map({
		vendor: '',
		list: []
	}),
	search: Map({
		part: '',
		partNumber: '',
		vendorName: '',
		officialName: ''
	}),
	infos: List([
		Map({
			index: 0,
			documentNumber: '',
			documentTitle: '',
			plan: ''
		})
	]),
	target: '',
	lastPage: null
});

export default handleActions(
	{
		...pender({
			type: GET_INDEXES,
			onSuccess: (state, action) => {
				const { data: indexes } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('indexes', fromJS(indexes)).set('lastPage', parseInt(lastPage, 10));
			}
		}),
		...pender({
			type: GET_INDEXES_FOR_SELECT,
			onSuccess: (state, action) => {
				const { data: vendorList } = action.payload.data;

				return state.set('vendorList', fromJS(vendorList));
			}
		}),
		...pender({
			type: GET_INDEX,
			onSuccess: (state, action) => {
				const { data: index } = action.payload.data;

				return state
					.set('index', fromJS(index))
					.setIn([ 'edit', 'vendor' ], index.vendor._id)
					.setIn([ 'edit', 'list' ], index.list);
			}
		}),
		...pender({
			type: ADD_INDEX,
			onSuccess: (state, action) => {
				const { data: index } = action.payload.data;

				return state.set('add', initialState.get('add')).set('index', fromJS(index));
			}
		}),
		...pender({
			type: ADD_PARTIAL,
			onSuccess: (state, action) => {
				const { data: index } = action.payload.data;

				return state.set('target', '').set('infos', initialState.get('infos')).set('index', fromJS(index));
			}
		}),
		...pender({
			type: EDIT_INDEX,
			onSuccess: (state, action) => {
				const { data: index } = action.payload.data;

				return state.set('edit', initialState.get('edit')).set('indexe', fromJS(index));
			}
		}),
		...pender({
			type: DELETE_INDEX,
			onSuccess: (state, action) => {
				const { data: indexes } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('indexes', fromJS(indexes)).set('lastPage', parseInt(lastPage, 10));
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
		[ON_CHANGE_INFO]: (state, action) => {
			const { index, name, value } = action.payload;
			const infos = state.get('infos');
			const target = infos.findIndex((info) => info.get('index') === index);

			return state.setIn([ 'infos', target, name ], value);
		},
		[SET_TARGET]: (state, action) => {
			const { payload } = action;

			return state.set('target', payload);
		},
		[ADD_INFO_FORM]: (state, action) => {
			return state.update('infos', (infos) =>
				infos.push(
					Map({
						...initialState.getIn([ 'infos', 0 ]).toJS(),
						index: infos.getIn([ infos.size - 1, 'index' ]) + 1
					})
				)
			);
		},
		[DELETE_INFO_FORM]: (state, action) => {
			const { payload: index } = action;
			const infos = state.get('infos');

			const target = index === -1 ? -1 : infos.findIndex((info) => info.get('index') === index);

			return infos.size === 1 ? state : state.update('infos', (infos) => infos.remove(target));
		},
		[ADD_INFO_BY_EXCEL]: (state, action) => {
			const { payload: data } = action;
			const infos = state.get('infos');
			let currentIndex = infos.getIn([ infos.size - 1, 'index' ]);

			const newInfos = data.map((info) => {
				return Map({
					...info,
					plan: info.plan.substr(0, 10),
					index: ++currentIndex
				});
			});

			return state.update('infos', (infos) => infos.concat(newInfos));
		}
	},
	initialState
);
