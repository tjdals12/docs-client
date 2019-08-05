import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import VendorSearchFormContainer from 'containers/Form/VendorSearchFormContainer';
import VendorListContainer from 'containers/List/VendorListContainer';
import VendorAddModalContainer from 'containers/Modal/VendorAddModalContainer';
import queryString from 'query-string';

class VendorsPage extends React.Component {
	render() {
		let { page } = queryString.parse(this.props.location.search);

		return (
			<ScrollToTop>
				<Page title="Vendors" breadcrumbs={[ { name: 'Vendors', active: true } ]}>
					<VendorSearchFormContainer />
					<VendorListContainer page={parseInt(page || 1, 10)} />
					<VendorAddModalContainer />
				</Page>
			</ScrollToTop>
		);
	}
}

export default VendorsPage;
