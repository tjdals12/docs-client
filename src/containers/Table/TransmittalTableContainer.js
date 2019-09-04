import React from 'react';
import { withRouter } from 'react-router-dom';
import TransmittalTable from 'components/Table/TransmittalTable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from 'store/modules/modal';
import * as vendorActions from 'store/modules/vendor';
import * as transmittalActions from 'store/modules/transmittal';

class TransmittalTableContainer extends React.Component {
	getTransmittals = async (page) => {
		const { TransmittalActions, isSearch, search, history } = this.props;

		if (isSearch) {
			await TransmittalActions.searchTransmittals(1, search.toJS());
		} else {
			await TransmittalActions.getTransmittals({ page });
		}

		history.push(`/transmittals/overall?page=${page}`);
	};

	getTransmittal = (id) => {
		const { TransmittalActions } = this.props;

		TransmittalActions.getTransmittal({ id });
	};

	handleTarget = (id) => {
		const { VendorActions } = this.props;

		VendorActions.setTarget(id);
	};

	handleOpen = (name) => () => {
		const { ModalActions, TransmittalActions } = this.props;

		if (name === 'transmittalReceive') {
			TransmittalActions.initialize('receive');
		} else if (name === 'transmittalAdditionalReceive') {
			TransmittalActions.initialize('additionalReceive');
		}

		TransmittalActions.initialize('errors');
		ModalActions.open(name);
	};

	handleOpenDetail = (id) => async () => {
		const { ModalActions, TransmittalActions } = this.props;

		TransmittalActions.initialize('reasonError');
		await this.getTransmittal(id);
		ModalActions.open('transmittalDetail');
	};

	componentDidMount() {
		this.getTransmittals(1);
	}

	render() {
		const { transmittals, page, lastPage, loading } = this.props;

		if (loading || loading === undefined) return null;

		return (
			<TransmittalTable
				page={page}
				lastPage={lastPage}
				data={transmittals}
				onPage={this.getTransmittals}
				onTarget={this.handleTarget}
				onOpen={this.handleOpen}
				onOpenDetail={this.handleOpenDetail}
			/>
		);
	}
}

export default connect(
	(state) => ({
		transmittals: state.transmittal.get('transmittals'),
		lastPage: state.transmittal.get('lastPage'),
		isSearch: state.transmittal.getIn([ 'search', 'isSearch' ]),
		search: state.transmittal.get('search'),
		loading: state.pender.pending['transmittal/GET_TRANSMITTALS']
	}),
	(dispatch) => ({
		ModalActions: bindActionCreators(modalActions, dispatch),
		VendorActions: bindActionCreators(vendorActions, dispatch),
		TransmittalActions: bindActionCreators(transmittalActions, dispatch)
	})
)(withRouter(TransmittalTableContainer));
