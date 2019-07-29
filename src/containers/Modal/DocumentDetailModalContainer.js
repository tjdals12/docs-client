import React from 'react';
import DocumentDetailModal from 'components/Modal/DocumentDetailModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';

class DocumentDetailModalContainer extends React.Component {
	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('documentDetail');
	};

	handleHold = ({ id, yn }) => async () => {
		const { DocumentActions, reason } = this.props;

		await DocumentActions.holdDocument({ id, yn, reason });
		DocumentActions.onChangeReason({ name: 'reason', value: '' });
	};

	handleDelete = ({ id, yn }) => async () => {
		const { DocumentActions, reason } = this.props;

		await DocumentActions.deleteDocument({ id, yn, reason });
		DocumentActions.onChangeReason({ name: 'reason', value: '' });
	};

	handleEdit = () => {
		const { ModalActions } = this.props;

		ModalActions.close('documentDetail');
		ModalActions.open('documentEdit');
	};

	handleChange = (e) => {
		const { DocumentActions } = this.props;
		const { name, value } = e.target;

		DocumentActions.onChangeReason({ name, value });
	};

	render() {
		const { isOpen, document, reason, loading } = this.props;

		console.log(loading);

		if (loading === undefined || loading) return null;

		return (
			<DocumentDetailModal
				isOpen={isOpen}
				data={document}
				reason={reason}
				onClose={this.handleClose}
				onHold={this.handleHold}
				onDelete={this.handleDelete}
				onChange={this.handleChange}
				onEdit={this.handleEdit}
			/>
		);
	}
}

export default connect(
	(state) => ({
		isOpen: state.modal.get('documentDetailModal'),
		document: state.document.get('document'),
		reason: state.document.get('reason'),
		loading: state.pender.pending['document/GET_DOCUMENT']
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(DocumentDetailModalContainer);
