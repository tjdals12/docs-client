import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import TransmittalSearchFormContainer from 'containers/Form/TransmittalSearchFormContainer';
import TransmittalTableContainer from 'containers/Table/TransmittalTableContainer';
import VendorDetailModalContainer from 'containers/Modal/VendorDetailModalContainer';
import VendorEditModalContainer from 'containers/Modal/VendorEditModalContainer';
import TransmittalReceiveModalContainer from 'containers/Modal/TransmittalReceiveModalContainer';
import TransmittalDetailModalContainer from 'containers/Modal/TransmittalDetailModalContainer';
import TransmittalEditModalContainer from 'containers/Modal/TransmittalEditModalContainer';
import TransmittalAdditionalReceiveModalContainer from 'containers/Modal/TransmittalAdditionalReceiveModalContainer';
import DocumentDetailModalContainer from 'containers/Modal/DocumentDetailModalContainer';
import queryString from 'query-string';

class TransmittalsPage extends React.Component {
	render() {
		const { page } = queryString.parse(this.props.location.search);

		return (
			<ScrollToTop>
				<Page title="Transmittals" breadcrumbs={[ { name: 'Transmittals', active: true } ]}>
					<TransmittalSearchFormContainer />
					<TransmittalTableContainer page={parseInt(page || 1, 10)} />
					<VendorDetailModalContainer />
					<VendorEditModalContainer />
					<TransmittalReceiveModalContainer />
					<TransmittalDetailModalContainer />
					<TransmittalEditModalContainer />
					<TransmittalAdditionalReceiveModalContainer />
					<DocumentDetailModalContainer />
				</Page>
			</ScrollToTop>
		);
	}
}

export default TransmittalsPage;
