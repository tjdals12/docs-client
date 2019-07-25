import React from 'react';
import DocumentTable from 'components/Table/DocumentTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';

class DocumentTableContainer extends React.Component {
	getDocuments = () => {
		const { DocumentActions, page } = this.props;

		DocumentActions.getDocuments({ page });
	};

	componentDidMount() {
		this.getDocuments();
	}

	render() {
		const { documents, lastPage, loading, page } = this.props;

		if (loading) return null;

		return <DocumentTable currentPage={page} lastPage={lastPage} data={documents} bordered striped hover />;
	}
}

export default connect(
	(state) => ({
		documents: state.document.get('documents'),
		lastPage: state.document.get('lastPage'),
		loading: state.pender.pending['document/GET_DOCUMENTS']
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch)
	})
)(DocumentTableContainer);
