import React from 'react';
import TransmittalCard from 'components/Card/TransmittalCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as transmittalActions from 'store/modules/transmittal';
import * as modalActions from 'store/modules/modal';
import * as indexesActions from 'store/modules/indexes';

class TransmittalCardContainer extends React.Component {
	getTransmittal = (id) => {
		const { TransmittalActions } = this.props;

		TransmittalActions.getTransmittal({ id });
	};

	getTransmittals = () => {
		const { TransmittalActions, vendor } = this.props;

		TransmittalActions.getTransmittalsByVendor({ vendor });
	};

	handleOpenTransmittalDetail = async (id) => {
		const { ModalActions } = this.props;

		await this.getTransmittal(id);
		ModalActions.open('transmittalDetail');
	};

	componentDidMount() {
		this.getTransmittals();
	}

	render() {
		const { transmittals } = this.props;

		if (!transmittals) return null;

		return <TransmittalCard data={transmittals} onOpenDetail={this.handleOpenTransmittalDetail} height="md" />;
	}
}

export default connect(
	(state) => ({
		transmittals: state.transmittal.get('transmittalsByVendor')
	}),
	(dispatch) => ({
		TransmittalActions: bindActionCreators(transmittalActions, dispatch),
		ModalActions: bindActionCreators(modalActions, dispatch),
		IndexesActions: bindActionCreators(indexesActions, dispatch)
	})
)(TransmittalCardContainer);
