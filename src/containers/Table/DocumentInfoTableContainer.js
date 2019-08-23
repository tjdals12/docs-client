import React from 'react';
import DocumentInfoTable from 'components/Table/DocumentInfoTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as documentActions from 'store/modules/document';

class DocumentInfoTableContainer extends React.Component {
	getDocument = (id) => {
		const { DocumentActions } = this.props;

		DocumentActions.getDocument({ id });
	};

	handleOpen = ({ id }) => async () => {
		const { ModalActions } = this.props;

		await this.getDocument(id);
		ModalActions.open('documentDetail');
	};

	render() {
		const { data } = this.props;

		return <DocumentInfoTable data={data} onOpen={this.handleOpen} />;
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch),
		DocumentActions: bindActionCreators(documentActions, dispatch)
	})
)(DocumentInfoTableContainer);
