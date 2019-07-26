import React from 'react';
import DocumentTable from 'components/Table/DocumentTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';

class DocumentTableContainer extends React.Component {
	getDocuments = () => {
		const { DocumentActions, page } = this.props;

		DocumentActions.getDocuments({ page });
	};

	getDocument = (id) => {
		const { DocumentActions } = this.props;

		DocumentActions.getDocument({ id });
	};

	componentDidMount() {
		this.getDocuments();
	}

	handleOpenAdd = () => {
		const { ModalActions } = this.props;

		ModalActions.open('documentAdd');
	};

	handleOpenDetail = ({ id }) => async () => {
		const { ModalActions } = this.props;

		await this.getDocument(id);

		ModalActions.open('documentDetail');
	};

	render() {
		const { documents, lastPage, loading, page } = this.props;

		if (loading) return null;

		return (
			<DocumentTable
				currentPage={parseInt(page, 10) || 1}
				lastPage={lastPage}
				data={documents}
				onOpenAdd={this.handleOpenAdd}
				onOpenDetail={this.handleOpenDetail}
				bordered
				striped
				hover
			/>
		);
	}
}

export default connect(
	(state) => ({
		documents: state.document.get('documents'),
		lastPage: state.document.get('lastPage'),
		loading: state.pender.pending['document/GET_DOCUMENTS']
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(DocumentTableContainer);
