import React from 'react';
import TransmittalAdditionalReceiveModal from 'components/Modal/TransmittalAdditionalReceiveModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as transmittalActions from 'store/modules/transmittal';
import * as vendorActions from 'store/modules/vendor';
import * as modalActions from 'store/modules/modal';

class TransmittalAdditionalReceiveModalContainer extends React.Component {
	getVendorList = () => {
		const { VendorActions } = this.props;

		VendorActions.getVendorsForSelect();
	};

	getTransmittalsByVendor = (id) => {
		const { TransmittalActions } = this.props;

		TransmittalActions.getTransmittalsByVendor({ vendor: id });
	};

	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('transmittalAdditionalReceive');
	};

	handleChange = (e) => {
		const { TransmittalActions } = this.props;
		const { name, value } = e.target;

		if (name === 'vendor') {
			this.getTransmittalsByVendor(value);
		} else {
			TransmittalActions.onChange({ target: 'additionalReceive', name, value });
		}
	};

	handleReadDirectory = (e) => {
		const { TransmittalActions } = this.props;
		const { files } = e.target;
		const receiveDocuments = [];

		for (let i = 0; i < files.length; i++) {
			let file = files[i].name.split('_');

			if (file.length !== 3) continue;

			receiveDocuments.push({
				id: i,
				documentNumber: file[0],
				documentTitle: file[1],
				documentRev: file[2].replace('Rev.', '')
			});
		}

		TransmittalActions.onChange({ target: 'errors', name: 'receiveDocumentsError', value: false });
		TransmittalActions.onChange({ target: 'additionalReceive', name: 'receiveDocuments', value: receiveDocuments });
	};

	handleDeleteReceiveDocument = (id) => () => {
		const { TransmittalActions } = this.props;

		TransmittalActions.deleteReceiveDocument({ id, target: 'additionalReceive' });
	};

	handleAdditionalReceive = async () => {
		const { ModalActions, TransmittalActions, data } = this.props;
		const { id, receiveDocuments } = data.toJS();

		await TransmittalActions.additionalReceiveTransmittal({ id, param: receiveDocuments });
		ModalActions.close('transmittalAdditionalReceive');
	};

	render() {
		const { vendorList, transmittalsByVendor, data, errors, isOpen } = this.props;

		if (!vendorList) return null;

		return (
			<TransmittalAdditionalReceiveModal
				vendorList={vendorList}
				transmittalsByVendor={transmittalsByVendor}
				data={data}
				errors={errors}
				isOpen={isOpen}
				onClose={this.handleClose}
				onChange={this.handleChange}
				onReadDirectory={this.handleReadDirectory}
				onDeleteReceiveDocument={this.handleDeleteReceiveDocument}
				onAdditionalReceive={this.handleAdditionalReceive}
			/>
		);
	}
}

export default connect(
	(state) => ({
		vendorList: state.vendor.get('vendorList'),
		transmittalsByVendor: state.transmittal.get('transmittalsByVendor'),
		data: state.transmittal.get('additionalReceive'),
		errors: state.transmittal.get('errors'),
		isOpen: state.modal.get('transmittalAdditionalReceiveModal')
	}),
	(dispatch) => ({
		TransmittalActions: bindActionCreators(transmittalActions, dispatch),
		VendorActions: bindActionCreators(vendorActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(TransmittalAdditionalReceiveModalContainer);
