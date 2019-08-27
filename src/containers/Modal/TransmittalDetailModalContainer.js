import React from 'react';
import TransmittalDetailModal from 'components/Modal/TransmittalDetailModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vendorActions from 'store/modules/vendor';
import * as transmittalActions from 'store/modules/transmittal';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';

class TransmittalDetailModalContainer extends React.Component {
	getDocument = (id) => {
		const { DocumentActions } = this.props;

		DocumentActions.getDocument({ id });
	};

	handleTarget = ({ id }) => {
		const { TransmittalActions } = this.props;

		TransmittalActions.setTarget(id);
	};

	handleTargetVendor = (id) => {
		const { VendorActions } = this.props;

		VendorActions.setTarget(id);
	};

	handleOpen = (name) => () => {
		const { ModalActions } = this.props;

		ModalActions.open(name);
	};

	handleOpenDetail = (id) => async () => {
		const { ModalActions } = this.props;

		await this.getDocument(id);
		ModalActions.open('documentDetail');
	};

	handleClose = (name) => () => {
		const { ModalActions } = this.props;

		ModalActions.close(name);
	};

	render() {
		const { isOpen, isOpenQuestion, transmittal, loading } = this.props;

		if (loading || loading === undefined) return null;

		return (
			<TransmittalDetailModal
				isOpen={isOpen}
				isOpenQuestion={isOpenQuestion}
				data={transmittal}
				onClose={this.handleClose}
				onTarget={this.handleTarget}
				onTargetVendor={this.handleTargetVendor}
				onOpen={this.handleOpen}
				onOpenDetail={this.handleOpenDetail}
			/>
		);
	}
}

export default connect(
	(state) => ({
		isOpen: state.modal.get('transmittalDetailModal'),
		isOpenQuestion: state.modal.get('questionModal'),
		transmittal: state.transmittal.get('transmittal'),
		loading: state.pender.pending['transmittal/GET_TRANSMITTAL']
	}),
	(dispatch) => ({
		VendorActions: bindActionCreators(vendorActions, dispatch),
		TransmittalActions: bindActionCreators(transmittalActions, dispatch),
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(TransmittalDetailModalContainer);
