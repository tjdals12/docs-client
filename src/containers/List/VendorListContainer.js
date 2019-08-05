import React from 'react';
import VendorList from 'components/List/VendorList';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as vendorActions from 'store/modules/vendor';

class VendorListContainer extends React.Component {
	getVendors = async (page) => {
		const { VendorActions, history } = this.props;

		await VendorActions.getVendors({ page: page });
		history.push(`/vendors?page=${page}`);
	};

	componentDidMount() {
		this.getVendors(1);
	}

	render() {
		const { vendors, lastPage, page } = this.props;

		return <VendorList page={page} lastPage={lastPage} data={vendors} onPage={this.getVendors} />;
	}
}

export default connect(
	(state) => ({
		vendors: state.vendor.get('vendors'),
		lastPage: state.vendor.get('lastPage'),
		loading: state.pender.pending['vendor/GET_VENDORS']
	}),
	(dispatch) => ({
		VendorActions: bindActionCreators(vendorActions, dispatch)
	})
)(withRouter(VendorListContainer));
