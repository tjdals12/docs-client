import React from 'react';
import DocumentAddModal from 'components/Modal/DocumentAddModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';
import * as cmcodeActions from 'store/modules/cmcode';

class DocumentAddModalContainer extends React.Component {
	getCmcodes = async (major) => {
		const { CmcodeActions } = this.props;

		await CmcodeActions.getCmcodeByMajor({ major: major });
	};

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

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen === false && this.props.isOpen !== prevProps.isOpen) {
			this.getCmcodes('0001');
			this.getCmcodes('0002');
		}
	}

	render() {
		const { parts, gbs, isOpen } = this.props;

		if (!parts || !gbs) return null;

		return (
			<DocumentAddModal
				parts={parts}
				gbs={gbs}
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
		parts: state.cmcode.get('0001'),
		gbs: state.cmcode.get('0002'),
		isOpen: state.modal.get('documentAddModal')
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch),
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch)
	})
)(DocumentAddModalContainer);
