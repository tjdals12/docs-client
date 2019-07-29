import React from 'react';
import DocumentEditModal from 'components/Modal/DocumentEditModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';
import * as cmcodeActions from 'store/modules/cmcode';
class DocumentEditModalContainer extends React.Component {
	getCmcodes = async (major) => {
		const { CmcodeActions } = this.props;

		await CmcodeActions.getCmcodeByMajor({ major: major });
	};

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

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen === false && this.props.isOpen !== prevProps.isOpen) {
			this.getCmcodes('0001');
			this.getCmcodes('0002');
		}
	}

	render() {
		const { parts, gbs, document, isOpen } = this.props;

		if (!parts || !gbs) return null;

		return (
			<DocumentEditModal
				data={document}
				parts={parts}
				gbs={gbs}
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
		parts: state.cmcode.get('0001'),
		gbs: state.cmcode.get('0002'),
		isOpen: state.modal.get('documentEditModal')
	}),
	(dispatch) => ({
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch),
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch)
	})
)(DocumentEditModalContainer);
