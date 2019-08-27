import React from 'react';
import Page from 'components/Page';
import TransmittalSearchFormContainer from 'containers/Form/TransmittalSearchFormContainer';
import TransmittalTableContainer from 'containers/Table/TransmittalTableContainer';
import VendorDetailModalContainer from 'containers/Modal/VendorDetailModalContainer';
import TransmittalDetailModalContainer from 'containers/Modal/TransmittalDetailModalContainer';
import DocumentDetailModalContainer from 'containers/Modal/DocumentDetailModalContainer';
import queryString from 'query-string';

class TransmittalsPage extends React.Component {
	render() {
		const { page } = queryString.parse(this.props.location.search);

		return (
			<Page title="Transmittals" breadcrumbs={[ { name: 'Transmittals', active: true } ]}>
				<TransmittalSearchFormContainer />
				<TransmittalTableContainer page={parseInt(page || 1, 10)} />
				<VendorDetailModalContainer />
				<TransmittalDetailModalContainer />
				<DocumentDetailModalContainer />
			</Page>
		);
	}
}

export default TransmittalsPage;
