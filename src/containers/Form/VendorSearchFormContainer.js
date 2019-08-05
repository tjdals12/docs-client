import React from 'react';
import { withRouter } from 'react-router-dom';
import VendorSearchForm from 'components/Form/VendorSearchForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as cmcodeActions from 'store/modules/cmcode';
import * as vendorActions from 'store/modules/vendor';

class VendorSearchFormContainer extends React.Component {
	getCmcodes = async (major) => {
		const { CmcodeActions } = this.props;

		await CmcodeActions.getCmcodeByMajor({ major: major });
	};

	handleChange = (e) => {
		const { VendorActions } = this.props;
		const { name, value } = e.target;

		VendorActions.onChangeSearch({ name, value });
	};

	handleSearch = async () => {
		const { VendorActions, search, history } = this.props;

		console.log(search.toJS());
		history.push('/vendors?page=1');
	};

	componentDidMount() {
		this.getCmcodes('0001');
	}

	render() {
		const { parts, search } = this.props;

		if (!parts) return null;

		return (
			<VendorSearchForm parts={parts} search={search} onChange={this.handleChange} onSearch={this.handleSearch} />
		);
	}
}

export default connect(
	(state) => ({
		parts: state.cmcode.get('0001'),
		search: state.vendor.get('search')
	}),
	(dispatch) => ({
		VendorActions: bindActionCreators(vendorActions, dispatch),
		CmcodeActions: bindActionCreators(cmcodeActions, dispatch)
	})
)(withRouter(VendorSearchFormContainer));
