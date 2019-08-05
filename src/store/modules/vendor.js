import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_VENDORS = 'vendors/GET_VENDORS';

export const getVendors = createAction(GET_VENDORS, api.getVendors);

const initialState = Map({
	vendors: List()
});

export default handleActions(
	{
		...pender({
			type: GET_VENDORS,
			onSuccess: (state, action) => {
				const { data: vendors } = action.payload.data;
				const lastPage = action.payload.headers['last-page'];

				return state.set('vendors', fromJS(vendors)).set('lastPage', parseInt(lastPage, 10));
			}
		})
	},
	initialState
);
