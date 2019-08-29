import React from 'react';
import { withRouter } from 'react-router-dom';
import TransmittalSearchForm from 'components/Form/TransmittalSearchForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cmcodeActions from 'store/modules/cmcode';
import * as vendorActions from 'store/modules/vendor';
import * as transmittalActions from 'store/modules/transmittal';

class TransmittalSearchFormContainer extends React.Component {
	getCmcodes = (major) => {
		const { CmcodeActions } = this.props;

		CmcodeActions.getCmcodeByMajor({ major: major });
	};

	getVendorList = () => {
		const { VendorActions } = this.props;

		VendorActions.getVendorsForSelect();
	};

	handleChange = (e) => {
		const { TransmittalActions } = this.props;
		const { name, value } = e.target;

		TransmittalActions.onChange({ target: 'search', name, value });
	};

	handleSearch = async () => {
		const { TransmittalActions, search, history } = this.props;

		await TransmittalActions.searchTransmittals(1, search.toJS());
		history.push('/transmittals/overall?page=1');
	};

	componentDidMount() {
		this.getVendorList();
		this.getCmcodes('0003');
	}

	render() {
		const { status, vendors, search, loading } = this.props;

		if (!status || !vendors || loading || loading === undefined) return null;

		return (
			<TransmittalSearchForm
				status={status}
				vendors={vendors}
				search={search}
				onChange={this.handleChange}
				onSearch={this.handleSearch}
			/>
		);
	}
}

export default connect(
	(state) => ({
		vendors: state.vendor.get('vendorList'),
		status: state.cmcode.get('0003'),
		search: state.transmittal.get('search'),
		loading: state.pender.pending['vendor/GET_VENDORS_FOR_SELECT']
	}),
	(dispatch) => ({
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch),
		VendorActions: bindActionCreators(vendorActions, dispatch),
		TransmittalActions: bindActionCreators(transmittalActions, dispatch)
	})
)(withRouter(TransmittalSearchFormContainer));
