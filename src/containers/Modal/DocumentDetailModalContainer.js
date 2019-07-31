import React from 'react';
import DocumentDetailModal from 'components/Modal/DocumentDetailModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';
import * as cmcodeActions from 'store/modules/cmcode';

class DocumentDetailModalContainer extends React.Component {
	getCmcodes = async (major) => {
		const { CmcodeActions } = this.props;

		await CmcodeActions.getCmcodeByMajor({ major: major });
	};

	handleTarget = ({ id }) => {
		const { DocumentActions } = this.props;

		DocumentActions.setTarget(id);
	};

	handleOpen = (name) => () => {
		const { ModalActions } = this.props;

		if (name === 'documentEdit') {
			ModalActions.close('documentDetail');
		}

		ModalActions.open(name);
	};

	handleClose = (name) => () => {
		const { ModalActions } = this.props;

		ModalActions.close(name);
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

	handleChange = (e) => {
		const { DocumentActions } = this.props;
		const { name, value } = e.target;

		DocumentActions.onChangeOther({ name, value });
	};

	handleStatus = ({ id }) => async () => {
		const { DocumentActions, selectedStatus } = this.props;

		await DocumentActions.inOutDocument(id, JSON.parse(selectedStatus));
	};

	handleDeleteStatus = async () => {
		const { DocumentActions, ModalActions, document, target } = this.props;

		await DocumentActions.deleteInOutDocument({ id: document.get('_id'), target });
		ModalActions.close('question');
	};

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen === false && this.props.isOpen !== prevProps.isOpen) {
			this.getCmcodes('0003');
		}
	}

	render() {
		const { codes, isOpen, isOpenQuestion, document, reason, loading } = this.props;

		if (!codes || (loading === undefined || loading)) return null;

		return (
			<DocumentDetailModal
				codes={codes}
				isOpen={isOpen}
				isOpenQuestion={isOpenQuestion}
				data={document}
				reason={reason}
				onClose={this.handleClose}
				onHold={this.handleHold}
				onDelete={this.handleDelete}
				onOpen={this.handleOpen}
				onChange={this.handleChange}
				onStatus={this.handleStatus}
				onDeleteStatus={this.handleDeleteStatus}
				onTarget={this.handleTarget}
			/>
		);
	}
}

export default connect(
	(state) => ({
		codes: state.cmcode.get('0003'),
		selectedStatus: state.document.get('status'),
		isOpen: state.modal.get('documentDetailModal'),
		isOpenQuestion: state.modal.get('questionModal'),
		document: state.document.get('document'),
		reason: state.document.get('reason'),
		target: state.document.get('target'),
		loading: state.pender.pending['document/GET_DOCUMENT']
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch),
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch)
	})
)(DocumentDetailModalContainer);
