import React from 'react';
import DocumentInfoDetailTable from 'components/Table/DocumentInfoDetailTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as transmittalActions from 'store/modules/transmittal';
import * as modalActions from 'store/modules/modal';
import * as documentActions from 'store/modules/document';

class DocumentInfoDetailTableContainer extends React.Component {
	getDocument = (id) => {
		const { DocumentActions } = this.props;

		DocumentActions.getDocument({ id });
	};

	getTransmittal = (id) => {
		const { TransmittalActions } = this.props;

		TransmittalActions.getTransmittal({ id });
	};

	handleOpen = ({ id }) => async () => {
		const { ModalActions } = this.props;

		await this.getDocument(id);
		ModalActions.open('documentDetail');
	};

	handleOpenTransmittalDetail = (id) => async () => {
		const { ModalActions } = this.props;

		await this.getTransmittal({ id });
		ModalActions.open('transmittalDetail');
	};

	render() {
		const { data } = this.props;

		return (
			<DocumentInfoDetailTable
				data={data}
				onOpen={this.handleOpen}
				onOpenTransmittalDetail={this.handleOpenTransmittalDetail}
			/>
		);
	}
}

export default connect(
	(state) => ({}),
	(dispatch) => ({
		TransmittalActions: bindActionCreators(transmittalActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch),
		DocumentActions: bindActionCreators(documentActions, dispatch)
	})
)(DocumentInfoDetailTableContainer);
