import React from 'react';
import DocumentEditModal from 'components/Modal/DocumentEditModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';

class DocumentEditModalContainer extends React.Component {
	handleEdit = () => async () => {
		const { DocumentActions, ModalActions, id, document } = this.props;

		await DocumentActions.editDocument({ id, document: document.toJS() });
		ModalActions.close('documentEdit');
		ModalActions.open('documentDetail');
	};

	handleChange = (e) => {
		const { DocumentActions } = this.props;
		const { name, value } = e.target;

		DocumentActions.onChangeEdit({ name, value });
	};

	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('documentEdit');
	};

	render() {
		const { document, isOpen } = this.props;

		return (
			<DocumentEditModal
				data={document}
				isOpen={isOpen}
				onClose={this.handleClose}
				onChange={this.handleChange}
				onEdit={this.handleEdit}
			/>
		);
	}
}

export default connect(
	(state) => ({
		id: state.document.getIn([ 'document', 'id' ]),
		document: state.document.get('edit'),
		isOpen: state.modal.get('documentEditModal')
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(DocumentEditModalContainer);
