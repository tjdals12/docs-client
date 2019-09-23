import React from 'react';
import CollapseCard from 'components/Card/CollapseCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as projectActions from 'store/modules/project';
import * as cmcodeActions from 'store/modules/cmcode';

class CollpaseCardContainer extends React.Component {
	state = {
		isOpen: false
	};

	getCmcodes = (major) => {
		const { CmcodeActions } = this.props;

		CmcodeActions.getCmcodeByMajor({ major: major });
	};

	getProjects = async (page) => {
		const { ProjectActions } = this.props;

		await ProjectActions.getProjects({ page });
	};

	handleOpen = () => {
		this.setState((prevState) => {
			const { isOpen } = prevState;

			return {
				isOpen: !isOpen
			};
		});
	};

	handleSelect = (e) => {
		const { ProjectActions } = this.props;

		ProjectActions.selectProject(e.dataItem._id);
	};

	componentDidMount() {
		this.getCmcodes('0000');
		this.getProjects(1);
	}

	render() {
		const { isOpen } = this.state;
		const { gbs, projects, project, total, loading } = this.props;

		if (!gbs || (loading || loading === undefined)) return null;

		return (
			<CollapseCard
				gbs={gbs}
				data={projects}
				detail={project}
				total={total}
				isOpen={isOpen}
				onOpen={this.handleOpen}
				onSelect={this.handleSelect}
			/>
		);
	}
}

export default connect(
	(state) => ({
		gbs: state.cmcode.get('0000'),
		projects: state.project.get('projects'),
		project: state.project.get('project'),
		total: state.project.get('total'),
		lastPage: state.project.get('lastPage'),
		loading: state.pender.pending['project/GET_PROJECTS']
	}),
	(dispatch) => ({
		ProjectActions: bindActionCreators(projectActions, dispatch),
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch)
	})
)(CollpaseCardContainer);
