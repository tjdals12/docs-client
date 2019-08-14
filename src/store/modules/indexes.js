import { List, Map, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_INDEXES = 'indexes/GET_INDEXES';
const ON_CHANGE_SEARCH = 'indexes/ON_CHANGE_SEARCH';

export const getIndexes = createAction(GET_INDEXES, api.getIndexes);
export const onChangeSearch = createAction(ON_CHANGE_SEARCH);

const initialState = Map({
	indexes: List(),
	search: Map({
		part: '',
		partNumber: '',
		vendorName: '',
		officialName: ''
	}),
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
		[ON_CHANGE_SEARCH]: (state, action) => {
			const { name, value } = action.payload;

			return state.setIn([ 'search', name ], value);
		}
	},
	initialState
);
