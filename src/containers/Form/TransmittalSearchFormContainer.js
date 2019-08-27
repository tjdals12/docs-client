import React from 'react';
import TransmittalSearchForm from 'components/Form/TransmittalSearchForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vendorActions from 'store/modules/vendor';
import * as transmittalActions from 'store/modules/transmittal';

class TransmittalSearchFormContainer extends React.Component {
	getVendors = () => {
		const { VendorActions } = this.props;

		VendorActions.getVendorsForSelect();
	};

	handleChange = (e) => {
		const { TransmittalActions } = this.props;
		const { name, value } = e.target;

		TransmittalActions.onChangeSearch({ name, value });
	};

	componentDidMount() {
		this.getVendors();
	}

	render() {
		const { vendors, search, loading } = this.props;

		if (loading || loading === undefined) return null;

		return <TransmittalSearchForm vendors={vendors} search={search} onChange={this.handleChange} />;
	}
}

export default connect(
	(state) => ({
		vendors: state.vendor.get('vendorList'),
		search: state.transmittal.get('search'),
		loading: state.pender.pending['vendor/GET_VENDORS_FOR_SELECT']
	}),
	(dispatch) => ({
		VendorActions: bindActionCreators(vendorActions, dispatch),
		TransmittalActions: bindActionCreators(transmittalActions, dispatch)
	})
)(TransmittalSearchFormContainer);
