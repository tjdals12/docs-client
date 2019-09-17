import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_LETTERS = 'letter/GET_LETTERS';

export const getLetters = createAction(GET_LETTERS, api.getLetters);

const initialState = Map({
	letters: List(),
	lastPage: null
});

export default handleActions(
	{
		...pender({
			type: GET_LETTERS,
			onSuccess: (state, action) => {
				const { data: letters } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('letters', fromJS(letters)).set('lastPage', parseInt(lastPage, 10));
			}
		})
	},
	initialState
);
