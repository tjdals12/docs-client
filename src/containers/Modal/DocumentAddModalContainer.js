import React from 'react';
import DocumentAddModal from 'components/Modal/DocumentAddModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';

class DocumentAddModalContainer extends React.Component {
	handleInsert = async () => {
		const { document, DocumentActions, onClose } = this.props;

		await DocumentActions.addDocument(document.toJS());
		onClose();
	};

	handleChange = (e) => {
		const { DocumentActions } = this.props;
		const { name, value } = e.target;

		DocumentActions.onChange({ name, value });
	};

	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('documentAdd');
	};

	render() {
		const { isOpen } = this.props;

		return (
			<DocumentAddModal
				isOpen={isOpen}
				onClose={this.handleClose}
				onChange={this.handleChange}
				onInsert={this.handleInsert}
			/>
		);
	}
}

export default connect(
	(state) => ({
		document: state.document.get('document'),
		isOpen: state.modal.get('documentAddModal')
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(DocumentAddModalContainer);
