import React from 'react';
import TransmittalEditModal from 'components/Modal/TransmittalEditModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vendorActions from 'store/modules/vendor';
import * as transmittalActions from 'store/modules/transmittal';
import * as modalActions from 'store/modules/modal';

class TransmittalEditModalContainer extends React.Component {
	getVendorList = () => {
		const { VendorActions } = this.props;

		VendorActions.getVendorsForSelect();
	};

	handleClose = () => {
		const { ModalActions } = this.props;

		ModalActions.close('transmittalEdit');
	};

	handleChange = (e) => {
		const { TransmittalActions } = this.props;
		const { name, value } = e.target;

		TransmittalActions.onChange({ target: 'edit', name, value });
	};

	handleSetDeleteDocument = (id) => () => {
		const { TransmittalActions } = this.props;

		TransmittalActions.setDeleteDocument(id);
	};

	handleEdit = async () => {
		const { ModalActions, TransmittalActions, edit } = this.props;
		const {
			_id,
			vendor,
			officialNumber,
			senderGb,
			sender,
			receiverGb,
			receiver,
			deleteDocuments,
			receiveDate,
			targetDate
		} = edit.toJS();

		await TransmittalActions.editTransmittal({
			id: _id,
			param: {
				vendor,
				officialNumber,
				senderGb,
				sender,
				receiverGb,
				receiver,
				deleteDocuments,
				receiveDate,
				targetDate
			}
		});

		ModalActions.close('transmittalEdit');
	};

	componentDidMount() {
		this.getVendorList();
	}

	render() {
		const { vendorList, isOpen, edit, errors, loading } = this.props;

		if (loading || loading === undefined) return null;

		return (
			<TransmittalEditModal
				vendorList={vendorList}
				isOpen={isOpen}
				data={edit}
				errors={errors}
				onClose={this.handleClose}
				onChange={this.handleChange}
				onSetDeleteDocument={this.handleSetDeleteDocument}
				onEdit={this.handleEdit}
			/>
		);
	}
}

export default connect(
	(state) => ({
		vendorList: state.vendor.get('vendorList'),
		isOpen: state.modal.get('transmittalEditModal'),
		edit: state.transmittal.get('edit'),
		errors: state.transmittal.get('errors'),
		loading: state.pender.pending['transmittal/GET_TRANSMITTAL']
	}),
	(dispatch) => ({
		VendorActions: bindActionCreators(vendorActions, dispatch),
		TransmittalActions: bindActionCreators(transmittalActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch)
	})
)(TransmittalEditModalContainer);
