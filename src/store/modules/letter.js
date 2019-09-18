import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';
import moment from 'moment';

const GET_LETTERS = 'letter/GET_LETTERS';
const GET_LETTER = 'letter/GET_LETTER';
const ADD_LETTER = 'letter/ADD_LETTER';
const EDIT_LETTER = 'letter/EDIT_LETTER';
const ON_CHANGE = 'letter/ON_CHANGE';

export const getLetters = createAction(GET_LETTERS, api.getLetters);
export const getLetter = createAction(GET_LETTER, api.getLetter);
export const addLetter = createAction(ADD_LETTER, api.addLetter);
export const editLetter = createAction(EDIT_LETTER, api.editLetter);
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
	edit: Map({
		letterGb: '',
		letterTitle: '',
		senderGb: '',
		sender: '',
		receiverGb: '',
		receiver: '',
		sendDate: '',
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
			type: GET_LETTER,
			onSuccess: (state, action) => {
				const { data: letter } = action.payload.data;

				return state
					.set('letter', fromJS(letter))
					.setIn([ 'edit', 'letterGb' ], letter.letterGb === 'E-mail' ? '01' : '02')
					.setIn([ 'edit', 'letterTitle' ], letter.letterTitle)
					.setIn([ 'edit', 'senderGb' ], letter.senderGb)
					.setIn([ 'edit', 'sender' ], letter.sender)
					.setIn([ 'edit', 'receiverGb' ], letter.receiverGb)
					.setIn([ 'edit', 'receiver' ], letter.receiver)
					.setIn([ 'edit', 'sendDate' ], letter.sendDate)
					.setIn([ 'edit', 'replyRequired' ], letter.replyRequired)
					.setIn([ 'edit', 'targetDate' ], letter.targetDate)
					.setIn([ 'edit', 'memo' ], letter.memo);
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
			type: EDIT_LETTER,
			onSuccess: (state, action) => {
				const { data: letter } = action.payload.data;

				return state.set('letter', fromJS(letter));
			},
			onFailure: (state, action) => {
				console.log(action.payload.response.data.data);
				const data = state.get('edit');

				return state
					.setIn([ 'errors', 'letterGbError' ], data.get('letterGb') === '')
					.setIn([ 'errors', 'letterTitleError' ], data.get('letterTitle') === '')
					.setIn([ 'errors', 'senderGbError' ], data.get('senderGb') === '')
					.setIn([ 'errors', 'senderError' ], data.get('sender') === '')
					.setIn([ 'errors', 'receiverGbError' ], data.get('receiverGb') === '')
					.setIn([ 'errors', 'receiverError' ], data.get('receiver') === '')
					.setIn([ 'errors', 'sendDateError' ], data.get('sendDate') === '')
					.setIn([ 'errors', 'replyRequiredError' ], data.get('replyRequired') === '');
			}
		}),
		[ON_CHANGE]: (state, action) => {
			const { target, name, value } = action.payload;

			return !target ? state.set(name, value) : state.setIn([ target, name ], value);
		}
	},
	initialState
);
