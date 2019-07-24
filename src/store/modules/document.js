import { List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import * as api from 'lib/api';
import { pender } from 'redux-pender';

const GET_DOCUMENTS = 'document/GET_DOCUMENTS';

export const getDocuments = createAction(GET_DOCUMENTS, api.getDocuments);

const initialState = List();

export default handleActions(
	{
		...pender({
			type: GET_DOCUMENTS,
			onSuccess: (state, action) => {
				const { data: documents } = action.payload.data;

				return fromJS(documents);
			}
		})
	},
	initialState
);
