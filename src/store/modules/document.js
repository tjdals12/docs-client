import { List, Map, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

const GET_DOCUMENTS = 'document/GET_DOCUMENTS';

export const getDocuments = createAction(GET_DOCUMENTS, api.getDocuments);

const initialState = Map({
	documents: List(),
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
		})
	},
	initialState
);
