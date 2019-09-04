import React from 'react';
import TransmittalDetailModal from 'components/Modal/TransmittalDetailModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cmcodeActions from 'store/modules/cmcode';
import * as vendorActions from 'store/modules/vendor';
import * as transmittalActions from 'store/modules/transmittal';
import * as documentActions from 'store/modules/document';
import * as modalActions from 'store/modules/modal';

class TransmittalDetailModalContainer extends React.Component {
	getCmcodes = (major) => {
		const { CmcodeActions } = this.props;

		CmcodeActions.getCmcodeByMajor({ major: major });
	};

	getDocument = (id) => {
		const { DocumentActions } = this.props;

		DocumentActions.getDocument({ id });
	};

	handleClose = (name) => () => {
		const { ModalActions } = this.props;

		ModalActions.close(name);
	};

	handleChange = (e) => {
		const { TransmittalActions } = this.props;
		const { name, value } = e.target;

		TransmittalActions.onChange({ name, value });
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

		if (name === 'transmittalEdit') {
			ModalActions.close('transmittalDetail');
		}

		ModalActions.open(name);
	};

	handleOpenDetail = (id) => async () => {
		const { ModalActions } = this.props;

		await this.getDocument(id);
		ModalActions.open('documentDetail');
	};

	handleDelete = ({ id, yn }) => () => {
		const { TransmittalActions, reason } = this.props;

		TransmittalActions.deleteTransmittal({ id, yn, reason });
	};

	handleDate = (date) => {
		const { TransmittalActions } = this.props;

		TransmittalActions.onChange({ name: 'date', value: date });
	};

	handleStatus = ({ id }) => () => {
		const { TransmittalActions, selectedStatus, date } = this.props;

		TransmittalActions.inOutTransmittal(id, Object.assign(JSON.parse(selectedStatus), { date: date }));
	};

	handleDeleteStatus = async () => {
		const { ModalActions, TransmittalActions, transmittal, target } = this.props;

		await TransmittalActions.deleteInOutTransmittal({ id: transmittal.get('_id'), target });
		ModalActions.close('question');
	};

	componentDidUpdate(prevProps) {
		if (prevProps.isOpen === false && this.props.isOpen !== prevProps.isOpen) {
			this.getCmcodes('0003');
		}
	}

	render() {
		const { codes, date, isOpen, isOpenQuestion, transmittal, reasonError, loading } = this.props;

		if (!codes || loading || loading === undefined) return null;

		return (
			<TransmittalDetailModal
				codes={codes}
				date={date}
				reasonError={reasonError}
				isOpen={isOpen}
				isOpenQuestion={isOpenQuestion}
				data={transmittal}
				onClose={this.handleClose}
				onChange={this.handleChange}
				onTarget={this.handleTarget}
				onTargetVendor={this.handleTargetVendor}
				onOpen={this.handleOpen}
				onOpenDetail={this.handleOpenDetail}
				onDelete={this.handleDelete}
				onDate={this.handleDate}
				onStatus={this.handleStatus}
				onDeleteStatus={this.handleDeleteStatus}
			/>
		);
	}
}

export default connect(
	(state) => ({
		codes: state.cmcode.get('0003'),
		selectedStatus: state.transmittal.get('status'),
		date: state.transmittal.get('date'),
		isOpen: state.modal.get('transmittalDetailModal'),
		isOpenQuestion: state.modal.get('questionModal'),
		transmittal: state.transmittal.get('transmittal'),
		reason: state.transmittal.get('reason'),
		reasonError: state.transmittal.get('reasonError'),
		target: state.transmittal.get('target'),
		loading: state.pender.pending['transmittal/GET_TRANSMITTAL']
	}),
	(dispatch) => ({
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch),
		VendorActions: bindActionCreators(vendorActions, dispatch),
		TransmittalActions: bindActionCreators(transmittalActions, dispatch),
		DocumentActions: bindActionCreators(documentActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(TransmittalDetailModalContainer);
