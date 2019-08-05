import React from 'react';
import Page from 'components/Page';
import VendorSearchForm from 'components/Form/VendorSearchForm';
import VendorListContainer from 'containers/List/VendorListContainer';
import queryString from 'query-string';

class VendorsPage extends React.Component {
	render() {
		let { page } = queryString.parse(this.props.location.search);

		return (
			<Page title="Vendors" breadcrumbs={[ { name: 'Vendors', active: true } ]}>
				<VendorSearchForm />
				<VendorListContainer page={parseInt(page || 1, 10)} />
			</Page>
		);
	}
}

export default VendorsPage;
