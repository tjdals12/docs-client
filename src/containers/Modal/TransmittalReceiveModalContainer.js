import React from 'react';
import TransmittalReceiveModal from 'components/Modal/TransmittalReceiveModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vendorActions from 'store/modules/vendor';
import * as transmittalActions from 'store/modules/transmittal';
import * as modalActions from 'store/modules/modal';

class TransmittalReceiveModalContainer extends React.Component {
	getVendorList = () => {
		const { VendorActions } = this.props;

		VendorActions.getVendorsForSelect();
	};

	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('transmittalReceive');
	};

	handleChange = (e) => {
		const { TransmittalActions } = this.props;
		const { name, value } = e.target;

		TransmittalActions.onChange({ target: 'receive', name, value });
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

		TransmittalActions.onChange({ target: 'receive', name: 'receiveDocuments', value: receiveDocuments });
	};

	handleDeleteReceiveDocument = (id) => () => {
		const { TransmittalActions } = this.props;

		TransmittalActions.deleteReceiveDocument(id);
	};

	handleReceive = async () => {
		const { ModalActions, TransmittalActions, receive } = this.props;

		await TransmittalActions.receiveTransmittal(receive.toJS());
		ModalActions.close('transmittalReceive');
	};

	componentDidMount() {
		this.getVendorList();
	}

	render() {
		const { vendorList, isOpen, receive } = this.props;

		if (!vendorList) return null;

		return (
			<TransmittalReceiveModal
				vendorList={vendorList}
				isOpen={isOpen}
				data={receive}
				onClose={this.handleClose}
				onChange={this.handleChange}
				onReadDirectory={this.handleReadDirectory}
				onDeleteReceiveDocument={this.handleDeleteReceiveDocument}
				onReceive={this.handleReceive}
			/>
		);
	}
}

export default connect(
	(state) => ({
		vendorList: state.vendor.get('vendorList'),
		isOpen: state.modal.get('transmittalReceiveModal'),
		receive: state.transmittal.get('receive')
	}),
	(dispatch) => ({
		VendorActions: bindActionCreators(vendorActions, dispatch),
		TransmittalActions: bindActionCreators(transmittalActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(TransmittalReceiveModalContainer);
