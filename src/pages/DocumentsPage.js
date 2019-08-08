import React from 'react';
import ScrollToTop from 'components/ScrollToTop';
import Page from 'components/Page';
import DocumentSearchFormContainer from 'containers/Form/DocumentSearchFormContainer';
import DocumentTableContainer from 'containers/Table/DocumentTableContainer';
import DocumentAddModalContainier from 'containers/Modal/DocumentAddModalContainer';
import DocumentDetailModalContainer from 'containers/Modal/DocumentDetailModalContainer';
import DocumentEditModalContainer from 'containers/Modal/DocumentEditModalContainer';
import VendorDetailModalContainer from 'containers/Modal/VendorDetailModalContainer';
import queryString from 'query-string';
class DocumentsPage extends React.Component {
	render() {
		let { page } = queryString.parse(this.props.location.search);

		return (
			<ScrollToTop>
				<Page title="Documents" breadcrumbs={[ { name: 'Documents', active: true } ]}>
					<DocumentSearchFormContainer />
					<DocumentTableContainer page={parseInt(page || 1, 10)} />
					<DocumentAddModalContainier />
					<DocumentDetailModalContainer />
					<DocumentEditModalContainer />
					<VendorDetailModalContainer />
				</Page>
			</ScrollToTop>
		);
	}
}

export default DocumentsPage;
