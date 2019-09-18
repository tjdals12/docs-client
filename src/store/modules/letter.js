import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import moment from 'moment';

const GET_LETTERS = 'letter/GET_LETTERS';
const ADD_LETTER = 'letter/ADD_LETTER';
const GET_LETTER = 'letter/GET_LETTER';
const ON_CHANGE = 'letter/ON_CHANGE';

export const getLetters = createAction(GET_LETTERS, api.getLetters);
export const addLetter = createAction(ADD_LETTER, api.addLetter);
export const getLetter = createAction(GET_LETTER, api.getLetter);
export const onChange = createAction(ON_CHANGE);

const initialState = Map({
	letters: List(),
	letter: Map({}),
	add: Map({
		letterGb: '',
		letterTitle: '',
		senderGb: '',
		sender: '',
		receiverGb: '',
		receiver: '',
		sendDate: moment().format('YYYY-MM-DD'),
		replyRequired: ''
	}),
	errors: Map({
		letterGbError: false,
		letterTitleError: false,
		senderGbError: false,
		senderError: false,
		receiverGbError: false,
		receiverError: false,
		sendDateError: false,
		replyRequiredError: false
	}),
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
		}),
		...pender({
			type: ADD_LETTER,
			onSuccess: (state, action) => {
				const { data: letter } = action.payload.data;

				return state.set('letter', fromJS(letter));
			},
			onFailure: (state, action) => {
				const add = state.get('add');

				return state
					.setIn([ 'errors', 'letterGbError' ], add.get('letterGb') === '')
					.setIn([ 'errors', 'letterTitleError' ], add.get('letterTitle') === '')
					.setIn([ 'errors', 'senderGbError' ], add.get('senderGb') === '')
					.setIn([ 'errors', 'senderError' ], add.get('sender') === '')
					.setIn([ 'errors', 'receiverGbError' ], add.get('receiverGb') === '')
					.setIn([ 'errors', 'receiverError' ], add.get('receiver') === '')
					.setIn([ 'errors', 'sendDateError' ], add.get('sendDate') === '')
					.setIn([ 'errors', 'replyRequiredError' ], add.get('replyRequired') === '');
			}
		}),
		...pender({
			type: GET_LETTER,
			onSuccess: (state, action) => {
				const { data: letter } = action.payload.data;

				return state.set('letter', fromJS(letter));
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { target, name, value } = action.payload;

			return !target ? state.set(name, value) : state.setIn([ target, name ], value);
		}
	},
	initialState
);
