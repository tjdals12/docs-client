import React from 'react';
import DocumentSearchForm from 'components/Form/DocumentSearchForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';
import * as cmcodeActions from 'store/modules/cmcode';

class DocumentSearchFormContainer extends React.Component {
	getCmcodes = async (major) => {
		const { CmcodeActions } = this.props;

		await CmcodeActions.getCmcodeByMajor({ major: major });
	};

	handleChange = (e) => {
		const { DocumentActions } = this.props;
		const { name, value } = e.target;

		DocumentActions.onChange({ target: 'search', name, value });
	};

	handleSearch = async () => {
		const { DocumentActions, search, history } = this.props;

		await DocumentActions.searchDocuments(1, search.toJS());
		history.push('/documents?page=1');
	};

	handleFullPeriod = () => {
		const { DocumentActions } = this.props;

		DocumentActions.setToFullPeriod();
	};

	componentDidMount() {
		this.getCmcodes('0002');
		this.getCmcodes('0003');
	}

	render() {
		const { gb, status, search } = this.props;

		if (!status || !gb) return null;

		return (
			<DocumentSearchForm
				gb={gb}
				status={status}
				search={search}
				onChange={this.handleChange}
				onSearch={this.handleSearch}
				onFullPeriod={this.handleFullPeriod}
			/>
		);
	}
}

export default connect(
	(state) => ({
		gb: state.cmcode.get('0002'),
		status: state.cmcode.get('0003'),
		search: state.document.get('search')
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch)
	})
)(withRouter(DocumentSearchFormContainer));
