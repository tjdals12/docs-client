import { Map, List, fromJS } from 'immutable';
import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as api from 'lib/api';

const GET_PROJECTS = 'project/GET_PROJECTS';
const GET_PROJECT = 'project/GET_PROJECT';
const SELECT_PROJECT = 'project/SELECT_PROJECT';

export const getProjects = createAction(GET_PROJECTS, api.getProjects);
export const getProject = createAction(GET_PROJECT, api.getProject);
export const selectProject = createAction(SELECT_PROJECT);

const initialState = Map({
	projects: List(),
	project: Map({}),
	total: 0,
	lastPage: null
});

export default handleActions(
	{
		...pender({
			type: GET_PROJECTS,
			onSuccess: (state, action) => {
				let { data: projects } = action.payload.data;

				projects = projects.map((project, index) => ({
					...project,
					index: index + 1,
					period: `${project.effStaDt.substr(0, 7)} ~ ${project.effEndDt.substr(0, 7)}`
				}));

				const count = action.payload.headers['total'];
				const lastPage = action.payload.headers['last-page'];

				return state
					.set('projects', fromJS(projects))
					.set('total', parseInt(count, 10))
					.set('lastPage', parseInt(lastPage || 1, 10));
			}
		}),
		...pender({
			type: GET_PROJECT,
			onSuccess: (state, action) => {
				const { data: project } = action.payload.data;

				return state.set('project', fromJS(project));
			}
		}),
		[SELECT_PROJECT]: (state, action) => {
			const { payload: id } = action;

			const project = state.get('projects').find((project) => project.get('_id') === id);

			return state.set('project', project);
		}
	},
	initialState
);
