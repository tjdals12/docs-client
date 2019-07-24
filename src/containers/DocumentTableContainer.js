import React from 'react';
import DocumentTable from 'components/Table/DocumentTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';

class DocumentTableContainer extends React.Component {
	getDocuments = () => {
		const { DocumentActions } = this.props;

		DocumentActions.getDocuments();
	};

	componentDidMount() {
		this.getDocuments();
	}

	render() {
		const { documents, loading } = this.props;

		if (loading) return null;

		return <DocumentTable data={documents} bordered striped hover />;
	}
}

export default connect(
	(state) => ({
		documents: state.document,
		loading: state.pender.pending['document/GET_DOCUMENTS']
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch)
	})
)(DocumentTableContainer);
