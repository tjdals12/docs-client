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

		DocumentActions.onChangeSearch({ name, value });
	};

	handleSearch = async () => {
		const { DocumentActions, search, history } = this.props;

		await DocumentActions.searchDocuments(1, search.toJS());
		history.push('/documents?page=1');
	};

	componentDidMount() {
		this.getCmcodes('0003');
	}

	render() {
		const { status, search } = this.props;

		if (!status) return null;

		return (
			<DocumentSearchForm
				status={status}
				search={search}
				onChange={this.handleChange}
				onSearch={this.handleSearch}
			/>
		);
	}
}

export default connect(
	(state) => ({
		status: state.cmcode.get('0003'),
		search: state.document.get('search')
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch)
	})
)(withRouter(DocumentSearchFormContainer));
